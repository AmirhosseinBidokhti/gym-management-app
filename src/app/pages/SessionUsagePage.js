import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";

import {
  getCustomersCombo,
  getCustomersFulltext,
} from "../API/customer/getCustomers";

import cogoToast from "cogo-toast";

import { get_client_sale_invoice_details } from "../API/customer/getClientSaleInvoiceDetails";

import { Spinner } from "../vendor/shared/Spinner";
import { add_client_session_usage } from "../API/customer/addSessionUsage";
import Pagination from "../components/Pagination";

export const SessionUsagePage = () => {
  const [saleInvoiceDetails, setSaleInvoiceDetails] = useState([]);

  const [accountID, setAccountID] = useState(null);
  const [saleInvoiceDetailID, setSaleInvoiceDetailID] = useState(null);

  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const [customerList, setCustomerList] = useState([]);

  const [customerName, setCustomerName] = useState("");
  const [customerMobile, setCustomerMobile] = useState("");

  useEffect(() => {
    async function getCustomerData() {
      const customers = await getCustomersCombo();
      //const customers = await getCustomers();
      setCustomerList(customers);
    }
    getCustomerData();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = customerList.slice(indexOfFirstPost, indexOfLastPost);

  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-dismiss="modal"
                        data-toggle="modal"
                        data-target="#customerList"
                      >
                        {customerName && customerMobile
                          ? `${customerName} - ${customerMobile}`
                          : `انتخاب مشتری`}
                      </button>
                      {/* <select
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
                      </select> */}
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
                        {saleInvoiceDetails.map((el) => {
                          return (
                            <tr key={el.invoice_id}>
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
                          // console.log(accountID);

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
                id="customerList"
                role="dialog"
                aria-labelledby="customerList"
                aria-hidden="true"
              >
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-body">
                      <div className="modal-header">
                        مشتریان
                        <div
                          style={{
                            width: "17rem",
                            marginRight: "16px",
                          }}
                        >
                          <Form.Control
                            type="text"
                            placeholder="جستجو براساس نام/ نام خانوادگی/ موبایل"
                            onChange={async (e) => {
                              let x = await getCustomersFulltext(
                                e.target.value
                              );
                              setCustomerList(x);
                            }}
                          />
                        </div>
                      </div>
                      <div className="table-responsive table-hover">
                        <table className="table">
                          <thead style={{ color: "grey" }}>
                            <tr>
                              <th>نام و نام خانوادگی</th>
                              <th>شماره تلفن</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentPosts.map((customer) => {
                              return (
                                <tr
                                  key={customer.id}
                                  style={{ cursor: "pointer" }}
                                  onClick={async (e) => {
                                    setAccountID(customer.id);

                                    setLoading(true);
                                    const data = await get_client_sale_invoice_details(
                                      customer.id
                                    );
                                    setCustomerName(customer.last_name);
                                    setCustomerMobile(customer.mobile);
                                    setSaleInvoiceDetails(data);
                                    setLoading(false);
                                  }}
                                  data-dismiss="modal"
                                >
                                  <td>
                                    {customer.first_name} {customer.last_name}
                                  </td>
                                  <td>{customer.mobile}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        انصراف
                      </button>
                    </div>
                    <Pagination
                      postsPerPage={postsPerPage}
                      totalPosts={customerList.length}
                      paginate={paginate}
                    />
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
                        onClick={async () => {
                          // console.log(accountID);
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
