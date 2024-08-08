import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { BsTicketDetailedFill } from "react-icons/bs";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Chip from "@mui/material/Chip";
import { FcMediumPriority } from "react-icons/fc";
import { FcLowPriority } from "react-icons/fc";
import { FcHighPriority } from "react-icons/fc";
import { toast } from "react-toastify";
import { ScrollToTop } from "../../../ScrollTotop";
import { useDispatch, useSelector } from "react-redux";
import api from "../../../ApiInterceptor";
import Spinner from "../../Pages/Spinner";
import { loading } from "../../../context/userSlice";
import { FileIcon, defaultStyles } from "react-file-icon";
import { LuFileSearch2 } from "react-icons/lu";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { FaAngleDown, FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

function Lookup() {
  //get user from global state
  const user = useSelector((state) => state.user.user);
  const isAdmin = useSelector((state) => state.user.isAdmin);
  //get user id from url
  const homesteadId = useParams().id;
  const isLoading = useSelector((state) => state.user.isLoading);

  const [unitName, setUnitName] = useState();
  const [ntervention, setIntervention] = useState();
  const [compensation, setcompensation] = useState([]);
  const [interventionType, setinterventionType] = useState([]);
  const [unittype, setunittype] = useState([]);
  const navigate = useNavigate();
  const [homestead, setHomestead] = useState({
    id: homesteadId,
    homesteadHead: {},
    size: "",
    createdAt: "",
    southern: "",
    eastern: "",
    modifiedAt: "",
    location: "",
    relocated: "",
  });

  const [homesteads, setHomesteads] = useState([]);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const dispatch = useDispatch();
  const cancelTokenRef = useRef();

  const getcompensation = async () => {
    try {
      dispatch(loading(true)); // Set loading state to true before fetching data
      const { data } = await api(user).get(`/compensate/home/${homesteadId}`, {
        cancelToken: cancelTokenRef.current.token,
      });
      setcompensation(data);
      console.log(data);
      dispatch(loading(false));
    } catch (error) {
      console.error(error);
      //dispatch(loading(false));
    } finally {
      //dispatch(loading(false)); // Set loading state to false after fetching data
    }
  };
  useEffect(() => {
    cancelTokenRef.current = axios.CancelToken.source();
    getcompensation();
    //Clean up function
    return () => {
      cancelTokenRef.current.cancel("Component unmounted");
    };
  }, []);

  const validationSchema = Yup.object().shape({
    quantity: Yup.string()
      .required("The Field is required")
      .matches(/^\d.?\d*/, "This must be a valid number"),
    unitId: Yup.string().required("The Field is required"),
    intervantionId: Yup.string().required("The Field is required"),
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
      .post(`/compensate`, {
        ...data,
      })
      .then((response) => {
        if (response.data?._id) {
          dispatch(loading(false));
          reset();
          notifySuccess("Successfully Added.");
          getcompensation();
          handleClose();
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

  const columns = [
    {
      field: "",
      headerName: "Items provided",
      width: 200,
      renderCell: (params) => {
        let quantity = params.row.quantity;
        let type = params.row.intervantionId?.type;
        let unit = params.row.unitId?.unitName;
        if (unit.toLowerCase() === "number") {
          return ` ${quantity} ${type} `;
        } else return `${type} ${quantity} ${unit}`;
      },
    },
  ];
  const unitcolumns = [
    {
      field: "unitName",
      headerName: "Unit Name",
      width: 200,
    },
  ];
  const intevantioncolumns = [
    {
      field: "type",
      headerName: "Intervention Type",
      width: 200,
    },
  ];

  const getHomestead = async () => {
    dispatch(loading(true));
    api(user)
      .get(`/homesteads/${homesteadId}`)
      .then((res) => {
        // console.log(res);
        setHomestead({
          ...homestead,

          homesteadHead: res.data.homesteadHead,
          createdAt: res.data.createdAt,
          southern: res.data.southing,
          modifiedAt: res.data.modifiedAt,
          eastern: res.data.easting,
          location: res.data.location,
          relocated: res.data.relocated,
        });
        dispatch(loading(false));
      })
      .catch((err) => {
        console.log(err);
        dispatch(loading(false));
      });
  };

  useEffect(() => {
    getHomestead();
  }, []);

  const getIntervanton = async () => {
    dispatch(loading(true));
    api(user)
      .get(`/intervention/`)
      .then((res) => {
        // console.log(res);
        setinterventionType(res.data);
        dispatch(loading(false));
      })
      .catch((err) => {
        console.log(err);
        dispatch(loading(false));
      });
  };

  useEffect(() => {
    getIntervanton();
  }, []);
  const getUnit = async () => {
    dispatch(loading(true));
    api(user)
      .get(`/units/`)
      .then((res) => {
        // console.log(res);
        setunittype(res.data);
        dispatch(loading(false));
      })
      .catch((err) => {
        console.log(err);
        dispatch(loading(false));
      });
  };

  useEffect(() => {
    getUnit();
  }, []);

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
  //add intervention
  const addIntervantion = (e) => {
    e.preventDefault();
    dispatch(loading(true));
    api(user)
      .post(`/intervention/`, {
        type: ntervention,
      })
      .then((response) => {
        if (response.data?._id) {
          notifySuccess("Intervention added");
        } else {
          notifyError(response.data?.message);
        }
        dispatch(loading(false));
        getIntervanton();
      })
      .catch((error) => {
        notifyError("Something went wrong");
        dispatch(loading(false));
        console.log(error);
      });
  }; //add unit
  const addUnit = (e) => {
    e.preventDefault();
    dispatch(loading(true));
    api(user)
      .post(`/units/`, {
        unitName: unitName,
      })
      .then((response) => {
        if (response.data?._id) {
          notifySuccess("Unit added");
        } else {
          notifyError(response.data?.message);
        }
        dispatch(loading(false));
        getUnit();
      })
      .catch((error) => {
        notifyError("Something went wrong");
        dispatch(loading(false));
        console.log(error);
      });
  };
  //Get Homesteads
  useEffect(() => {
    //dispatch(loading(true));
    api(user)
      .get(`/homesteads/`)
      .then((res) => {
        console.log(res.data);
        setHomesteads(res.data);
        //	dispatch(loading(false));
      })
      .catch((err) => {
        console.log(err);
        //	dispatch(loading(false));
      });
  }, []);
  const { pathname } = useLocation();
  //scroll to top when page loads
  useEffect(() => {
    ScrollToTop();
  }, [pathname]);
  return (
    <div>
      <h4 className="text-center my-3">
        <BsTicketDetailedFill className="mx-3 edit-icon" />
        Manage Unit Types
      </h4>
      {isLoading && (
        // Render the loading spinner while loading is true
        <Spinner />
      )}
      <div className="container">
        <div className="row flex-lg-nowrap">
          <div className="col-md-12 col-sm-12">
            <div className="row">
              <div className="col mb-3">
                <div className="card">
                  <div className="card-body">
                    <div className="e-profile">
                      <div className="row">
                        <div className="col d-flex flex-column flex-sm-row justify-content-between mb-3">
                          <div className="text-sm-left mb-2 mb-sm-0">
                          </div>
                        </div>
                        <div className="row mt-2">
                          <div className="row">
                            <div className="row ">
                              <div className="form-group col-md-12 col-lg-5">
                                <label className="custom-control-label">
                                  Intervention Type:
                                </label>
                                <input
                                  type="text"
                                  className={`form-control `}
                                  onChange={(e) => {
                                    setIntervention(e.target.value);
                                  }}
                                />
                              </div>
                              <div className="col d-flex justify-content-end aling-items-center">
                                <button
                                  className="btn btn-primary p-2 mt-2"
                                  style={{ height: "fit-content" }}
                                  disabled={!ntervention}
                                  onClick={addIntervantion}
                                >
                                  Add
                                </button>
                              </div>
                            </div>
                            <div className="row mt-3">
                              <div className="form-group col-md-12 col-lg-5">
                                <label className="custom-control-label">
                                  Unit name:
                                </label>
                                <input
                                  type="text"
                                  className={`form-control `}
                                  onChange={(e) => {
                                    setUnitName(e.target.value);
                                  }}
                                />
                              </div>
                              <div className="col d-flex justify-content-end aling-items-center">
                                <button
                                  className="btn btn-primary p-2 mt-2"
                                  style={{ height: "fit-content" }}
                                  disabled={!unitName}
                                  onClick={addUnit}
                                >
                                  Add
                                </button>
                              </div>
                            </div>
                           </div>
                          <div className="col-md-6 mt-2">
                            <h4>Interventions</h4>
                            {interventionType?.length > 0 && (
                              <DataGrid
                                autoHeight
                                className="product-table"
                                getRowId={(row) => row._id}
                                rows={interventionType}
                                columns={intevantioncolumns}
                                initialState={{
                                  pagination: {
                                    paginationModel: {
                                      pageSize: 10,
                                    },
                                  },
                                }}
                                pageSizeOptions={[10]}
                                disableColumnSelector
                                disableDensitySelector
                              />
                            )}
                          </div>
                          <div className="col-md-6 mt-2">
                          <h4>Units</h4>
                            {unittype.length > 0 && (
                              <DataGrid
                                autoHeight
                                className="product-table"
                                getRowId={(row) => row._id}
                                rows={unittype}
                                columns={unitcolumns}
                                initialState={{
                                  pagination: {
                                    paginationModel: {
                                      pageSize: 10,
                                    },
                                  },
                                }}
                                pageSizeOptions={[10]}
                                disableColumnSelector
                                disableDensitySelector
                              />
                            )}
                          </div>
                        </div>

                        <span className="row mt-2">
                          <span className="col d-flex justify-content-end aling-items-center">
                            <button
                              className="btn btn-danger"
                              onClick={() => {
                                navigate(-1);
                              }}
                            >
                              Back
                            </button>{" "}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>New Intervention</Modal.Title>
        </Modal.Header>
        <Modal.Body className="">
          <div className="form-group">
            <div className="form-group  ">
              <label htmlFor="homesteadId">Homestead Owner</label>
              {homesteads && (
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
                  {homesteads?.map((item) => (
                    <option value={item._id} key={item._id}>
                      {item.homesteadHead?.name} - {item.homesteadHead?.IDNo}
                    </option>
                  ))}
                </select>
              )}
              <div className="invalid-feedback">
                {errors.homesteadId?.message}
              </div>
            </div>
          </div>
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="row mt-2">
              <div className="col">
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group  ">
                      <label htmlFor="homesteadId">Intervention Type</label>
                      {interventionType && (
                        <select
                          className={`form-select ${
                            errors.intervantionId ? "is-invalid" : ""
                          }`}
                          {...register("intervantionId")}
                          name="intervantionId"
                          aria-label="user role"
                        >
                          <option value="" defaultValue>
                            Select Type
                          </option>
                          {interventionType?.map((item) => (
                            <option value={item._id} key={item._id}>
                              {item.type}
                            </option>
                          ))}
                        </select>
                      )}
                      <div className="invalid-feedback">
                        {errors.intervantionId?.message}
                      </div>
                    </div>
                    <div className="form-group  ">
                      <label htmlFor="homesteadId">Unit </label>
                      {unittype && (
                        <select
                          className={`form-select ${
                            errors.unitId ? "is-invalid" : ""
                          }`}
                          {...register("unitId")}
                          name="unitId"
                          aria-label="user role"
                        >
                          <option value="" defaultValue>
                            Select Type
                          </option>
                          {unittype?.map((item) => (
                            <option value={item._id} key={item._id}>
                              {item.unitName}
                            </option>
                          ))}
                        </select>
                      )}
                      <div className="invalid-feedback">
                        {errors.unitId?.message}
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Quantity</label>
                      <input
                        name="quantity"
                        type="text"
                        {...register("quantity")}
                        className={`form-control ${
                          errors.quantity ? "is-invalid" : ""
                        }`}
                      />
                      <div className="invalid-feedback">
                        {errors.quantity?.message}
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
                    handleClose();
                  }}
                >
                  Back
                </button>
                <button className="btn btn-primary" type="submit">
                  Add Intervention
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Lookup;
