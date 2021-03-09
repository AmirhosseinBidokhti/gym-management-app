import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import useScript from "../utils/hooks/useScript";

import {
  getCustomers,
  getCustomersFulltext,
} from "../API/customer/getCustomers";
import { fileDownload_v2 } from "../API/fileUpload/fileDownload";
import Spinner from "../vendor/shared/Spinner";

import Pagination from "../components/Pagination";
import { formatMoney } from "../utils/formatMoney";
import { Link } from "react-router-dom";
import { sortTableByColumn } from "../utils/sortTableByColumn";

const CustomersPage = () => {
  let [customerList, setCustomerList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  //const [toggleSort, setToggleSort] = useState(null);
  //console.log(customerList);

  useEffect(() => {
    let isMounted = true;
    getData(isMounted);
  }, []);

  useScript("https://www.w3schools.com/lib/w3.js");

  const getData = async (isMounted) => {
    const result = await getCustomers();
    if (isMounted) {
      setCustomerList(result);
    }
    //console.log(result);
    setLoading(false);
    return () => {
      isMounted = false;
    };
  };

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = customerList.slice(indexOfFirstPost, indexOfLastPost);

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
                <h4 className="card-title">لیست مشتریان</h4>
                <div
                  style={{
                    width: "21rem",
                    marginRight: "16px",
                  }}
                >
                  <Form.Control
                    type="text"
                    placeholder="جستجو براساس نام/ نام خانوادگی/ موبایل"
                    onChange={async (e) => {
                      let x = await getCustomersFulltext(e.target.value);
                      setCustomerList(x);
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
                <table className="table" id="example">
                  <thead style={{ color: "white" }}>
                    <tr>
                      <th
                        onClick={() => {
                          sortTableByColumn("#example", ".item", 1);
                        }}
                      >
                        <i className={`mdi mdi-sort`}></i>
                        شناسه
                      </th>
                      <th
                        onClick={() =>
                          sortTableByColumn("#example", ".item", 2)
                        }
                      >
                        <i className={`mdi mdi-sort`}></i>
                        نام و نام خانوادگی
                      </th>
                      <th
                        onClick={() =>
                          sortTableByColumn("#example", ".item", 3)
                        }
                      >
                        <i className={`mdi mdi-sort`}></i>
                        تاریخ عضویت
                      </th>
                      <th
                        onClick={() =>
                          sortTableByColumn("#example", ".item", 4)
                        }
                      >
                        <i className={`mdi mdi-sort`}></i>
                        جنسیت
                      </th>
                      <th
                        onClick={() =>
                          sortTableByColumn("#example", ".item", 5)
                        }
                      >
                        <i className={`mdi mdi-sort`}></i>
                        تلفن همراه
                      </th>
                      <th
                        onClick={() =>
                          sortTableByColumn("#example", ".item", 6)
                        }
                      >
                        <i className={`mdi mdi-sort`}></i>
                        آدرس
                      </th>
                      <th
                        onClick={() =>
                          sortTableByColumn("#example", ".item", 7)
                        }
                      >
                        <i className={`mdi mdi-sort`}></i>
                        مانده حساب
                      </th>
                      <th> فایل آپلودشده</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPosts.map((customer) => {
                      return (
                        <tr key={customer.id} className="item">
                          <td>
                            <Dropdown drop="up">
                              <Dropdown.Toggle
                                variant="btn btn-outline-primary"
                                id="dropdownMenuOutlineButton5"
                              >
                                {customer.id}
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item
                                  as={Link}
                                  to={`/customer/customer-checkup/${customer.id}`}
                                >
                                  مشاهده چک آپ
                                </Dropdown.Item>

                                <Dropdown.Item
                                  as={Link}
                                  to={`/customer/edit-customer/${customer.id}`}
                                >
                                  ویرایش
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                          <td>{`${customer.first_name} ${customer.last_name}`}</td>
                          <td>{customer.create_date_fa.split(" ").shift()}</td>
                          <td>{customer.gender ? "مرد" : "زن"}</td>
                          <td>{customer.mobile}</td>
                          <td>{customer.address}</td>
                          <td>
                            {formatMoney(customer.balance)} {`ریال`}
                          </td>

                          <td>
                            <button
                              type="button"
                              className="btn btn-outline-secondary"
                              onClick={async (e) => {
                                await fileDownload_v2(
                                  customer.contract_file_path
                                );
                                //window.location.href = `${file}`;
                              }}
                              disabled={
                                customer.contract_file_path ? false : true
                              }
                            >
                              <i className="mdi mdi-format-vertical-align-bottom"></i>
                            </button>
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
              totalPosts={customerList.length}
              paginate={paginate}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomersPage;
