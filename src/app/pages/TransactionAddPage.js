import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { getAccountTypes } from "../API/transaction/getAccountTypes";

//import { getCustomers } from "../API/customer/getCustomers";
import { addTranscation } from "../API/transaction/addTransaction";
import { getAccountByType } from "../API/transaction/getAccountByType";
import cogoToast from "cogo-toast";
import { Link } from "react-router-dom";
import { getAccountsAll } from "../API/account/getAccountsAll";
import Pagination from "../components/Pagination";
import { getAccountsFullText } from "../API/account/getAccountsFullText";

export const TransactionAddPage = () => {
  const [isDaryaft, setIsDaryaft] = useState(null);
  const [accountTypes, setAccountTypes] = useState([]);
  const [accountTypeID, setAccountTypeID] = useState(null);
  const [accountIdFromto, setAccountIdFromto] = useState(null);
  const [price, setPrice] = useState(null);
  const [label, setLabel] = useState(null);
  const [description, setdescription] = useState("");

  const [accountID, setAccountID] = useState(null);

  const [accounts, setAccounts] = useState([]);

  const [loading, setLoading] = useState(false);

  const [allAccounts, setAllAccounts] = useState([]);
  const [accountLabel, setAccountLabel] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  //const [customerList, setCustomerList] = useState([]);

  const submitHandler = async (e) => {
    const transactionObj = {
      is_daryaft: isDaryaft,
      account_type_id: parseInt(accountTypeID),
      price: price,
      description: description,
      account_id: accountID,
      user_id: JSON.parse(localStorage.getItem("userInfo")).user_id,
      account_id_fromto: accountIdFromto,
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
      }, 190);
    } else {
      console.log("try again something was wrong");
    }
    setLoading(false);
  };

  useEffect(() => {
    async function getAccountTypeData() {
      const data = await getAccountTypes();
      setAccountTypes(data);
      // const customers = await getCustomers();
      const allAccounts = await getAccountsAll();
      setAllAccounts(allAccounts);
    }
    getAccountTypeData();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentAllAccounts = allAccounts.slice(
    indexOfFirstPost,
    indexOfLastPost
  );
  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                      <select
                        className="form-control"
                        onChange={async (e) => {
                          console.log(e.target.value);
                          setIsDaryaft(e.target.value);
                          console.log(isDaryaft);
                          if (e.target.value == "false") {
                            setLabel("حساب مقصد");
                            // const data = await getAccountByType(2);
                            // setFromToAccounts(data);
                          } else if (e.target.value == "true") {
                            setLabel("حساب مبدا");
                            // const data = await getAccountByType(1);
                            // setFromToAccounts(data);
                          }
                        }}
                        required
                      >
                        <option selected disabled>
                          انتخاب کنید
                        </option>
                        <option value={true}>دریافت</option>
                        <option value={false}>پرداخت</option>
                      </select>
                    </div>
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group className="row">
                    <label className="col-sm-3 col-form-label required-input">
                      مبلغ
                    </label>
                    <div className="col-sm-9">
                      <Form.Control
                        type="text"
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        value={
                          price &&
                          price
                            .toString()
                            .replace(/,/g, "")
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                      />
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
                      {label || "حساب"}
                    </label>

                    <div className="col-sm-9">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-dismiss="modal"
                        data-toggle="modal"
                        data-target="#accountsfromto"
                      >
                        {accountLabel.last_name
                          ? `${accountLabel.first_name} - ${accountLabel.last_name}`
                          : accountLabel.title
                          ? `${accountLabel.title}`
                          : `انتخاب کنید`}
                      </button>
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
      <div
        className="modal fade"
        id="accountsfromto"
        role="dialog"
        aria-labelledby="accountsfromto"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <div className="modal-header">
                حساب ها
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
                      let x = await getAccountsFullText(e.target.value);
                      setAllAccounts(x);
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
                    {currentAllAccounts.map((account) => {
                      return (
                        <tr
                          key={account.id}
                          style={{ cursor: "pointer" }}
                          onClick={async (e) => {
                            // setAccountID(customer.id);
                            // //console.log(e.target.value);
                            // setLoading(true);
                            // setCustomerName(customer.last_name);
                            // setCustomerMobile(customer.mobile);
                            // setLoading(false);
                            setAccountLabel({
                              first_name: account.first_name,
                              last_name: account.last_name,
                              title: account.title,
                            });
                            setAccountIdFromto(account.id);
                          }}
                          data-dismiss="modal"
                        >
                          <td>
                            {account.last_name
                              ? `${account.first_name} ${account.last_name}`
                              : `${account.title}`}
                          </td>
                          <td>{account.mobile ? `${account.mobile}` : `-`}</td>
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
              totalPosts={allAccounts.length}
              paginate={paginate}
            />
          </div>
        </div>
      </div>
    </>
  );
};
