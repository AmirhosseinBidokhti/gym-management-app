import React, { useState, useEffect } from "react";
import { ProgressBar } from "react-bootstrap";
import { Dropdown, ButtonGroup } from "react-bootstrap";

import { getSaleInvoices } from "../utils/api/saleInvoice/getSaleInvoices";
import Spinner from "../vendor/shared/Spinner";
import { Link } from "react-router-dom";
import { deleteSaleInvoice } from "../utils/api/saleInvoice/deleteSaleInvoice";
export const SaleInvoicesPage = () => {
  const [saleInvoiceList, setSaleInvoiceList] = useState([]);
  const [loading, setLoading] = useState(true);
  //console.log(customerList);

  useEffect(() => {
    const getData = async () => {
      const result = await getSaleInvoices();
      console.log(result);
      setSaleInvoiceList(result);
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
                <h4 className="card-title">لیست فاکتور های فروش</h4>

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
                      <th>تاریخ ثبت</th>
                      <th>مشتری</th>
                      <th> کالا </th>
                      <th> نحوه پرداخت </th>
                      <th> تعداد </th>
                      <th> مبلغ </th>
                      <th> تخفیف </th>

                      <th> توضیحات </th>
                    </tr>
                  </thead>
                  <tbody>
                    {saleInvoiceList.map(
                      ({
                        id,
                        invDateFa,
                        qty,
                        firstName,
                        lastName,
                        paymentTypeTitle,
                        productName,
                        reduction,
                        price,
                        memo,
                      }) => {
                        return (
                          <tr key={id}>
                            <td>
                              <Dropdown>
                                <Dropdown.Toggle
                                  variant="btn btn-outline-primary"
                                  id="dropdownMenuOutlineButton5"
                                >
                                  {id}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item
                                    onClick={async (e) => {
                                      const {
                                        isSuccess,
                                      } = await deleteSaleInvoice(id);
                                      if (isSuccess) {
                                        window.location.reload();
                                      }
                                    }}
                                  >
                                    حذف
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                            <td>{invDateFa}</td>
                            <td>{`${firstName} ${lastName}`}</td>
                            <td>{productName}</td>
                            <td>{paymentTypeTitle}</td>
                            <td>{qty}</td>
                            <td>{price}</td>
                            <td>{reduction}</td>

                            <td>{memo}</td>
                          </tr>
                        );
                      }
                    )}
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
