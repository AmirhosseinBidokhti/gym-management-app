import React, { useState, useEffect } from "react";
import { ProgressBar } from "react-bootstrap";
import { Dropdown, ButtonGroup } from "react-bootstrap";
import { getProducts } from "../utils/api/products/getProducts";
import Spinner from "../vendor/shared/Spinner";
import { Link } from "react-router-dom";
export const SaleInvoicesPage = () => {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  //console.log(customerList);

  useEffect(() => {
    const getData = async () => {
      const result = await getProducts();
      console.log(result);
      setProductList(result);
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
                      <th>نام محصول</th>
                      <th> قیمت </th>
                      <th> تعداد جلسات </th>
                      <th> تاریخ شروع </th>
                      <th> تاریخ پایان </th>
                    </tr>
                  </thead>
                  <tbody>
                    {productList.map((product) => {
                      return (
                        <tr key={product.id}>
                          <td>
                            <Dropdown>
                              <Dropdown.Toggle
                                variant="btn btn-outline-primary"
                                id="dropdownMenuOutlineButton5"
                              >
                                {product.id}
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item
                                  as={Link}
                                  to={`/customer/customer-checkup/${product.id}`}
                                >
                                  مشاهده چک آپ
                                </Dropdown.Item>

                                <Dropdown.Item>ویرایش</Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                          <td>{`${product.productName}`}</td>
                          <td>{product.salePrice}</td>
                          <td>{product.sessionCount}</td>
                          <td>{product.startDate}</td>
                          <td>{product.endDate}</td>
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
