import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import {
  getTransactions,
  getTransactionsByTitle,
  getTransactionsByMobile,
  getTransactionsByUserName,
} from "../API/transaction/getTransactions";
import { deleteTransaction } from "../API/transaction/deleteTransaction";
import Pagination from "../components/Pagination";

import Spinner from "../vendor/shared/Spinner";

import { formatMoney } from "../utils/formatMoney";
import cogoToast from "cogo-toast";
import useScript from "../utils/hooks/useScript";
import { sortTableByColumn } from "../utils/sortTableByColumn";
export const TransactionsPage = () => {
  const [transactionList, setTransactionList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  //console.log(customerList);

  useEffect(() => {
    const getData = async () => {
      const result = await getTransactions();
      //console.log(result);
      setTransactionList(result);
      setLoading(false);
    };
    getData();
  }, []);

  useScript("https://www.w3schools.com/lib/w3.js");

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentTransactions = transactionList.slice(
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
                <h4 className="card-title">لیست تراکنش ها</h4>

                <div
                  style={{
                    width: "250px",
                    marginRight: "20px",
                  }}
                >
                  <Form.Control
                    type="text"
                    placeholder="جستجو با عنوان حساب"
                    onChange={async (e) => {
                      let x = await getTransactionsByTitle({
                        title: e.target.value,
                      });
                      setTransactionList(x);
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
                    placeholder="جستجو با نام کاربری ثبت کننده"
                    onChange={async (e) => {
                      let x = await getTransactionsByUserName({
                        user_name: e.target.value,
                      });
                      setTransactionList(x);
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
                    placeholder="جستجو با شماره موبایل"
                    onChange={async (e) => {
                      let x = await getTransactionsByMobile({
                        mobile: e.target.value,
                      });
                      setTransactionList(x);
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
              <div className="table-responsive" id="transaction-tb">
                <table className="table">
                  <thead style={{ color: "white" }}>
                    <tr>
                      <th
                        onClick={() => {
                          sortTableByColumn("#transaction-tb", ".item", 1);
                        }}
                      >
                        <i className={`mdi mdi-sort`}></i>
                        شناسه تراکنش
                      </th>
                      <th
                        onClick={() => {
                          sortTableByColumn("#transaction-tb", ".item", 2);
                        }}
                      >
                        <i className={`mdi mdi-sort`}></i>
                        کاربر ثبت کننده
                      </th>
                      <th
                        onClick={() => {
                          sortTableByColumn("#transaction-tb", ".item", 3);
                        }}
                      >
                        <i className={`mdi mdi-sort`}></i>
                        شناسه فاکتور
                      </th>
                      <th
                        onClick={() => {
                          sortTableByColumn("#transaction-tb", ".item", 4);
                        }}
                      >
                        <i className={`mdi mdi-sort`}></i>
                        حساب
                      </th>
                      <th
                        onClick={() => {
                          sortTableByColumn("#transaction-tb", ".item", 5);
                        }}
                      >
                        <i className={`mdi mdi-sort`}></i>
                        نوع حساب
                      </th>

                      <th
                        onClick={() => {
                          sortTableByColumn("#transaction-tb", ".item", 6);
                        }}
                      >
                        <i className={`mdi mdi-sort`}></i>
                        مبلغ{" "}
                      </th>
                      <th
                        onClick={() => {
                          sortTableByColumn("#transaction-tb", ".item", 7);
                        }}
                      >
                        <i className={`mdi mdi-sort`}></i>
                        تاریخ{" "}
                      </th>
                      <th
                        onClick={() => {
                          sortTableByColumn("#transaction-tb", ".item", 8);
                        }}
                      >
                        <i className={`mdi mdi-sort`}></i>
                        توضیحات{" "}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentTransactions.map((transaction) => {
                      return (
                        <tr key={transaction.id} className="item">
                          <td>
                            <Dropdown>
                              <Dropdown.Toggle
                                variant="btn btn-outline-primary"
                                id="dropdownMenuOutlineButton5"
                              >
                                {transaction.id}
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item
                                  onClick={async (e) => {
                                    const {
                                      is_success,
                                    } = await deleteTransaction(transaction.id);
                                    if (is_success) {
                                      cogoToast.success("deleted successfully");
                                    } else {
                                      cogoToast.info(
                                        "something wrong happended. retry"
                                      );
                                    }
                                  }}
                                >
                                  حذف
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                          {/* <td>{`${customer.firstName} ${customer.lastName}`}</td> */}
                          <td>{transaction.user_name}</td>
                          <td>{transaction.invoice_id || "-"}</td>

                          <td>
                            {transaction.last_name
                              ? `${transaction.first_name} ${transaction.last_name}`
                              : `${transaction.title}`}
                          </td>
                          <td>{transaction.account_type_title}</td>
                          <td>
                            {formatMoney(transaction.price)} {`ریال`}
                          </td>
                          <td>{transaction.create_date_fa}</td>
                          <td>{transaction.description}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={transactionList.length}
              paginate={paginate}
            />
          </div>
        </div>
      )}
    </div>
  );
};
