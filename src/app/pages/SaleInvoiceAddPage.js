import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import DatePicker from "react-modern-calendar-datepicker";
import cogoToast from "cogo-toast";

import { addProduct } from "../API/products/addProduct";
import { getCustomers } from "../API/customer/getCustomers";
import { getProducts } from "../API/products/getProducts";
import { getProduct } from "../API/products/getProduct";
import { getSaleInvoiceTypes } from "../API/saleInvoice/getSaleInvoiceTypes";
import { addSaleInvoice } from "../API/saleInvoice/addSaleInvoice";

import { saleInvoice } from "../API/types/saleInvoice";

export const SaleInvoiceAddPage = () => {
  const [customerList, setCustomerList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [productName, setProductName] = useState("");
  const [productID, setProductID] = useState("");
  const [accountID, setAccountID] = useState(null);

  const [reduction_Price, setReduction_Price] = useState(null);
  const [memo, setMemo] = useState(null);
  const [qty, setQty] = useState(null);
  const [productPrice, setProductPrice] = useState(null);
  const [productQty, setProductQty] = useState(null);
  const [saleInvoiceTypes, setSaleInvoiceTypes] = useState([]);
  const [saleInvoiceTypeID, setSaleInvoiceTypeID] = useState(null);

  //  {day: 1, month: 10, year: 1399}

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // TODO: SEE WHAT PROPERTIES ARE REQUIRED FROM BACKEND!

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newSaleInvoice = {
      accountID: accountID,
      invType: 1,
      memo: memo,
      saleInvoiceDetails: [
        {
          productID: productID,
          productName: productName,
          qty: qty,
          price: productPrice,
          reduction_Price: reduction_Price,
          sessionQty: productQty,
        },
      ],
      saleInvoicePayments: [
        {
          saleInvoicePaymentTypeId: saleInvoiceTypeID,
          price: (productPrice - reduction_Price) * qty,
        },
      ],
    };
    const { data, isSuccess } = await addSaleInvoice(
      saleInvoice(
        accountID,
        memo,
        productID,
        productName,
        qty,
        productPrice,
        reduction_Price,
        productQty,
        saleInvoiceTypeID
      )
    );

    console.log(data);
    console.log(newSaleInvoice);
    if (isSuccess) {
      setSuccess(isSuccess);
      cogoToast.info("فاکتور فروش جدید با موفقیت ثبت شد", {
        position: "top-center",
        heading: "Information",
      });
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } else {
      alert("try again something was wrong");
    }
    setLoading(false);
  };

  useEffect(() => {
    async function getData() {
      const customers = await getCustomers();
      setCustomerList(customers);
      const result = await getProducts();
      console.log(result);
      setProductList(result);

      const saleInvoiceType = await getSaleInvoiceTypes();

      setSaleInvoiceTypes(saleInvoiceType);
    }
    getData();
  }, []);

  return (
    <>
      <div className="col-12 grid-margin">
        <div className="card">
          <div className="card-body">
            <div style={{ display: "flex" }}>
              <h4 className="card-title">فرم فاکتور فروش </h4>
              {success && (
                <h2 style={{ color: "#4BB543", display: "block" }}>
                  فاکتور فروش جدید با موفقیت ثبت شد
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
                برای ایجاد فاکتور فروش، اطلاعات مربوطه را وارد کنید.{" "}
              </p>
              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="row">
                    <label className="col-sm-3 col-form-label">نام مشتری</label>
                    <div className="col-sm-9">
                      <select
                        className="form-control"
                        onChange={(e) => setAccountID(e.target.value)}
                      >
                        <option selected disabled>
                          انتخاب کنید
                        </option>
                        {customerList.map((el) => (
                          <option key={el.id} value={el.id}>
                            {`${el.firstName} ${el.lastName}`}
                          </option>
                        ))}
                      </select>
                    </div>
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group className="row">
                    <label className="col-sm-3 col-form-label">نام محصول</label>
                    <div className="col-sm-9">
                      <select
                        className="form-control"
                        onChange={async (e) => {
                          setProductID(e.target.value);
                          const product = await getProduct(e.target.value);
                          setProductQty(product.sessionCount);
                          setProductName(product.productName);
                          setProductPrice(product.salePrice);
                        }}
                      >
                        <option selected disabled>
                          انتخاب کنید
                        </option>
                        {productList.map((el) => (
                          <option key={el.id} value={el.id}>
                            {` ${el.productName}  (قیمت: ${el.salePrice}) (تعداد جلسه: ${el.sessionCount})`}
                          </option>
                        ))}
                      </select>
                    </div>
                  </Form.Group>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="row">
                    <label className="col-sm-3 col-form-label">تعداد</label>
                    <div className="col-sm-9">
                      <Form.Control
                        type="number"
                        onChange={(e) => {
                          setQty(e.target.value);
                        }}
                      />
                    </div>
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group className="row">
                    <label className="col-sm-3 col-form-label">
                      نوع پرداخت
                    </label>
                    <div className="col-sm-9">
                      <select
                        className="form-control"
                        onChange={(e) => setSaleInvoiceTypeID(e.target.value)}
                      >
                        <option selected disabled>
                          انتخاب کنید
                        </option>
                        {saleInvoiceTypes.map((el) => (
                          <option key={el.id} value={el.id}>
                            {el.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </Form.Group>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="row">
                    <label className="col-sm-3 col-form-label">تخفیف</label>
                    <div className="col-sm-9">
                      <Form.Control
                        type="number"
                        onChange={(e) => {
                          setReduction_Price(e.target.value);
                        }}
                      />
                    </div>
                  </Form.Group>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="row">
                    <label
                      className="col-sm-3 col-form-label"
                      htmlFor="exampleTextarea1"
                    >
                      توضیحات
                    </label>
                    <div className="col-sm-9">
                      <textarea
                        className="form-control"
                        id="exampleTextarea1"
                        rows="4"
                        onChange={(e) => setMemo(e.target.value)}
                      ></textarea>
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
              <button type="reset" className="btn btn-dark mr-2">
                انصراف
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
