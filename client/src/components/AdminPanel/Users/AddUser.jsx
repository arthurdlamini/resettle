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
import * as Yup from "yup";
import { RiFolderAddFill } from "react-icons/ri";

function AddUser() {
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.user.isLoading);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required").max(100,"Full name excedd 100 charecters").min(3,"Name too short").matches(/^[A-Za-z]/, 'Invalid Name'),
    IDNo: Yup.string()
      .required("ID No is required")
      .matches(/^\d+$/, "ID must be a valid number")
      .min(5, "Minimum length should be 5")
      .max(13, "ID should not exceed 13 numbers"),
	  phone: Yup.string()
	  .required('Phone No is required') //the field is required
	  .matches(/^\d+$/, 'Phone must be a valid number')// if your want a number
	  .min(8,"Minimum") //minium charecters
	  .max(12,"Maxii"),//maximum charecters
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data) {
    // submit form information when the validation checks have passed
    console.log(data);
    dispatch(loading(true));
    api(user)
      .post(`/person`, {
        ...data,
      })
      .then((response) => {
        if (response.data?._id) {
          dispatch(loading(false));
          reset();
          notifySuccess("Home Owner Created");
          navigate("/person/");
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

  return (
    <div>
      <h4 className="text-center my-3">
        <RiFolderAddFill className="mx-3 edit-icon" />
        Add New Home Owner
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
                              Home Owner Information
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
                                        <label>Full Name</label>
                                        <input
                                          name="fullname"
                                          type="text"
                                          {...register("name")}
                                          className={`form-control ${
                                            errors.name ? "is-invalid" : ""
                                          }`}
                                        />
                                        <div className="invalid-feedback">
                                          {errors.name?.message}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-12">
                                      <div className="form-group">
                                        <label>ID No</label>
                                        <input
                                          name="IDNo"
                                          type="text"
                                          {...register("IDNo")}
                                          className={`form-control ${
                                            errors.IDNo ? "is-invalid" : ""
                                          }`}
                                        />
                                        <div className="invalid-feedback">
                                          {errors.IDNo?.message}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row mt-2">
                                    <div className="col-md-12">
                                      <div className="form-group">
                                        <label>Phone No</label>
                                        <input
                                          name="phone"
                                          type="text"
                                          {...register("phone")}
                                          className={`form-control ${
                                            errors.phone ? "is-invalid" : ""
                                          }`}
                                        />
                                        <div className="invalid-feedback">
                                          {errors.phone?.message}
                                        </div>
                                      </div>
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
                                    Add Home Owner
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

export default AddUser;
