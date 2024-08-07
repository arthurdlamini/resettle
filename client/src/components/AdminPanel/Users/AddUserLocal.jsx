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
function AddUserLocal() {
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.user.isLoading);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [roles, setRoles] = useState();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .max(100, "Full name excedd 100 charecters")
      .min(3, "Name too short"),
    roleid: Yup.string().required("role is required"),
    email: Yup.string().email()
      .required("Email  is required"),
      //.matches(/^\d+$/, "ID must be a valid number")
      
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data) {
    // submit form information when the validation checks have passed
    console.log(data);
    dispatch(loading(true));
    api(user)
      .post(`/users`, {
        ...data,
      })
      .then((response) => {
        console.log(response)
        if (response.data?.success) {
          dispatch(loading(false));
          reset();
          notifySuccess("User Account Created");
          navigate("/users/");
        } else {
          notifyError(response.data?.data);
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
  //get user roles
  const getRoles = async () => {
    dispatch(loading(true));
    api(user)
      .get(`/roles`)
      .then((res) => {
        console.log(res);
        setRoles(res.data);
        dispatch(loading(false));
      })
      .catch((err) => {
        console.log(err);
        dispatch(loading(false));
      });
  };
  useEffect(() => {
    getRoles();
  }, []);
  return (
    <div>
      <h4 className="text-center my-3">
        <RiFolderAddFill className="mx-3 edit-icon" />
        Add New User
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
                              User Information
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
                                        <label>Email address</label>
                                        <input
                                          name="email"
                                          type="text"
                                          {...register("email")}
                                          className={`form-control ${
                                            errors.email ? "is-invalid" : ""
                                          }`}
                                        />
                                        <div className="invalid-feedback">
                                          {errors.email?.message}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row mt-2">
                                    <div className="form-group  ">
                                      <label htmlFor="roleid">Role</label>
                                      {roles && (
                                        <select
                                          className={`form-select ${
                                            errors.roleid ? "is-invalid" : ""
                                          }`}
                                          {...register("roleid")}
                                          name="roleid"
                                          aria-label="user role"
                                        >
                                          <option value="" defaultValue>
                                            Select Role
                                          </option>
                                          {roles?.map((item) => (
                                            <option
                                              value={item._id}
                                              key={item._id}
                                            >
                                              {item.role}
                                            </option>
                                          ))}
                                        </select>
                                      )}
                                      <div className="invalid-feedback">
                                        {errors.roleid?.message}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <p className="mt-3 text-success">
                                The user will be able to access the system once
                                he reset his password
                              </p>
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
                                    Add User
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

export default AddUserLocal;
