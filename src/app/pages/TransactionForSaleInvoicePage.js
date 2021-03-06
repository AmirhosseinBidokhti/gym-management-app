import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
// import { getAccountTypes } from "../API/transaction/getAccountTypes";

//import { getCustomers } from "../API/customer/getCustomers";
import { addTranscation } from "../API/transaction/addTransaction";
// import { getAccountByType } from "../API/transaction/getAccountByType";
import cogoToast from "cogo-toast";
import { Link } from "react-router-dom";
import { getSaleInvoiceTypes } from "../API/saleInvoice/getSaleInvoiceTypes";

export const TransactionForSaleInvoicePage = ({ match }) => {
  const [variz, setVariz] = useState(null);
  const [price, setPrice] = useState(null);
  const [description, setdescription] = useState("");

  const [accounts, setAccounts] = useState([]);
  const [saleInvoiceTypes, setSaleInvoiceTypes] = useState([]);
  const [saleInvoiceTypeID, setSaleInvoiceTypeID] = useState(null);

  const [loading, setLoading] = useState(false);

  const saleInvoiceID = match.params.id;
  const saleInvoicePrice = match.params.price;
  const accountID = match.params.account_id;

  const submitHandler = async (e) => {
    const transactionObj = {
      is_variz: variz,
      price: price ? parseInt(price) : saleInvoicePrice,
      description: description,
      account_id: accountID,
      user_id: JSON.parse(localStorage.getItem("userInfo")).user_id,
      invoice_id: saleInvoiceID,
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
                    <label className="col-sm-3 col-form-label required-input">
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
                        required
                      >
                        <option selected disabled value="">
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
                {" "}
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
                        defaultValue={saleInvoicePrice}
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
