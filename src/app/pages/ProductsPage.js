import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { getProducts } from "../API/products/getProducts";
import Spinner from "../vendor/shared/Spinner";
//import { Link } from "react-router-dom";
import { formatMoney } from "../utils/formatMoney";
import { Link } from "react-router-dom";
import { deleteProduct } from "../API/products/deleteProduct";
import cogoToast from "cogo-toast";

export const ProductsPage = () => {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productID, setProductID] = useState(null);
  //console.log(customerList);

  useEffect(() => {
    const getData = async () => {
      const result = await getProducts();
      console.log(result);
      setProductList(result);
      setLoading(false);
    };
    getData();
  }, []);

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
                      {/* <th> تاریخ شروع </th>
                      <th> تاریخ پایان </th> */}
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
                                  to={`/product/edit-product/${product.id}`}
                                >
                                  ویرایش
                                </Dropdown.Item>

                                <Dropdown.Item
                                  data-toggle="modal"
                                  data-target="#product-del"
                                  onClick={() => setProductID(product.id)}
                                >
                                  حذف
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                          <td>{`${product.product_name}`}</td>
                          <td>
                            {formatMoney(product.sale_price)} {`ریال`}
                          </td>
                          <td>{product.session_count}</td>
                          {/* <td>{product.start_date}</td>
                          <td>{product.end_date}</td> */}
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
      <div
        className="modal fade"
        id="product-del"
        role="dialog"
        aria-labelledby="product-del"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
              آیا از انجام عملیات مطمئن می باشید؟
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={async (e) => {
                  const {
                    is_success,
                    //dev_message,
                  } = await deleteProduct(productID);
                  if (is_success) {
                    cogoToast.success("با موفقیت حذف شد");
                    setTimeout(() => {
                      window.location.reload();
                    }, 300);
                  } else {
                    cogoToast.info(
                      "امکان حذف کالایی که فاکتور شده است وجود ندارد"
                    );
                  }
                }}
              >
                ثبت
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                انصراف
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
