import React, { useState, useEffect } from "react";
import { Form, ProgressBar } from "react-bootstrap";
import { Dropdown, ButtonGroup } from "react-bootstrap";

//import { customerAdd } from "../API/customer/customerAdd";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  getCustomers,
  getCustomers2,
  getCustomersbyFirstName,
  getCustomers3,
} from "../API/customer/getCustomers";
import { fileDownload, fileDownload_v2 } from "../API/fileUpload/fileDownload";
import Spinner from "../vendor/shared/Spinner";
import { Link } from "react-router-dom";
import cogoToast from "cogo-toast";
import Pagination from "../components/Pagination";
import { formatMoney } from "../utils/formatMoney";
const CustomersPage = () => {
  let [customerList, setCustomerList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  //console.log(customerList);

  useEffect(() => {
    getData();
  }, [null]);

  const getData = async () => {
    const result = await getCustomers();
    console.log(result);
    setCustomerList(result);
    setLoading(false);
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
                    width: "250px",
                    marginRight: "20px",
                  }}
                >
                  <Form.Control
                    type="text"
                    placeholder="جستجو بر اساس نام"
                    onChange={async (e) => {
                      let x = await getCustomersbyFirstName({
                        first_name: e.target.value,
                      });
                      setCustomerList(x);
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
                      let x = await getCustomers2({
                        last_name: e.target.value,
                      });
                      setCustomerList(x);
                    }}
                  />
                </div>
                <div
                  style={{
                    width: "250px",
                    marginRight: "10px",
                  }}
                >
                  <Form.Control
                    type="text"
                    placeholder="جستجو بر اساس شماره موبایل "
                    onChange={async (e) => {
                      let x = await getCustomers3({
                        mobile: e.target.value,
                      });
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
                <table className="table">
                  <thead style={{ color: "white" }}>
                    <tr>
                      <th> شناسه </th>
                      <th> نام و نام خانوادگی </th>
                      <th> جنسیت </th>
                      <th> تلفن همراه </th>
                      <th> آدرس </th>
                      <th> مانده حساب </th>
                      <th> فایل آپلودشده</th>
                    </tr>
                  </thead>
                  <tbody>
                    {" "}
                    {currentPosts.map((customer) => {
                      return (
                        <tr key={customer.id}>
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
                          <td>{customer.gender ? "مرد" : "زن"}</td>
                          <td>{customer.mobile}</td>
                          <td>{customer.address}</td>
                          <td>
                            {formatMoney(customer.balance)} {`ریال`}
                          </td>

                          <td>
                            {" "}
                            <button
                              type="button"
                              className="btn btn-outline-secondary"
                              onClick={async (e) => {
                                const file = await fileDownload_v2(
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
