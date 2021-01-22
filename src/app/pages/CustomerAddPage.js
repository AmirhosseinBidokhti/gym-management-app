import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";

import { getMembershipJoinTypes } from "../utils/api/customer/getMembershipJoinTypes";
import { getJobInfos } from "../utils/api/customer/getJobInfos";

import { customerAdd } from "../utils/api/customer/customerAdd";
import { fileUpload } from "../utils/api/fileUpload/fileUpload";

import DatePicker from "react-modern-calendar-datepicker";

export const CustomerAddPage = () => {
  const [firstName, setFirstname] = useState("");
  const [lastName, setlastName] = useState("");
  const [gender, setGender] = useState(true);
  const [email, setemail] = useState("");
  const [address, setAddress] = useState("");
  const [job, setJob] = useState(null);
  const [telegram, setTelegram] = useState("");
  const [instagram, setInstagram] = useState("");
  const [membershipJoinType, setMembershipJoinType] = useState(null);
  const [phone, setPhone] = useState("");
  const [mobile, setMobile] = useState("");
  const [selectedDay, setSelectedDay] = useState(null);
  //  {day: 1, month: 10, year: 1399}

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  let [membershipJoinTypes, setMembershipJoinTypes] = useState([]);
  let [jobInfo, setJobInfo] = useState([]);

  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();

  const saveFile = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  // TODO: SEE WHAT PROPERTIES ARE REQUIRED FROM BACKEND!

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newCustomerInfo = {
      firstName: firstName,
      lastName: lastName,
      birthdate: new Date(selectedDay.year, selectedDay.month, selectedDay.day),
      //birthdate: dateFormated,
      gender: gender,
      mobile: mobile,
      tel: phone,

      email: email,
      telegram: telegram,
      instagram: instagram,
      address: address,

      membershipJoinTypeId: membershipJoinType,
      contractFilePath: fileName,
      jobInfoId: job,
    };

    const { data, isSuccess } = await customerAdd(newCustomerInfo);
    await fileUpload(file, fileName);
    console.log(newCustomerInfo);
    console.log(data);
    if (isSuccess) {
      setSuccess(isSuccess);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } else {
      console.log("try again something was wrong");
    }

    setLoading(false);
  };

  useEffect(() => {
    async function getAddCustomerPreData() {
      const joinTypeData = await getMembershipJoinTypes();
      setMembershipJoinTypes(joinTypeData);
      const jobData = await getJobInfos();
      setJobInfo(jobData);
    }
    getAddCustomerPreData();
  }, []);

  return (
    <>
      <div className="col-12 grid-margin">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">فرم ثبت مشتری</h4>
            {success && (
              <h2 style={{ color: "#4BB543" }}>
                ورزشکار جدید با موفقیت اضافه شد
              </h2>
            )}

            <form className="form-sample" onSubmit={submitHandler}>
              <p className="card-description">
                {" "}
                برای ایجاد مشتری اطلاعات وی را وارد کنید.{" "}
              </p>
              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="row">
                    <label className="col-sm-3 col-form-label">نام</label>
                    <div className="col-sm-9">
                      <Form.Control
                        type="text"
                        onChange={(e) => setFirstname(e.target.value)}
                      />
                    </div>
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group className="row">
                    <label className="col-sm-3 col-form-label">
                      نام خانوادگی
                    </label>
                    <div className="col-sm-9">
                      <Form.Control
                        type="text"
                        onChange={(e) => setlastName(e.target.value)}
                      />
                    </div>
                  </Form.Group>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="row">
                    <label className="col-sm-3 col-form-label">جنسیت</label>

                    <div className="col-sm-9">
                      <select
                        className="form-control"
                        onChange={(e) => {
                          e.target.value == "true"
                            ? setGender(true)
                            : setGender(false);
                        }}
                      >
                        <option selected disabled>
                          انتخاب کنید
                        </option>
                        <option value={false}>زن</option>
                        <option value={true}>مرد</option>
                      </select>
                    </div>
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group className="row">
                    <label className="col-sm-3 col-form-label">
                      تاریخ تولد
                    </label>
                    <div className="col-sm-9">
                      <DatePicker
                        value={selectedDay}
                        onChange={setSelectedDay}
                        shouldHighlightWeekends
                        locale="fa"
                      />
                    </div>
                  </Form.Group>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="row">
                    <label className="col-sm-3 col-form-label">آدرس</label>
                    <div className="col-sm-9">
                      <Form.Control
                        type="text"
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group className="row">
                    <label className="col-sm-3 col-form-label">ایمیل</label>
                    <div className="col-sm-9">
                      <Form.Control
                        type="email"
                        onChange={(e) => setemail(e.target.value)}
                      />
                    </div>
                  </Form.Group>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="row">
                    <label className="col-sm-3 col-form-label">
                      تلفن همراه
                    </label>
                    <div className="col-sm-9">
                      <Form.Control
                        type="text"
                        onChange={(e) => setMobile(e.target.value)}
                      />
                    </div>
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group className="row">
                    <label className="col-sm-3 col-form-label">تلفن ثابت</label>
                    <div className="col-sm-9">
                      <Form.Control
                        type="text"
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                  </Form.Group>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="row">
                    <label className="col-sm-3 col-form-label">
                      نحوه آشنایی
                    </label>
                    <div className="col-sm-9">
                      <select
                        className="form-control"
                        onChange={(e) => setMembershipJoinType(e.target.value)}
                        value={membershipJoinType}
                      >
                        <option selected disabled>
                          انتخاب کنید
                        </option>
                        {membershipJoinTypes.map((el) => (
                          <option key={el.id} value={el.id}>
                            {el.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group className="row">
                    <label className="col-sm-3 col-form-label">شغل</label>
                    <div className="col-sm-9">
                      <select
                        className="form-control"
                        onChange={(e) => setJob(e.target.value)}
                        value={job}
                      >
                        <option selected disabled>
                          انتخاب کنید
                        </option>
                        {jobInfo.map((el) => (
                          <option key={el.id} value={el.id}>
                            {el.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </Form.Group>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="row">
                    <label className="col-sm-3 col-form-label">اینستاگرم</label>
                    <div className="col-sm-9">
                      <Form.Control
                        type="text"
                        onChange={(e) => setInstagram(e.target.value)}
                      />
                    </div>
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group className="row">
                    <label className="col-sm-3 col-form-label">تلگرام</label>
                    <div className="col-sm-9">
                      <Form.Control
                        type="text"
                        onChange={(e) => setTelegram(e.target.value)}
                      />
                    </div>
                  </Form.Group>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="row">
                    <label className="col-sm-3 col-form-label">
                      آپلود فایل
                    </label>
                    <div className="custom-file col-sm-9">
                      <Form.Control
                        type="file"
                        className="form-control visibility-hidden"
                        id="customFileLang"
                        onChange={saveFile}
                      />
                      <label
                        className="custom-file-label"
                        style={{
                          width: "96.2%",
                          marginRight: "11.1px",
                          textAlign: "left",
                        }}
                        htmlFor="customFileLang"
                      >
                        {fileName}
                      </label>
                    </div>
                  </Form.Group>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary mr--3"
                disabled={loading}
              >
                ثبت
              </button>
              <button className="btn btn-dark mr-2">انصراف</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
