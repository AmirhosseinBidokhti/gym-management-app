import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";

import cogoToast from "cogo-toast";
import { addAccount } from "../API/account/addAccount";
import { getAccountTypes } from "../API/account/getAccountTypes";
import { Link } from "react-router-dom";

export const AccountAddPage = () => {
  const [title, setTitle] = useState("");
  const [account_type_id, setAccountTypeID] = useState(null);
  const [accountTypes, setAccountTypes] = useState([]);

  const [loading, setLoading] = useState(false);
  //const [success, setSuccess] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newAccount = {
      title,
      account_type_id,
    };

    const { is_success, dev_message } = await addAccount(newAccount);

    //console.log(newCustomerInfo);
    //console.log(data);
    if (is_success) {
      cogoToast.success("حساب جدید با موفقیت اضافه شد");
      setTimeout(() => {
        window.location.reload();
      }, 330);
    } else {
      cogoToast.error(dev_message);
    }

    setLoading(false);
  };

  useEffect(() => {
    async function getPreData() {
      const accountTypes = await getAccountTypes();

      //console.log(accountTypes);
      setAccountTypes(accountTypes);
    }
    getPreData();
  }, []);

  return (
    <>
      <div className="col-12 grid-margin">
        <div className="card">
          <div className="card-body">
            <div style={{ display: "flex" }}>
              <h4 className="card-title">ایجاد حساب</h4>

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

            <form
              className="form-sample"
              onSubmit={submitHandler}
              id="customerForm"
            >
              <p className="card-description">
                {" "}
                برای ایجاد حساب اطلاعات را وارد کنید.{" "}
              </p>
              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="row">
                    <label className="col-sm-3 col-form-label required-input">
                      عنوان
                    </label>
                    <div className="col-sm-9">
                      <Form.Control
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </div>
                  </Form.Group>
                </div>

                <div className="col-md-6">
                  <Form.Group className="row">
                    <label className="col-sm-3 col-form-label required-input">
                      نوع حساب
                    </label>
                    <div className="col-sm-9">
                      <select
                        className="form-control"
                        onChange={(e) => setAccountTypeID(e.target.value)}
                        required
                      >
                        <option selected disabled>
                          انتخاب کنید
                        </option>
                        {accountTypes.map((el) => (
                          <option key={el.id} value={el.id}>
                            {el.title}
                          </option>
                        ))}
                      </select>
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
              <Link to="/dashboard" className="btn btn-dark mr-2">
                انصراف
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
