import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";

import {
  getSaleInvoices,
  getSaleInvoicesByLastName,
  getSaleInvoicesByMobile,
  getSaleInvoicesByFirstName,
} from "../API/saleInvoice/getSaleInvoices";
import Spinner from "../vendor/shared/Spinner";
// import { Link } from "react-router-dom";
import { deleteSaleInvoice } from "../API/saleInvoice/deleteSaleInvoice";
import { formatMoney } from "../utils/formatMoney";
import Pagination from "../components/Pagination";
import cogoToast from "cogo-toast";
import { sortTableByColumn } from "../utils/sortTableByColumn";
import useScript from "../utils/hooks/useScript";
export const SaleInvoicesPage = () => {
  const [saleInvoiceList, setSaleInvoiceList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  //console.log(customerList);

  useEffect(() => {
    const getData = async () => {
      const result = await getSaleInvoices();
      console.log(result);
      setSaleInvoiceList(result);
      setLoading(false);
    };
    getData();
  }, []);
  useScript("https://www.w3schools.com/lib/w3.js");
  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentSaleInvoices = saleInvoiceList.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {loading ? (
        <div
          style={{
            marginTop: "3rem",
          }}
        >
          <Spinner />
        </div>
      ) : (
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div style={{ display: "flex" }}>
                <h4 className="card-title">لیست فاکتور های فروش</h4>
                <div
                  style={{
                    width: "250px",
                    marginRight: "20px",
                  }}
                >
                  <Form.Control
                    type="text"
                    placeholder="جستجو بر اساس نام "
                    onChange={async (e) => {
                      let x = await getSaleInvoicesByFirstName({
                        first_name: e.target.value,
                      });
                      setSaleInvoiceList(x);
                    }}
                  />
                </div>
                <div
                  style={{
                    width: "250px",
                    marginRight: "20px",
                  }}
                >
                  <Form.Control
                    type="text"
                    placeholder="جستجو بر اساس نام خانوادگی"
                    onChange={async (e) => {
                      let x = await getSaleInvoicesByLastName({
                        last_name: e.target.value,
                      });
                      setSaleInvoiceList(x);
                    }}
                  />
                </div>
                <div
                  style={{
                    width: "250px",
                    marginRight: "20px",
                  }}
                >
                  <Form.Control
                    type="text"
                    placeholder="جستجو بر اساس شماره موبایل "
                    onChange={async (e) => {
                      let x = await getSaleInvoicesByMobile({
                        mobile: e.target.value,
                      });
                      setSaleInvoiceList(x);
                    }}
                  />
                </div>

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
              <p className="card-description"></p>
              <div className="table-responsive ">
                <table className="table" id="invoice-table">
                  <thead style={{ color: "white" }}>
                    <tr>
                      <th
                        onClick={() => {
                          sortTableByColumn("#invoice-table", ".item", 1);
                        }}
                      >
                        <i className={`mdi mdi-sort`}></i>
                        شناسه{" "}
                      </th>
                      <th
                        onClick={() => {
                          sortTableByColumn("#invoice-table", ".item", 2);
                        }}
                      >
                        <i className={`mdi mdi-sort`}></i>
                        تاریخ ثبت
                      </th>
                      <th
                        onClick={() => {
                          sortTableByColumn("#invoice-table", ".item", 3);
                        }}
                      >
                        <i className={`mdi mdi-sort`}></i>
                        مشتری
                      </th>
                      <th
                        onClick={() => {
                          sortTableByColumn("#invoice-table", ".item", 4);
                        }}
                      >
                        <i className={`mdi mdi-sort`}></i>
                        کالا{" "}
                      </th>
                      <th
                        onClick={() => {
                          sortTableByColumn("#invoice-table", ".item", 5);
                        }}
                      >
                        <i className={`mdi mdi-sort`}></i>
                        نحوه پرداخت{" "}
                      </th>
                      <th
                        onClick={() => {
                          sortTableByColumn("#invoice-table", ".item", 6);
                        }}
                      >
                        <i className={`mdi mdi-sort`}></i>
                        تعداد{" "}
                      </th>
                      <th
                        onClick={() => {
                          sortTableByColumn("#invoice-table", ".item", 7);
                        }}
                      >
                        <i className={`mdi mdi-sort`}></i>
                        مبلغ{" "}
                      </th>
                      <th
                        onClick={() => {
                          sortTableByColumn("#invoice-table", ".item", 8);
                        }}
                      >
                        <i className={`mdi mdi-sort`}></i>
                        تخفیف{" "}
                      </th>
                      <th
                        onClick={() => {
                          sortTableByColumn("#invoice-table", ".item", 9);
                        }}
                      >
                        <i className={`mdi mdi-sort`}></i> توضیحات{" "}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentSaleInvoices.map(
                      ({
                        id,
                        inv_date_fa,
                        qty,
                        first_name,
                        last_name,
                        payment_type_title,
                        product_name,
                        reduction,
                        price,
                        memo,
                      }) => {
                        return (
                          <tr key={id} className="item">
                            <td>
                              <Dropdown>
                                <Dropdown.Toggle
                                  variant="btn btn-outline-primary"
                                  id="dropdownMenuOutlineButton5"
                                >
                                  {id}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item
                                    onClick={async (e) => {
                                      const {
                                        is_success,
                                      } = await deleteSaleInvoice(id);
                                      if (is_success) {
                                        cogoToast.success("با موفقیت حذف شد");
                                        setTimeout(() => {
                                          window.location.reload();
                                        }, 1200);
                                      }
                                    }}
                                  >
                                    حذف
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                            <td>{inv_date_fa}</td>
                            <td>{`${first_name} ${last_name}`}</td>
                            <td>{product_name}</td>
                            <td>{payment_type_title}</td>
                            <td>{qty}</td>
                            <td>
                              {formatMoney(price)} {`ریال`}
                            </td>

                            <td>
                              {formatMoney(reduction)} {`ریال`}
                            </td>

                            <td>{memo}</td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={saleInvoiceList.length}
              paginate={paginate}
            />
          </div>
        </div>
      )}
    </div>
  );
};
