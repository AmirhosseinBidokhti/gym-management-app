import React, { useState, useEffect } from "react";
import { ProgressBar } from "react-bootstrap";
import { Dropdown, ButtonGroup } from "react-bootstrap";
import { customerAdd } from "../utils/api/customer/customerAdd";
import { getCustomers } from "../utils/api/customer/getCustomers";
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
              <h4 className="card-title">لیست مشتریان</h4>
              <p className="card-description"></p>
              <div className="table-responsive ">
                <table className="table">
                  <thead style={{ color: "white" }}>
                    <tr>
                      <th> شناسه </th>
                      <th> نام و نام خانوادگی </th>
                      <th> تلفن همراه </th>
                      <th> آدرس </th>
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

                                <Dropdown.Item>ویرایش</Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                          <td>{`${customer.firstName} ${customer.lastName}`}</td>
                          <td>{customer.mobile}</td>
                          <td>{customer.address}</td>
                        </tr>
                      );
                    })}
                    {/* <tr>
                    <td> 1 </td>
                    <td> Herman Beck </td>
                    <td>
                      <ProgressBar variant="success" now={25} />
                    </td>
                    <td> $ 77.99 </td>
                    <td> May 15, 2015 </td>
                  </tr>
                  <tr>
                    <td> 2 </td>
                    <td> Messsy Adam </td>
                    <td>
                      <ProgressBar variant="danger" now={75} />
                    </td>
                    <td> $245.30 </td>
                    <td> July 1, 2015 </td>
                  </tr>
                  <tr>
                    <td> 3 </td>
                    <td> John Richards </td>
                    <td>
                      <ProgressBar variant="warning" now={90} />
                    </td>
                    <td> $138.00 </td>
                    <td> Apr 12, 2015 </td>
                  </tr>
                  <tr>
                    <td> 4 </td>
                    <td> Peter Meggik </td>
                    <td>
                      <ProgressBar variant="primary" now={50} />
                    </td>
                    <td> $ 77.99 </td>
                    <td> May 15, 2015 </td>
                  </tr>
                  <tr>
                    <td> 5 </td>
                    <td> Edward </td>
                    <td>
                      <ProgressBar variant="danger" now={35} />
                    </td>
                    <td> $ 160.25 </td>
                    <td> May 03, 2015 </td>
                  </tr>
                  <tr>
                    <td> 6 </td>
                    <td> John Doe </td>
                    <td>
                      <ProgressBar variant="info" now={65} />
                    </td>
                    <td> $ 123.21 </td>
                    <td> April 05, 2015 </td>
                  </tr>
                  <tr>
                    <td> 7 </td>
                    <td> Henry Tom </td>
                    <td>
                      <ProgressBar variant="warning" now={20} />
                    </td>
                    <td> $ 150.00 </td>
                    <td> June 16, 2015 </td>
                  </tr>
                 */}
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
