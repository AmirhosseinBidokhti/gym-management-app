import React, { useState, useEffect, useRef } from "react";
import { ProgressBar, Dropdown } from "react-bootstrap";
import { GetCustomerCheckup } from "../API/customer/getCustomerCheckup";
import { addCustomerCheckup } from "../API/customer/addCustomerCheckup";
import { deleteCustomerCheckup } from "../API/customer/deleteCustomerCheckup";

import ReactToPrint from "react-to-print";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Form } from "react-bootstrap";
import Spinner from "../vendor/shared/Spinner";
import { printTable } from "../utils/printTable";

export const CustomerCheckupPage = ({ history, match }) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [weight, setWeight] = useState(null);
  const [chest, setChest] = useState(null);
  const [abs, setAbs] = useState(null);
  const [waistSize, setWaistSize] = useState(null);
  const [butt, setButt] = useState(null);
  const [rightArm, setRightArm] = useState(null);
  const [leftArm, setLeftArm] = useState(null);
  const [rightTigh, setRightTigh] = useState(null);
  const [leftTigh, setLeftTigh] = useState(null);
  const [rightCalves, setRightCalves] = useState(null);
  const [leftCalves, setLeftCalves] = useState(null);
  const [sessionNo, setSessionNo] = useState(null);

  const [loading, setLoading] = useState(true);

  const [latestCheckup, setLatestCheckup] = useState({});

  const getLatestCheckup = () => {
    return customerCheckupList.pop();
  };

  //TODO: make a callback ... for setStuffs
  // const onChangeHandler = (callback, value) => {
  //   callback()
  // }

  // match.params.id to get the id. then based on the id we call the api.
  //TODO: figure out a way to display her/his name too.
  const customerID = match.params.id;
  //console.log("customer id=" + " " + customerID);
  const [customerCheckupList, setCustomerCheckupList] = useState([]);

  const sumbitHandler = async (e) => {
    e.preventDefault();
    const checkupObj = {
      accountID: customerID,
      weight: weight,
      waistSize: waistSize,
      chest: chest,
      abs: abs,
      butt: butt,
      rightArm: rightArm,
      leftArm: leftArm,
      rightThigh: rightTigh,
      leftThigh: leftTigh,
      rightCalves: rightCalves,
      leftCalves: leftCalves,
      sessionNo: sessionNo,
    };
    const { is_success } = await addCustomerCheckup(checkupObj);
    if (is_success) {
      console.log(is_success); //works
      window.location.reload();
    }
  };

  useEffect(() => {
    const getData = async () => {
      const result = await GetCustomerCheckup(customerID);
      console.log(result);
      setCustomerCheckupList(result);
      if (result.length !== 0) {
        setLatestCheckup(result[result.length - 1]);
      }

      setLoading(false);
    };
    getData();
  }, [customerID, match]);

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
                <h4 className="card-title">پروفایل چکاپ مشتری</h4>

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
              <div className="table-responsive table-bordered">
                <table className="table table-bordered" id="tab">
                  <thead style={{ color: "white" }}>
                    <tr>
                      <th>شماره جلسه</th>
                      <th>تاریخ</th>
                      <th> وزن </th>
                      <th> دور سینه </th>
                      <th> شکم </th>
                      <th> کمر </th>
                      <th> باسن </th>
                      <th> بازو راست </th>
                      <th> بازو چپ </th>
                      <th> ران راست </th>
                      <th> ران چپ </th>
                      <th> ساق پا راست </th>
                      <th> ساق پا چپ </th>
                    </tr>
                  </thead>
                  <tbody>
                    {customerCheckupList.map(
                      ({
                        id,
                        create_date,
                        weight,
                        chest,
                        abs,
                        waist_size,
                        butt,
                        right_arm,
                        left_arm,
                        right_thigh,
                        left_thigh,
                        right_calves,
                        left_calves,
                        session_no,
                      }) => {
                        return (
                          <tr>
                            <td>
                              <Dropdown>
                                <Dropdown.Toggle
                                  variant="btn btn-outline-primary"
                                  id="dropdownMenuOutlineButton5"
                                >
                                  {session_no}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item
                                    onClick={async (e) => {
                                      const {
                                        is_success,
                                      } = await deleteCustomerCheckup(id);
                                      if (is_success) {
                                        window.location.reload();
                                      }
                                    }}
                                  >
                                    حذف
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>

                            <td>{create_date}</td>
                            <td>{weight}</td>
                            <td>{chest}</td>
                            <td>{abs}</td>
                            <td>{waist_size}</td>
                            <td>{butt}</td>
                            <td>{right_arm}</td>
                            <td>{left_arm}</td>
                            <td>{right_thigh}</td>
                            <td>{left_thigh}</td>
                            <td>{right_calves}</td>
                            <td>{left_calves}</td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <button onClick={toggle} className="btn btn-primary mr--3">
                  ثبت اطلاعات جدید
                </button>
                <button
                  onClick={(e) => {
                    printTable();
                  }}
                  type="button"
                  className="btn btn-info btn-icon-text"
                  style={{ height: "40%" }}
                >
                  Print
                  <i className="mdi mdi-printer btn-icon-append"></i>
                </button>
              </div>
              <Modal
                isOpen={modal}
                toggle={toggle}
                size="lg"
                style={{ maxWidth: "87%" }}
              >
                <ModalBody>
                  <div className="row">
                    {" "}
                    <div className="col-md-6 grid-margin stretch-card">
                      <div className="card">
                        <div className="card-body">
                          <h4 className="card-title">
                            {" "}
                            اندازه گیری های انجام شده را وارد کنید.
                          </h4>

                          <form
                            className="forms-sample"
                            onSubmit={sumbitHandler}
                            id="checkup-from"
                          >
                            <div className="row">
                              <div className="col-md-6">
                                <Form.Group>
                                  <label htmlFor="exampleInputName1">
                                    شماره جلسه
                                  </label>
                                  <Form.Control
                                    type="number"
                                    className="form-control"
                                    id="exampleInputName1"
                                    placeholder="شماره جلسه"
                                    onChange={(e) =>
                                      setSessionNo(e.target.value)
                                    }
                                  />
                                </Form.Group>
                                <Form.Group>
                                  <label htmlFor="exampleInputName1">وزن</label>
                                  <Form.Control
                                    type="number"
                                    className="form-control"
                                    id="exampleInputName1"
                                    placeholder="وزن"
                                    onChange={(e) => setWeight(e.target.value)}
                                  />
                                </Form.Group>

                                <Form.Group>
                                  <label htmlFor="exampleInputName1">
                                    دور سینه
                                  </label>
                                  <Form.Control
                                    type="number"
                                    className="form-control"
                                    id="exampleInputName1"
                                    placeholder="دور سینه"
                                    onChange={(e) => setChest(e.target.value)}
                                  />
                                </Form.Group>
                                <Form.Group>
                                  <label htmlFor="exampleInputName1">شکم</label>
                                  <Form.Control
                                    type="number"
                                    className="form-control"
                                    id="exampleInputName1"
                                    placeholder="شکم"
                                    onChange={(e) => setAbs(e.target.value)}
                                  />
                                </Form.Group>

                                <Form.Group>
                                  <label htmlFor="exampleInputName1">کمر</label>
                                  <Form.Control
                                    type="number"
                                    className="form-control"
                                    id="exampleInputName1"
                                    placeholder="کمر"
                                    onChange={(e) =>
                                      setWaistSize(e.target.value)
                                    }
                                  />
                                </Form.Group>
                                <Form.Group>
                                  <label htmlFor="exampleInputName1">
                                    باسن
                                  </label>
                                  <Form.Control
                                    type="number"
                                    className="form-control"
                                    id="exampleInputName1"
                                    placeholder="باسن"
                                    onChange={(e) => setButt(e.target.value)}
                                  />
                                </Form.Group>
                              </div>
                              <div className="col-md-6">
                                <Form.Group>
                                  <label htmlFor="exampleInputName1">
                                    بازو راست
                                  </label>
                                  <Form.Control
                                    type="number"
                                    className="form-control"
                                    id="exampleInputName1"
                                    placeholder="بازو راست"
                                    onChange={(e) =>
                                      setRightArm(e.target.value)
                                    }
                                  />
                                </Form.Group>
                                <Form.Group>
                                  <label htmlFor="exampleInputName1">
                                    بازو چپ
                                  </label>
                                  <Form.Control
                                    type="number"
                                    className="form-control"
                                    id="exampleInputName1"
                                    placeholder="بازو چپ"
                                    onChange={(e) => setLeftArm(e.target.value)}
                                  />
                                </Form.Group>
                                <Form.Group>
                                  <label htmlFor="exampleInputName1">
                                    ران راست
                                  </label>
                                  <Form.Control
                                    type="number"
                                    className="form-control"
                                    id="exampleInputName1"
                                    placeholder="ران راست"
                                    onChange={(e) =>
                                      setRightTigh(e.target.value)
                                    }
                                  />
                                </Form.Group>
                                <Form.Group>
                                  <label htmlFor="exampleInputName1">
                                    ران چپ
                                  </label>
                                  <Form.Control
                                    type="number"
                                    className="form-control"
                                    id="exampleInputName1"
                                    placeholder="ران چپ"
                                    onChange={(e) =>
                                      setLeftTigh(e.target.value)
                                    }
                                  />
                                </Form.Group>
                                <Form.Group>
                                  <label htmlFor="exampleInputName1">
                                    ساق پا راست
                                  </label>
                                  <Form.Control
                                    type="number"
                                    className="form-control"
                                    id="exampleInputName1"
                                    placeholder="ساق پا راست"
                                    onChange={(e) =>
                                      setRightCalves(e.target.value)
                                    }
                                  />
                                </Form.Group>
                                <Form.Group>
                                  <label htmlFor="exampleInputName1">
                                    ساق پا چپ
                                  </label>
                                  <Form.Control
                                    type="number"
                                    className="form-control"
                                    id="exampleInputName1"
                                    placeholder="ساق پا چپ"
                                    onChange={(e) =>
                                      setLeftCalves(e.target.value)
                                    }
                                  />
                                </Form.Group>
                              </div>
                            </div>
                          </form>
                          <button
                            className="btn btn-primary mr-2 px-3"
                            type="submit"
                            form="checkup-from"
                          >
                            ثبت
                          </button>
                          <button
                            className="btn btn-dark mr-1"
                            onClick={toggle}
                          >
                            انصراف
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 grid-margin stretch-card">
                      <div className="card">
                        <div className="card-body d-flex">
                          <div className="col-md-3">
                            <h5 className="card-title"> آخرین چک آپ</h5>

                            <ul>
                              <li>وزن: {latestCheckup.weight}</li>
                              <li>دوره سینه: {latestCheckup.chest}</li>
                              <li>شکم: {latestCheckup.abs}</li>
                              <li>کمر: {latestCheckup.waist_size}</li>
                              <li>باسن: {latestCheckup.butt}</li>
                              <li>بازو راست: {latestCheckup.right_arm}</li>
                              <li>بازو چپ: {latestCheckup.left_arm}</li>
                              <li>ران راست: {latestCheckup.right_thigh}</li>
                              <li>ران چپ: {latestCheckup.left_thigh}</li>
                              <li>ساق پا راست: {latestCheckup.right_calves}</li>
                              <li>ساق پای چپ: {latestCheckup.left_calves}</li>
                            </ul>
                          </div>
                          <div className="col-md-3">
                            <h4 className="card-title">تغییرات</h4>
                            <ul>
                              <li
                                className={
                                  weight - latestCheckup.weight > 0
                                    ? "green"
                                    : "red"
                                }
                              >
                                وزن:{" "}
                                {weight ? weight - latestCheckup.weight : 0}
                              </li>
                              <li
                                className={
                                  chest - latestCheckup.chest > 0
                                    ? "green"
                                    : "red"
                                }
                              >
                                دوره سینه:{" "}
                                {chest ? chest - latestCheckup.chest : 0}
                              </li>
                              <li
                                className={
                                  abs - latestCheckup.abs > 0 ? "green" : "red"
                                }
                              >
                                شکم: {abs ? abs - latestCheckup.abs : 0}
                              </li>
                              <li
                                className={
                                  waistSize - latestCheckup.waist_size > 0
                                    ? "green"
                                    : "red"
                                }
                              >
                                کمر:{" "}
                                {waistSize
                                  ? waistSize - latestCheckup.waist_size
                                  : 0}
                              </li>
                              <li
                                className={
                                  butt - latestCheckup.butt > 0
                                    ? "green"
                                    : "red"
                                }
                              >
                                باسن: {butt ? butt - latestCheckup.butt : 0}
                              </li>
                              <li
                                className={
                                  rightArm - latestCheckup.right_arm > 0
                                    ? "green"
                                    : "red"
                                }
                              >
                                بازو راست:{" "}
                                {rightArm
                                  ? rightArm - latestCheckup.right_arm
                                  : 0}
                              </li>
                              <li
                                className={
                                  leftArm - latestCheckup.left_arm > 0
                                    ? "green"
                                    : "red"
                                }
                              >
                                بازو چپ:{" "}
                                {leftArm ? leftArm - latestCheckup.left_arm : 0}
                              </li>
                              <li
                                className={
                                  rightTigh - latestCheckup.right_thigh > 0
                                    ? "green"
                                    : "red"
                                }
                              >
                                ران راست:{" "}
                                {rightTigh
                                  ? rightTigh - latestCheckup.right_thigh
                                  : 0}
                              </li>
                              <li
                                className={
                                  leftTigh - latestCheckup.left_thigh > 0
                                    ? "green"
                                    : "red"
                                }
                              >
                                ران چپ:{" "}
                                {leftTigh
                                  ? leftTigh - latestCheckup.left_thigh
                                  : 0}
                              </li>
                              <li
                                className={
                                  rightCalves - latestCheckup.right_calves > 0
                                    ? "green"
                                    : "red"
                                }
                              >
                                ساق پا راست:{" "}
                                {rightCalves
                                  ? rightCalves - latestCheckup.right_calves
                                  : 0}
                              </li>
                              <li
                                className={
                                  leftCalves - latestCheckup.left_calves > 0
                                    ? "green"
                                    : "red"
                                }
                              >
                                ساق پای چپ:{" "}
                                {leftCalves
                                  ? leftCalves - latestCheckup.left_calves
                                  : 0}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ModalBody>
              </Modal>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
