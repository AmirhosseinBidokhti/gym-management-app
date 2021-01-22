import React, { useState, useEffect } from "react";
import { ProgressBar } from "react-bootstrap";
import { Dropdown, ButtonGroup } from "react-bootstrap";
import { getTransactions } from "../utils/api/transaction/getTransactions";
import { deleteTransaction } from "../utils/api/transaction/deleteTransaction";

import Spinner from "../vendor/shared/Spinner";
import { Link } from "react-router-dom";
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
              <h4 className="card-title">لیست تراکنش ها</h4>
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
                          <td>{transaction.userID}</td>
                          <td>{transaction.isVariz ? "واریز" : "برداشت"}</td>
                          <td>{transaction.accountType.title}</td>
                          <td>{transaction.account.lastName}</td>
                          <td>{transaction.price}</td>
                          <td>{transaction.createDateFa}</td>
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
