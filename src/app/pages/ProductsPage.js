import React, { useState, useEffect } from "react";
//import { ProgressBar } from "react-bootstrap";
import { Dropdown, ButtonGroup } from "react-bootstrap";
import { getProducts } from "../API/products/getProducts";
import Spinner from "../vendor/shared/Spinner";
//import { Link } from "react-router-dom";
import { formatMoney } from "../utils/formatMoney";

export const ProductsPage = () => {
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
              <div style={{ display: "flex" }}>
                <h4 className="card-title">لیست محصولات</h4>
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
                                <Dropdown.Item>ویرایش</Dropdown.Item>

                                <Dropdown.Item>حذف</Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                          <td>{`${product.product_name}`}</td>
                          <td>
                            {formatMoney(product.sale_price)} {`ریال`}
                          </td>
                          <td>{product.session_count}</td>
                          <td>{product.start_date}</td>
                          <td>{product.end_date}</td>
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
