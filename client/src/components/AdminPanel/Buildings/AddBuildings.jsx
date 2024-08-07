import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { MdPersonAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { loading, logoutUser } from "../../../context/userSlice";
import Spinner from "../../Pages/Spinner";
import api from "../../../ApiInterceptor";
import { ScrollToTop } from "../../../ScrollTotop";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaBuilding } from "react-icons/fa";
import * as Yup from "yup";

function AddBuildings() {
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.user.isLoading);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [homestead, setHomestead] = useState([]);

  const validationSchema = Yup.object().shape({
    condition: Yup.string().required("The Field is required"),
    area: Yup.string().required("The Field is required").matches(/^\d.?\d*/, 'This field must be a valid number'),
    windows: Yup.string().required("The Field is required"),
    width: Yup.string().required("The Field is required").matches(/^\d.?\d*/, 'This field must be a valid number'),
    length: Yup.string().required("The Field is required").matches(/^\d.?\d*/, 'This field must be a valid number'),
    notes: Yup.string().required("The Field is required").max(150,"Text too long"),
    walls: Yup.string().required("The Field is required"),
    doors: Yup.string().required("The Field is required").matches(/^\d.?\d*/, 'This field must be a valid number'),
    floor: Yup.string().required("The Field is required"),
    incomplete: Yup.string().required("The Field is required"),
    roof: Yup.string().required("The Field is required"),
    homesteadID: Yup.string().required("The Field is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data) {
    // submit form information when the validation checks have passed
    console.log(data);
    dispatch(loading(true));
    api(user)
      .post(`/buildings`, {
        ...data,
      })
      .then((response) => {
        if (response.data?._id) {
          dispatch(loading(false));
          reset();
          notifySuccess("Building Added.");
          navigate("/buildings/");
        } else {
          notifyError("Not Added");
          dispatch(loading(false));
        }
      })
      .catch((error) => {
        notifyError(error);
        dispatch(loading(false));
      });
  }
  //Notifications function
  const notifySuccess = (name) => {
    toast.success(`${name}`, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };
  //Notifications function
  const notifyError = (name) => {
    toast.error(`${name}`, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };
  //Manage users

  //scroll to top when page loads
  const { pathname } = useLocation();
  useEffect(() => {
    ScrollToTop();
  }, [pathname]);
  //Get Homesteads
  useEffect(() => {
    //dispatch(loading(true));
    api(user)
      .get(`/homesteads/`)
      .then((res) => {
        console.log(res.data);
        setHomestead(res.data);
        //	dispatch(loading(false));
      })
      .catch((err) => {
        console.log(err);
        //	dispatch(loading(false));
      });
  }, []);
  return (
    <div>
      <h4 className="text-center my-3">
        <FaBuilding className="mx-3 edit-icon" />
        Add New Building
      </h4>
      <div>
        {isLoading && (
          // Render the loading spinner while loading is true
          <Spinner />
        )}
        <div className="container">
          <div className="row flex-lg-nowrap">
            <div className="col">
              <div className="row">
                <div className="col mb-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="e-profile">
                        <ul className="nav nav-tabs">
                          <li className="nav-item">
                            <div href="" className="active nav-link">
                              Building Information
                            </div>
                          </li>
                        </ul>
                        <div className="tab-content pt-3">
                          <div className="tab-pane active">
                            <form
                              className="form"
                              onSubmit={handleSubmit(onSubmit)}
                            >
                              <div className="row mt-2">
                                <div className="col">
                                  <div className="row">
                                    <div className="col-md-12">
                                      <div className="form-group">
                                        <label>Conditon</label>
                                        <input
                                          name="condition"
                                          type="text"
                                          {...register("condition")}
                                          className={`form-control ${
                                            errors.condition ? "is-invalid" : ""
                                          }`}
                                        />
                                        <div className="invalid-feedback">
                                          {errors.condition?.message}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-12">
                                      <div className="form-group">
                                        <label>Windows</label>
                                        <input
                                          name="windows"
                                          type="text"
                                          {...register("windows")}
                                          className={`form-control ${
                                            errors.windows ? "is-invalid" : ""
                                          }`}
                                        />
                                        <div className="invalid-feedback">
                                          {errors.windows?.message}
                                        </div>
                                      </div>
                                      <div className="form-group">
                                        <label>Walls</label>
                                        <input
                                          name="walls"
                                          type="text"
                                          {...register("walls")}
                                          className={`form-control ${
                                            errors.walls ? "is-invalid" : ""
                                          }`}
                                        />
                                        <div className="invalid-feedback">
                                          {errors.walls?.message}
                                        </div>
                                      </div>
                                      <div className="form-group">
                                        <label>Roof</label>
                                        <input
                                          name="roof"
                                          type="text"
                                          {...register("roof")}
                                          className={`form-control ${
                                            errors.roof ? "is-invalid" : ""
                                          }`}
                                        />
                                        <div className="invalid-feedback">
                                          {errors.roof?.message}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-12">
                                      <div className="form-group">
                                        <label>Floor</label>
                                        <input
                                          name="floor"
                                          type="text"
                                          {...register("floor")}
                                          className={`form-control ${
                                            errors.floor ? "is-invalid" : ""
                                          }`}
                                        />
                                        <div className="invalid-feedback">
                                          {errors.floor?.message}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-12">
                                      <div className="form-group">
                                        <label>Doors</label>
                                        <input
                                          name="doors"
                                          type="text"
                                          {...register("doors")}
                                          className={`form-control ${
                                            errors.doors ? "is-invalid" : ""
                                          }`}
                                        />
                                        <div className="invalid-feedback">
                                          {errors.doors?.message}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-12">
                                      <div className="form-group">
                                        <label>Area</label>
                                        <input
                                          name="area"
                                          type="text"
                                          {...register("area")}
                                          className={`form-control ${
                                            errors.area ? "is-invalid" : ""
                                          }`}
                                        />
                                        <div className="invalid-feedback">
                                          {errors.area?.message}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-12">
                                      <div className="form-group">
                                        <label>Width</label>
                                        <input
                                          name="width"
                                          type="text"
                                          {...register("width")}
                                          className={`form-control ${
                                            errors.width ? "is-invalid" : ""
                                          }`}
                                        />
                                        <div className="invalid-feedback">
                                          {errors.width?.message}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-12">
                                      <div className="form-group">
                                        <label>Length</label>
                                        <input
                                          name="length"
                                          type="text"
                                          {...register("length")}
                                          className={`form-control ${
                                            errors.length ? "is-invalid" : ""
                                          }`}
                                        />
                                        <div className="invalid-feedback">
                                          {errors.length?.message}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-12">
                                      <div className="form-group">
                                        <label>Notes</label>
                                        <input
                                          name="notes"
                                          type="text"
                                          {...register("notes")}
                                          className={`form-control ${
                                            errors.notes ? "is-invalid" : ""
                                          }`}
                                        />
                                        <div className="invalid-feedback">
                                          {errors.notes?.message}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="form-group  ">
                                    <label htmlFor="homesteadID">
                                      Incomplete
                                    </label>
                                    {homestead && (
                                      <select
                                        className={`form-select ${
                                          errors.incomplete ? "is-invalid" : ""
                                        }`}
                                        {...register("incomplete")}
                                        name="incomplete"
                                        aria-label="user role"
                                      >
                                        <option value={true} defaultValue>
                                          Yes
                                        </option>
                                        <option value={false}>No</option>
                                      </select>
                                    )}
                                    <div className="invalid-feedback">
                                      {errors.incomplete?.message}
                                    </div>
                                  </div>
                                  <div className="form-group  ">
                                    <label htmlFor="homesteadID">
                                      Homestead Head
                                    </label>

                                    <select
                                      className={`form-select ${
                                        errors.homesteadID ? "is-invalid" : ""
                                      }`}
                                      {...register("homesteadID")}
                                      name="homesteadID"
                                      aria-label="user role"
                                    >
                                      <option value="" defaultValue>
                                        Select Owner
                                      </option>
                                      {homestead?.map((item) => (
                                        <option value={item._id} key={item._id}>
                                          {item.homesteadHead?.name} -{" "}
                                          {item.homesteadHead?.IDNo}
                                        </option>
                                      ))}
                                    </select>

                                    <div className="invalid-feedback">
                                      {errors.homesteadID?.message}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="row mt-2">
                                <div className="col d-flex justify-content-end gap-3">
                                  <button
                                    className="btn btn-danger"
                                    onClick={() => {
                                      navigate(-1);
                                    }}
                                  >
                                    Back
                                  </button>
                                  <button
                                    className="btn btn-primary"
                                    type="submit"
                                    //onClick={addUserBtn}
                                  >
                                    Add Building
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddBuildings;
