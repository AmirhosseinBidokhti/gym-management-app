import cogoToast from "cogo-toast";
import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";

import { getProduct } from "../API/products/getProduct";
import { updateProduct } from "../API/products/updateProduct";

export const ProductEditPage = ({ match }) => {
  const [productName, setProductName] = useState("");
  const [sessionCount, setSessionCount] = useState(null);
  // const [startDate, setStartDate] = useState(null);
  // const [endDate, setEndDate] = useState(null);
  const [salePrice, setSalePrice] = useState(null);
  const [productBefore, setProductBefore] = useState({});

  //  {day: 1, month: 10, year: 1399}

  const [loading, setLoading] = useState(false);
  //const [success, setSuccess] = useState(false);

  // TODO: SEE WHAT PROPERTIES ARE REQUIRED FROM BACKEND!

  const submitHandler = async (e) => {
    e = e || window.event;
    e.preventDefault();

    setLoading(true);
    const newProduct = {
      id: productBefore.id,
      product_name: productName ? productName : productBefore.product_name,

      session_count: sessionCount
        ? parseInt(sessionCount)
        : productBefore.session_count,
      // start_date: startDate
      //   ? datePickerFormater(startDate)
      //   : productBefore.start_date,
      // end_date: endDate ? datePickerFormater(endDate) : productBefore.end_date,
      sale_price: salePrice ? parseInt(salePrice) : productBefore.sale_price,
    };
    const { data, is_success } = await updateProduct(newProduct);

    console.log(newProduct);
    console.log(data);
    if (is_success) {
      cogoToast.success("با موفقیت ویرایش شد");

      setTimeout(() => {
        window.location.reload();
      }, 1400);
    } else {
      console.log("try again something was wrong");
    }

    setLoading(false);
  };
  const productID = match.params.id;

  useEffect(() => {
    async function getProductPreData() {
      setLoading(true);

      const productBefore = await getProduct(productID);
      setProductBefore(productBefore);
      setLoading(false);
    }
    getProductPreData();
  }, [productID]);

  return (
    <>
      <div className="col-12 grid-margin">
        <div className="card">
          <div className="card-body">
            <div style={{ display: "flex" }}>
              <h4 className="card-title">فرم ایجاد محصول یا سرویس</h4>

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

            <form
              className="form-sample"
              onSubmit={submitHandler}
              id="form-product"
            >
              <p className="card-description">
                {" "}
                برای ایجاد محصول، اطلاعات مربوطه را وارد کنید.{" "}
              </p>
              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="row">
                    <label className="col-sm-3 col-form-label">نام محصول</label>
                    <div className="col-sm-9">
                      <Form.Control
                        type="text"
                        onChange={(e) => setProductName(e.target.value)}
                        placeholder={productBefore.product_name}
                        defaultValue={productBefore.product_name}
                      />
                    </div>
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group className="row">
                    <label className="col-sm-3 col-form-label">قیمت فروش</label>
                    <div className="col-sm-9">
                      <Form.Control
                        type="number"
                        onChange={(e) => setSalePrice(e.target.value)}
                        placeholder={productBefore.sale_price}
                        defaultValue={productBefore.sale_price}
                      />
                    </div>
                  </Form.Group>
                </div>
              </div>
              {/* <div className="row">
                <div className="col-md-6">
                  <Form.Group className="row">
                    <label className="col-sm-3 col-form-label">
                      تاریخ شروع
                    </label>
                    <div className="col-sm-9">
                      <DatePicker
                        value={startDate}
                        onChange={setStartDate}
                        shouldHighlightWeekends
                        locale="fa"
                        defaultValue={productBefore.start_date}
                        inputPlaceholder={productBefore.start_date}
                      />
                    </div>
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group className="row">
                    <label className="col-sm-3 col-form-label">
                      تاریخ پایان
                    </label>
                    <div className="col-sm-9">
                      <DatePicker
                        value={endDate}
                        onChange={setEndDate}
                        shouldHighlightWeekends
                        locale="fa"
                        defaultValue={productBefore.end_date}
                        inputPlaceholder={productBefore.end_date}
                      />
                    </div>
                  </Form.Group>
                </div>
              </div> */}
              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="row">
                    <label className="col-sm-3 col-form-label">
                      تعداد جلسات
                    </label>
                    <div className="col-sm-9">
                      <Form.Control
                        type="number"
                        onChange={(e) => setSessionCount(e.target.value)}
                        defaultValue={productBefore.session_count}
                        inputPlaceholder={productBefore.session_count}
                      />
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
    </>
  );
};
