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
import { IoMdAddCircle } from "react-icons/io";

function AddField() {
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.user.isLoading);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [homestead, setHomestead] = useState([]);

  const validationSchema = Yup.object().shape({
   
    area: Yup.string().required("The Field is required").matches(/^\d.?\d*/, 'Area must be a valid number'),
    width: Yup.string().required("The Field is required").matches(/^\d.?\d*/, 'Width must be a valid number'),
    length: Yup.string().required("The Field is required").matches(/^\d.?\d*/, 'Length must be a valid number'),
    homesteadId: Yup.string().required("The Field is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data) {
    // submit form information when the validation checks have passed
    console.log(data);
    dispatch(loading(true));
    api(user)
      .post(`/fields`, {
        ...data,
      })
      .then((response) => {
        if (response.data?._id) {
          dispatch(loading(false));
          reset();
          notifySuccess("Field Added.");
          navigate("/fields/");
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
        <IoMdAddCircle className="mx-3 edit-icon" />
        Add New Field
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
                              Field Information
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
                                    {/* <div className='col-md-12'>
																			<div className='form-group'>
																				<label>Crop Type</label>
																				<input
																					name='croptype'
																					type='text'
																					{...register('croptype')}
																					className={`form-control ${errors.croptype ? 'is-invalid' : ''
																						}`}
																				/>
																				<div className='invalid-feedback'>
																					{errors.croptype?.message}
																				</div>
																			</div>
																		</div><div className='col-md-12'>
																			<div className='form-group'>
																				<label>Price Per Ton</label>
																				<input
																					name='priceperton'
																					type='text'
																					{...register('priceperton')}
																					className={`form-control ${errors.priceperton ? 'is-invalid' : ''
																						}`}
																				/>
																				<div className='invalid-feedback'>
																					{errors.priceperton?.message}
																				</div>
																			</div>
																			<div className='form-group'>
																				<label>Cost Per Hecture</label>
																				<input
																					name='costperhectare'
																					type='text'
																					{...register('costperhectare')}
																					className={`form-control ${errors.costperhectare ? 'is-invalid' : ''
																						}`}
																				/>
																				<div className='invalid-feedback'>
																					{errors.costperhectare?.message}
																				</div>
																			</div><div className='form-group'>
																				<label>Yield Per Hectare</label>
																				<input
																					name='yieldperhectare'
																					type='text'
																					{...register('yieldperhectare')}
																					className={`form-control ${errors.yieldperhectare ? 'is-invalid' : ''
																						}`}
																				/>
																				<div className='invalid-feedback'>
																					{errors.yieldperhectare?.message}
																				</div>
																			</div>
																		</div> */}
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
                                    {/* <div className='col-md-12'>
																			<div className='form-group'>
																				<label>Gross Margin</label>
																				<input
																					name='grossmargin'
																					type='text'
																					{...register('grossmargin')}
																					className={`form-control ${errors.grossmargin ? 'is-invalid' : ''
																						}`}
																				/>
																				<div className='invalid-feedback'>
																					{errors.grossmargin?.message}
																				</div>
																			</div>
																		</div> */}
                                    {/* <div className='col-md-12'>
																			<div className='form-group'>
																				<label>Total Cost</label>
																				<input
																					name='totalcost'
																					type='text'
																					{...register('totalcost')}
																					className={`form-control ${errors.totalcost ? 'is-invalid' : ''
																						}`}
																				/>
																				<div className='invalid-feedback'>
																					{errors.totalcost?.message}
																				</div>
																			</div>
																		</div> */}
                                  </div>
                                  <div className="form-group  ">
                                    <label htmlFor="homesteadId">
                                      Homestead Owner
                                    </label>
                                    {homestead && (
                                      <select
                                        className={`form-select ${
                                          errors.homesteadId ? "is-invalid" : ""
                                        }`}
                                        {...register("homesteadId")}
                                        name="homesteadId"
                                        aria-label="user role"
                                      >
                                        <option value="" defaultValue>
                                          Select Owner
                                        </option>
                                        {homestead?.map((item) => (
                                          <option
                                            value={item._id}
                                            key={item._id}
                                          >
                                            {item.homesteadHead?.name} -{" "}
                                            {item.homesteadHead?.IDNo}
                                          </option>
                                        ))}
                                      </select>
                                    )}
                                    <div className="invalid-feedback">
                                      {errors.homesteadId?.message}
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
                                    Add Field
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

export default AddField;
