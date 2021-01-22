import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { getAccountTypes } from "../utils/api/transaction/getAccountTypes";

import { getCustomers } from "../utils/api/customer/getCustomers";
import { addTranscation } from "../utils/api/transaction/addTransaction";
import { getAccountByType } from "../utils/api/transaction/getAccountByType";

export const TransactionAddPage = () => {
  const [variz, setVariz] = useState(null);
  const [accountTypes, setAccountTypes] = useState([]);
  const [accountTypeID, setAccountTypeID] = useState(null);
  const [price, setPrice] = useState(null);
  const [description, setdescription] = useState("");
  const [userID, setUserID] = useState(null);

  const [accountID, setAccountID] = useState(null);

  const [accounts, setAccounts] = useState([]);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [customerList, setCustomerList] = useState([]);

  const submitHandler = async (e) => {
    const transactionObj = {
      isVariz: variz,
      accountTypeID: parseInt(accountTypeID),
      price: parseInt(price),
      description: description,
      accountID: accountID,
      userid: JSON.parse(localStorage.getItem("userInfo")).userID,
    };

    e.preventDefault();
    setLoading(true);
    const { data, isSuccess } = await addTranscation(transactionObj);

    console.log(transactionObj);
    console.log(data);
    if (isSuccess) {
      setSuccess(isSuccess);
      setTimeout(() => {
        window.location.reload();
      }, 1200);
    } else {
      console.log("try again something was wrong");
    }
    setLoading(false);
  };

  useEffect(() => {
    async function getAccountTypeData() {
      const data = await getAccountTypes();
      setAccountTypes(data);
      const customers = await getCustomers();
      setCustomerList(customers);
    }
    getAccountTypeData();
  }, []);

  return (
    <>
      <div className="col-12 grid-margin">
        <div className="card">
          <div className="card-body">
            <div style={{ display: "flex" }}>
              <h4 className="card-title">فرم ثبت تراکنش</h4>

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
            {success && (
              <h2 style={{ color: "#4BB543" }}>تراکنش با موفقیت ثبت شد</h2>
            )}
            <form className="form-sample" onSubmit={submitHandler}>
              <p className="card-description">
                {" "}
                برای ثبت تراکنش، اطلاعات مربوطه را وارد کنید.{" "}
              </p>
              <div className="row">
                {/* <div className="col-md-6">
                  <Form.Group className="row">
                    <label className="col-sm-3 col-form-label">نام</label>
                    <div className="col-sm-9">
                      <select
                        className="form-control"
                        onChange={(e) => setUserID(e.target.value)}
                        value={userID}
                      >
                        <option selected disabled>
                          انتخاب کنید
                        </option>
                        {customerList.map((el) => (
                          <option key={el.id} value={el.id}>
                            {`${el.firstName} ${el.lastName}`}
                          </option>
                        ))}
                      </select>
                    </div>
                  </Form.Group>
                </div> */}
                <div className="col-md-6">
                  <Form.Group className="row">
                    <label className="col-sm-3 col-form-label">
                      نوع تراکنش
                    </label>

                    <div className="col-sm-9">
                      <select
                        className="form-control"
                        onChange={(e) => {
                          e.target.value === "true"
                            ? setVariz(true)
                            : setVariz(false);
                        }}
                      >
                        <option selected disabled>
                          انتخاب کنید
                        </option>
                        <option value={true}>واریز</option>
                        <option value={false}>برداشت</option>
                      </select>
                    </div>
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group className="row">
                    <label className="col-sm-3 col-form-label">مبلغ</label>
                    <div className="col-sm-9">
                      <Form.Control
                        type="number"
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                  </Form.Group>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="row">
                    <label className="col-sm-3 col-form-label">نوع حساب</label>
                    <div className="col-sm-9">
                      <select
                        className="form-control"
                        onChange={async (e) => {
                          setAccountTypeID(e.target.value);
                          const data = await getAccountByType(e.target.value);
                          setAccounts(data);
                        }}
                        value={accountTypeID}
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
                <div className="col-md-6">
                  <Form.Group className="row">
                    <label className="col-sm-3 col-form-label">حساب</label>
                    <div className="col-sm-9">
                      <select
                        className="form-control"
                        onChange={(e) => setAccountID(e.target.value)}
                        value={accountID}
                      >
                        <option selected disabled>
                          ابتدا نوع حساب را انتخاب کنید
                        </option>
                        {accounts.map((el) => (
                          <option key={el.id} value={el.id}>
                            {`${el.firstName} ${el.lastName}`}
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
                    <label
                      className="col-sm-3 col-form-label"
                      htmlFor="exampleTextarea1"
                    >
                      توضیحات
                    </label>
                    <div className="col-sm-9">
                      <textarea
                        className="form-control"
                        id="exampleTextarea1"
                        rows="4"
                        onChange={(e) => setdescription(e.target.value)}
                      ></textarea>
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
