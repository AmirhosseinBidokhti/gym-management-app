import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
// import { getAccountTypes } from "../API/transaction/getAccountTypes";

//import { getCustomers } from "../API/customer/getCustomers";
import { addTranscation } from "../API/transaction/addTransaction";
// import { getAccountByType } from "../API/transaction/getAccountByType";
import cogoToast from "cogo-toast";
import { Link } from "react-router-dom";
import { getSaleInvoiceTypes } from "../API/saleInvoice/getSaleInvoiceTypes";
import { getSaleInvoiceRemain } from "../API/saleInvoice/getSaleInvoiceRemain";
import { getAccountByType } from "../API/transaction/getAccountByType";
import { getAccountTypes } from "../API/transaction/getAccountTypes";

export const TransactionForSaleInvoicePage = ({ match }) => {
  const [price, setPrice] = useState(null);
  const [description, setdescription] = useState("");

  const [saleInvoiceTypes, setSaleInvoiceTypes] = useState([]);
  const [saleInvoiceTypeID, setSaleInvoiceTypeID] = useState(null);

  const [saleInvoiceRemain, setSaleInvoiceRemain] = useState(null);

  const [accounts, setAccounts] = useState([]);
  const [accountTypes, setAccountTypes] = useState([]);
  const [accountTypeID, setAccountTypeID] = useState(null);
  const [accountID, setAccountID] = useState(null);

  const [loading, setLoading] = useState(false);

  const saleInvoiceID = match.params.id;
  const saleInvoicePrice = match.params.price;
  const acc_id = match.params.account_id;
  const fName = match.params.fName;
  const lName = match.params.lName;

  const submitHandler = async (e) => {
    const transactionObj = {
      is_daryaft: true,
      price: price ? price : saleInvoiceRemain,
      description: description,
      account_id: accountID,
      user_id: JSON.parse(localStorage.getItem("userInfo")).user_id,
      invoice_id: saleInvoiceID,
      account_id_fromto: acc_id,
    };

    e.preventDefault();
    setLoading(true);
    const { data, is_success } = await addTranscation(transactionObj);

    console.log(transactionObj);
    console.log(data);
    if (is_success) {
      cogoToast.success("تراکنش با موفقیت ثبت شد");
      setTimeout(() => {
        window.location.reload();
      }, 330);
    } else {
      console.log("try again something was wrong");
    }
    setLoading(false);
  };

  useEffect(() => {
    async function getData() {
      const saleInvoiceType = await getSaleInvoiceTypes();

      const { data } = await getSaleInvoiceRemain(saleInvoiceID);
      setSaleInvoiceRemain(data);
      const accountTypes = await getAccountTypes();
      setAccountTypes(accountTypes);

      setSaleInvoiceTypes(saleInvoiceType);
    }
    getData();
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

            <form className="form-sample" onSubmit={submitHandler}>
              <p className="card-description">
                برای ثبت تراکنش، اطلاعات مربوطه را وارد کنید.
              </p>
              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="row">
                    <label className="col-sm-3 col-form-label required-input">
                      نوع تراکنش
                    </label>

                    <div className="col-sm-9">
                      <select className="form-control">
                        <option selected disabled>
                          دریافت
                        </option>
                      </select>
                    </div>
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group className="row">
                    <label className="col-sm-3 col-form-label required-input">
                      نوع پرداخت
                    </label>
                    <div className="col-sm-9">
                      <select
                        className="form-control"
                        onChange={(e) => setSaleInvoiceTypeID(e.target.value)}
                        required
                      >
                        <option selected disabled value="">
                          انتخاب کنید
                        </option>
                        {saleInvoiceTypes.map((el) => (
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
                    <label className="col-sm-3 col-form-label required-input">
                      نوع حساب
                    </label>
                    <div className="col-sm-9">
                      <select
                        className="form-control"
                        onChange={async (e) => {
                          setAccountTypeID(e.target.value);
                          const data = await getAccountByType(e.target.value);
                          setAccounts(data);
                        }}
                        required
                        value={accountTypeID}
                      >
                        <option selected disabled value="">
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
                    <label className="col-sm-3 col-form-label required-input">
                      حساب
                    </label>
                    <div className="col-sm-9">
                      <select
                        className="form-control"
                        onChange={(e) => setAccountID(e.target.value)}
                        value={accountID}
                        required
                      >
                        <option selected disabled value="">
                          {accountTypeID
                            ? "انتخاب کنید"
                            : ` ابتدا نوع حساب را انتخاب کنید`}
                        </option>
                        {accounts.map((el) => (
                          <option key={el.id} value={el.id}>
                            {el.last_name
                              ? `${el.first_name} ${el.last_name}`
                              : `${el.title}`}
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
                    <label className="col-sm-3 col-form-label required-input">
                      حساب مبدا
                    </label>

                    <div className="col-sm-9">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        disabled={true}
                      >
                        {`${fName} ${lName}`}
                      </button>
                    </div>
                  </Form.Group>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="row">
                    <label className="col-sm-3 col-form-label required-input">
                      مبلغ
                    </label>
                    <div className="col-sm-9">
                      <Form.Control
                        type="number"
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        defaultValue={saleInvoiceRemain}
                      />
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
