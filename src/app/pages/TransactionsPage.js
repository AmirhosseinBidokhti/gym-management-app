import React, { useState, useEffect } from "react";
import { ProgressBar } from "react-bootstrap";
import { Dropdown, ButtonGroup } from "react-bootstrap";
import { getTransactions } from "../API/transaction/getTransactions";
import { deleteTransaction } from "../API/transaction/deleteTransaction";

import Spinner from "../vendor/shared/Spinner";
import { Link } from "react-router-dom";
import { formatMoney } from "../utils/formatMoney";
export const TransactionsPage = () => {
  const [transactionList, setTransactionList] = useState([]);
  const [loading, setLoading] = useState(true);
  //console.log(customerList);

  useEffect(() => {
    const getData = async () => {
      const result = await getTransactions();
      console.log(result);
      setTransactionList(result);
      setLoading(false);
    };
    getData();
  }, [null]);

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
                <table className="table">
                  <thead style={{ color: "white" }}>
                    <tr>
                      <th> شناسه تراکنش</th>
                      <th> شناسه ثبت کننده</th>
                      <th> نوع تراکنش </th>
                      <th> نوع حساب</th>
                      <th> حساب </th>
                      <th> مبلغ </th>
                      <th> تاریخ </th>
                      <th> توضیحات </th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactionList.map((transaction) => {
                      return (
                        <tr key={transaction.id}>
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
                                      isSuccess,
                                    } = await deleteTransaction(transaction.id);
                                    if (isSuccess) {
                                      window.location.reload();
                                    }
                                  }}
                                >
                                  حذف
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                          {/* <td>{`${customer.firstName} ${customer.lastName}`}</td> */}
                          <td>{transaction.user_id}</td>
                          <td>{transaction.is_variz ? "واریز" : "برداشت"}</td>
                          {/* <td>{transaction.account_type.title}</td>
                          <td>{transaction.account.title}</td> */}
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
          </div>
        </div>
      )}
    </div>
  );
};
