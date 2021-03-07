import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";

import Spinner from "../vendor/shared/Spinner";
import Pagination from "../components/Pagination";
import { formatMoney } from "../utils/formatMoney";
import { getAccounts, getAccountsByTitle } from "../API/account/getAccounts";
import { sortTableByColumn } from "../utils/sortTableByColumn";
import useScript from "../utils/hooks/useScript";
const AccountsPage = () => {
  let [accountList, setAccountList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  //console.log(customerList);

  useEffect(() => {
    getData();
  }, []);

  useScript("https://www.w3schools.com/lib/w3.js");

  const getData = async () => {
    const result = await getAccounts();
    console.log(result);
    setAccountList(result);
    setLoading(false);
  };

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentAccountList = accountList.slice(
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
                <h4 className="card-title">لیست حساب ها</h4>

                <div
                  style={{
                    width: "250px",
                    marginRight: "20px",
                  }}
                >
                  <Form.Control
                    type="text"
                    placeholder="جستجو بر اساس نام/عنوان"
                    onChange={async (e) => {
                      let x = await getAccountsByTitle(e.target.value);
                      setAccountList(x);
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
              <div className="table-responsive" id="account-tb">
                <table className="table">
                  <thead style={{ color: "white" }}>
                    <tr>
                      <th
                        onClick={() => {
                          sortTableByColumn("#account-tb", ".item", 1);
                        }}
                      >
                        <i className={`mdi mdi-sort`}></i>
                        شناسه حساب
                      </th>
                      <th
                        onClick={() => {
                          sortTableByColumn("#account-tb", ".item", 2);
                        }}
                      >
                        <i className={`mdi mdi-sort`}></i>
                        نوع حساب
                      </th>
                      <th
                        onClick={() => {
                          sortTableByColumn("#account-tb", ".item", 3);
                        }}
                      >
                        <i className={`mdi mdi-sort`}></i>
                        نام/عنوان
                      </th>
                      <th
                        onClick={() => {
                          sortTableByColumn("#account-tb", ".item", 4);
                        }}
                      >
                        <i className={`mdi mdi-sort`}></i>
                        مانده حساب
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentAccountList.map((account) => {
                      return (
                        <tr key={account.id} className="item">
                          <td>
                            <Dropdown drop="up">
                              <Dropdown.Toggle
                                variant="btn btn-outline-primary"
                                id="dropdownMenuOutlineButton5"
                              >
                                {account.id}
                              </Dropdown.Toggle>
                            </Dropdown>
                          </td>

                          <td>{account.account_type_title}</td>
                          <td>{account.title}</td>
                          <td>
                            {formatMoney(account.balance)} {`ریال`}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={accountList.length}
              paginate={paginate}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountsPage;
