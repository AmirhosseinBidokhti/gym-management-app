import React, { useState, useEffect } from "react";
import { ProgressBar } from "react-bootstrap";
import { Dropdown, ButtonGroup } from "react-bootstrap";
import { customerAdd } from "../utils/api/customer/customerAdd";
import { getCustomers } from "../utils/api/customer/getCustomers";
import { fileDownload } from "../utils/api/fileUpload/fileDownload";
import Spinner from "../vendor/shared/Spinner";
import { Link } from "react-router-dom";
const CustomersPage = () => {
  const [customerList, setCustomerList] = useState([]);
  const [loading, setLoading] = useState(true);
  //console.log(customerList);

  useEffect(() => {
    const getData = async () => {
      const result = await getCustomers();
      console.log(result);
      setCustomerList(result);
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
                <h4 className="card-title">لیست مشتریان</h4>
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
                      <th> فایل آپلودشده</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customerList.map((customer) => {
                      return (
                        <tr key={customer.id}>
                          <td>
                            <Dropdown>
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
                          <td>{`${customer.firstName} ${customer.lastName}`}</td>
                          <td>{customer.gender ? "مرد" : "زن"}</td>
                          <td>{customer.mobile}</td>
                          <td>{customer.address}</td>

                          <td>
                            {" "}
                            <button
                              type="button"
                              className="btn btn-outline-secondary"
                              onClick={async (e) => {
                                const file = await fileDownload(
                                  customer.contractFilePath
                                );
                                window.location.href = `${file}`;
                              }}
                              disabled={
                                customer.contractFilePath ? false : true
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
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomersPage;
