import cogoToast from "cogo-toast";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
//import DatePicker from "react-modern-calendar-datepicker";

import { addProduct } from "../API/products/addProduct";
//import { datePickerFormater } from "../utils/datePickerFormater";

export const ProductAddPage = () => {
  const [productName, setProductName] = useState("");
  const [sessionCount, setSessionCount] = useState(null);
  // const [startDate, setStartDate] = useState(null);
  // const [endDate, setEndDate] = useState(null);
  const [salePrice, setSalePrice] = useState(null);

  //  {day: 1, month: 10, year: 1399}

  const [loading, setLoading] = useState(false);

  // TODO: SEE WHAT PROPERTIES ARE REQUIRED FROM BACKEND!

  const submitHandler = async (e) => {
    e = e || window.event;
    e.preventDefault();

    setLoading(true);
    const newProduct = {
      product_name: productName,

      session_count: sessionCount,
      // start_date: datePickerFormater(startDate),
      // end_date: datePickerFormater(endDate),
      sale_price: salePrice,
    };
    const { data, is_success } = await addProduct(newProduct);

    console.log(newProduct);
    console.log(data);
    if (is_success) {
      cogoToast.success("محصول جدید با موفقیت اضافه شد");

      setTimeout(() => {
        window.location.reload();
      }, 1320);
    } else {
      console.log("try again something was wrong");
    }

    setLoading(false);
  };

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
                    <label className="col-sm-3 col-form-label required-input">
                      نام محصول
                    </label>
                    <div className="col-sm-9">
                      <Form.Control
                        type="text"
                        onChange={(e) => setProductName(e.target.value)}
                        required
                      />
                    </div>
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group className="row">
                    <label className="col-sm-3 col-form-label required-input">
                      قیمت فروش
                    </label>
                    <div className="col-sm-9">
                      <Form.Control
                        type="number"
                        onChange={(e) => setSalePrice(e.target.value)}
                        required
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
                      />
                    </div>
                  </Form.Group>
                </div>
              </div> */}
              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="row">
                    <label className="col-sm-3 col-form-label required-input">
                      تعداد جلسات
                    </label>
                    <div className="col-sm-9">
                      <Form.Control
                        type="number"
                        onChange={(e) => setSessionCount(e.target.value)}
                        required
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
