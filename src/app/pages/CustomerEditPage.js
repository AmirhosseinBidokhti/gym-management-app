import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";

import { getMembershipJoinTypes } from "../API/customer/getMembershipJoinTypes";
import { getJobInfos } from "../API/customer/getJobInfos";

import { updateCustomer } from "../API/customer/updateCustomer";
import { getCustomer } from "../API/customer/getCustomer";
import { fileUpload } from "../API/fileUpload/fileUpload";

import { Spinner } from "../vendor/shared/Spinner";

import DatePicker from "react-modern-calendar-datepicker";

export const CustomerEditPage = ({ match }) => {
  const [firstName, setFirstname] = useState("");
  const [lastName, setlastName] = useState("");
  const [gender, setGender] = useState(null);
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

  const [customerBefore, setCustomerBefore] = useState({});

  const saveFile = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const customerID = match.params.id;

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newCustomerInfo = {
      id: customerBefore.id,
      first_name: firstName ? firstName : customerBefore.first_name,
      last_name: lastName ? lastName : customerBefore.last_name,
      birth_date: selectedDay
        ? `${selectedDay.year}-${selectedDay.month}-${selectedDay.day}`
        : customerBefore.birth_date,
      gender: gender ? gender : customerBefore.gender,
      mobile: mobile ? mobile : customerBefore.mobile,
      tel: phone ? phone : customerBefore.tel,
      email: email ? email : customerBefore.email,
      telegram: telegram ? telegram : customerBefore.telegram,
      instagram: instagram ? instagram : customerBefore.instagram,
      address: address ? address : customerBefore.address,
      membership_join_type_id: membershipJoinType
        ? membershipJoinType
        : customerBefore.membership_join_type_id,
      contract_file_path: fileName
        ? fileName
        : customerBefore.contract_file_path,
      jobinfo_id: job ? job : customerBefore.jobinfo_id,
    };
    const { data, is_success } = await updateCustomer(newCustomerInfo);
    if (file) {
      const { data } = await fileUpload(file, fileName);
      console.log(data);
    }
    console.log(newCustomerInfo);
    console.log(data);
    if (is_success) {
      setSuccess(is_success);
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
      setLoading(true);
      const joinTypeData = await getMembershipJoinTypes();
      setMembershipJoinTypes(joinTypeData);
      const jobData = await getJobInfos();
      setJobInfo(jobData);
      const customerBefore = await getCustomer(customerID);
      setCustomerBefore(customerBefore);
      setLoading(false);
      console.log(loading);
    }
    getAddCustomerPreData();
  }, [customerID]);

  return (
    <>
      <div className="col-12 grid-margin">
        <div className="card">
          <div className="card-body">
            <div style={{ display: "flex" }}>
              <h4 className="card-title">فرم ویرایش مشتری</h4>
              {success && (
                <h2 style={{ color: "#4BB543" }}>
                  اطلاعات ورزشکار با موفقیت بروزرسانی شد!
                </h2>
              )}

              <button
                type="button"
                className=" btn-dark "
                style={{
                  width: "40px",
                  height: "30px",
                  marginRight: "auto",
                }}
                title="back"
                onClick={(e) => window.history.back()}
              >
                <i className="mdi mdi-arrow-left"></i>
              </button>
            </div>
            {loading ? (
              <Spinner />
            ) : (
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
                          placeholder={customerBefore.first_name}
                          defaultValue={customerBefore.first_name}
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
                          placeholder={customerBefore.last_name}
                          defaultValue={customerBefore.last_name}
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
                          defaultValue={customerBefore.gender}
                          className="form-control"
                          onChange={(e) => {
                            e.target.value == "true"
                              ? setGender(true)
                              : setGender(false);
                          }}
                        >
                          <option selected disabled>
                            {customerBefore.gender ? "مرد" : "زن"}
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
                          onChange={setSelectedDay}
                          shouldHighlightWeekends
                          locale="fa"
                          defaultValue={customerBefore.birth_date}
                          inputPlaceholder={customerBefore.birth_date}
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
                          placeholder={customerBefore.address}
                          defaultValue={customerBefore.address}
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
                          placeholder={customerBefore.email}
                          defaultValue={customerBefore.email}
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
                          placeholder={customerBefore.mobile}
                          defaultValue={customerBefore.mobile}
                          required
                        />
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="row">
                      <label className="col-sm-3 col-form-label">
                        تلفن ثابت
                      </label>
                      <div className="col-sm-9">
                        <Form.Control
                          type="text"
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder={customerBefore.tel}
                          defaultValue={customerBefore.tel}
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
                          onChange={(e) =>
                            setMembershipJoinType(e.target.value)
                          }
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
                      <label className="col-sm-3 col-form-label">
                        اینستاگرم
                      </label>
                      <div className="col-sm-9">
                        <Form.Control
                          type="text"
                          onChange={(e) => setInstagram(e.target.value)}
                          placeholder={customerBefore.instagram}
                          defaultValue={customerBefore.instagram}
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
                          placeholder={customerBefore.telegram}
                          defaultValue={customerBefore.telegram}
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
                          {customerBefore.contract_file_path}
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
            )}
          </div>
        </div>
      </div>
    </>
  );
};
