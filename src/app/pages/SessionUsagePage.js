import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";

import { getCustomers, getCustomersCombo } from "../API/customer/getCustomers";

import cogoToast from "cogo-toast";
import { Button, Dropdown, Modal } from "bootstrap";
import { Link } from "react-router-dom";
import { get_client_sale_invoice_details } from "../API/customer/getClientSaleInvoiceDetails";

import { Spinner } from "../vendor/shared/Spinner";
import {
  addSessionFetchVersion,
  add_client_session_usage,
} from "../API/customer/addSessionUsage";

export const SessionUsagePage = () => {
  const [saleInvoiceDetails, setSaleInvoiceDetails] = useState([]);

  const [accountID, setAccountID] = useState(null);
  const [saleInvoiceDetailID, setSaleInvoiceDetailID] = useState(null);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [customerList, setCustomerList] = useState([]);

  // const submitHandler = async (e) => {
  //   //   const transactionObj = {
  //   //     is_variz: variz,
  //   //     account_type_id: parseInt(accountTypeID),
  //   //     price: parseInt(price),
  //   //     description: description,
  //   //     account_id: accountID,
  //   //     user_id: JSON.parse(localStorage.getItem("userInfo")).user_id,
  //   //   };
  //   //   e.preventDefault();
  //   //   setLoading(true);
  //   //   const { data, is_success } = await addTranscation(transactionObj);
  //   //   console.log(transactionObj);
  //   //   console.log(data);
  //   //   if (is_success) {
  //   //     setSuccess(is_success);
  //   //     cogoToast.success("تراکنش با موفقیت ثبت شد");
  //   //   } else {
  //   //     console.log("try again something was wrong");
  //   //   }
  //   //   setLoading(false);
  // };

  useEffect(() => {
    async function getCustomerData() {
      const customers = await getCustomersCombo();
      //const customers = await getCustomers();
      setCustomerList(customers);
    }
    getCustomerData();
  }, []);

  return (
    <>
      <div className="col-12 grid-margin">
        <div className="card">
          <div className="card-body">
            <div style={{ display: "flex" }}>
              <h4 className="card-title">فرم ورود مشتری</h4>

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

            <div className="form-sample">
              <p className="card-description"> </p>

              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="row">
                    <label className="col-sm-3 col-form-label">مشتری</label>
                    <div className="col-sm-9">
                      <select
                        className="form-control"
                        onChange={async (e) => {
                          setAccountID(e.target.value);
                          console.log(e.target.value);
                          setLoading(true);
                          const data = await get_client_sale_invoice_details(
                            e.target.value
                          );
                          setSaleInvoiceDetails(data);
                          setLoading(false);
                        }}
                        value={accountID}
                        required
                      >
                        <option selected disabled defaultValue="">
                          انتخاب مشتری
                        </option>
                        {customerList.map((el) => (
                          <option key={el.id} value={el.id}>
                            {`${el.first_name} ${el.last_name}`}
                          </option>
                        ))}
                      </select>
                    </div>
                  </Form.Group>
                </div>
              </div>

              <>
                {loading ? (
                  <Spinner />
                ) : (
                  <div className="table-responsive ">
                    <table className="table">
                      <thead style={{ color: "white" }}>
                        <tr>
                          <th> نام محصول </th>
                          <th> تاریخ ثبت فاکتور </th>
                          <th> شناسه فاکتور</th>
                          <th> تعداد جلسات </th>
                          <th> تعداد جلسات استفاده شده </th>
                          <th> ثبت یک جلسه تمرین</th>
                          <th> عملیات بازگشت</th>
                        </tr>
                      </thead>
                      <tbody>
                        {" "}
                        {saleInvoiceDetails.map((el) => {
                          return (
                            <tr key={el.invoice_id}>
                              {/* <td>
                                <Dropdown drop="up">
                                  <Dropdown.Toggle
                                    variant="btn btn-outline-primary"
                                    id="dropdownMenuOutlineButton5"
                                  >
                                    {customer.id}
                                  </Dropdown.Toggle>
                                  <Dropdown.Menu>
                                    <Dropdown.Item
                                    // as={Link}
                                    // to={`/customer/customer-checkup/${customer.id}`}
                                    >
                                      مشاهده چک آپ
                                    </Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown>
                              </td> */}
                              <td>{el.product_name}</td>
                              <td>{el.invoice_date_fa}</td>
                              <td>{el.sale_invoice_details_id}</td>
                              <td>{el.session_qty}</td>
                              <td>{el.session_used}</td>

                              <td>
                                <button
                                  type="button"
                                  className="btn btn-primary"
                                  data-toggle="modal"
                                  data-target="#exampleModal"
                                  onClick={(e) =>
                                    setSaleInvoiceDetailID(
                                      el.sale_invoice_details_id
                                    )
                                  }
                                >
                                  ثبت ورود مشتری
                                </button>
                              </td>
                              <td>
                                <button
                                  type="button"
                                  className="btn btn-danger"
                                  data-toggle="modal"
                                  data-target="#exampleModal2"
                                  onClick={(e) =>
                                    setSaleInvoiceDetailID(
                                      el.sale_invoice_details_id
                                    )
                                  }
                                >
                                  کنسل کردن ثبت ورود
                                </button>
                              </td>

                              {/* <td>
                                {" "}
                                <button
                                  type="button"
                                  classNameName="btn btn-outline-secondary"
                                >
                                  <i classNameName="mdi mdi-format-vertical-align-bottom"></i>
                                </button>
                              </td> */}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
              <div
                className="modal fade"
                id="exampleModal"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-body">
                      آیا از انجام عملیات مطمئن می باشید؟
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-primary"
                        // disabled={el.session_qty === el.session_used}
                        onClick={async (e) => {
                          console.log(accountID);

                          const {
                            is_success,
                            dev_message,
                          } = await add_client_session_usage({
                            sale_invoice_details_id: saleInvoiceDetailID,
                            customer_id: accountID,
                            is_use: true,
                          });

                          if (is_success) {
                            cogoToast.success("عملیات با موفقیت انجام شد");
                            // window.location.reload();
                          } else {
                            cogoToast.error(`${dev_message}`);
                          }

                          const data = await get_client_sale_invoice_details(
                            accountID
                          );
                          setSaleInvoiceDetails(data);
                        }}
                        data-dismiss="modal"
                      >
                        ثبت
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        انصراف
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="modal fade"
                id="exampleModal2"
                role="dialog"
                aria-labelledby="exampleModalLabel2"
                aria-hidden="true"
              >
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-body">
                      آیا از انجام عملیات مطمئن می باشید؟
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={async (e) => {
                          console.log(accountID);

                          const {
                            is_success,
                            dev_message,
                          } = await add_client_session_usage({
                            sale_invoice_details_id: saleInvoiceDetailID,
                            customer_id: accountID,
                            is_use: false,
                          });

                          if (is_success) {
                            cogoToast.success("عملیات با موفقیت انجام شد");
                            // window.location.reload();
                          } else {
                            cogoToast.error(`${dev_message}`);
                          }

                          const data = await get_client_sale_invoice_details(
                            accountID
                          );
                          setSaleInvoiceDetails(data);
                        }}
                        data-dismiss="modal"
                      >
                        ثبت
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        انصراف
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
