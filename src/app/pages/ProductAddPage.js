import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import DatePicker from "react-modern-calendar-datepicker";

import { addProduct } from "../utils/api/products/addProduct";

export const ProductAddPage = () => {
  const [productName, setProductName] = useState("");
  const [sessionCount, setSessionCount] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [salePrice, setSalePrice] = useState(null);

  //  {day: 1, month: 10, year: 1399}

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // TODO: SEE WHAT PROPERTIES ARE REQUIRED FROM BACKEND!

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newProduct = {
      productName: productName,

      sessionCount: sessionCount,
      startDate: new Date(startDate.year, startDate.month, startDate.day),
      endDate: new Date(endDate.year, endDate.month, endDate.day),
      salePrice: salePrice,
    };
    const { data, isSuccess } = await addProduct(newProduct);

    console.log(newProduct);
    console.log(data);
    if (isSuccess) {
      setSuccess(isSuccess);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
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
              {success && (
                <h2 style={{ color: "#4BB543" }}>
                  محصول جدید با موفقیت اضافه شد
                </h2>
              )}
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
                      />
                    </div>
                  </Form.Group>
                </div>
              </div>
              <div className="row">
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
              </div>
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
              <button className="btn btn-dark mr-2">انصراف</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
