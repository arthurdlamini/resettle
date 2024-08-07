import React, { useEffect, useState } from "react";
import { BsArrow90DegDown, BsTicketDetailedFill } from "react-icons/bs";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { ScrollToTop } from "../../../ScrollTotop";
import { useDispatch, useSelector } from "react-redux";
import api from "../../../ApiInterceptor";
import Spinner from "../../Pages/Spinner";
import { loading } from "../../../context/userSlice";
import { FileIcon, defaultStyles } from "react-file-icon";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { FaAngleDown } from "react-icons/fa";
import { FaSync } from "react-icons/fa";
function ViwUserLocal() {
  //get user from global state
  const user = useSelector((state) => state.user.user);
  const isAdmin = useSelector((state) => state.user.isAdmin);
  //get user id from url
  const userId = useParams().id;
  const isLoading = useSelector((state) => state.user.isLoading);

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [isEnabled, setEnable] = useState(true);
  const [isActive, setisActive] = useState(true);
  const [roles, setRoles] = useState();
  const [roleid,setRolesId]=useState()
  const navigate = useNavigate();
  const [founduser, setUser] = useState({
    id: userId,
    createdAt: "",
    email: "",
    name: "",
    isActive: "",
    isEnabled: "",
    role: "",
  });
  const dispatch = useDispatch();

  const getUser = async () => {
    dispatch(loading(true));
    api(user)
      .get(`/users/${userId}`)
      .then((res) => {
        console.log(res);
        setUser({
          ...res.data,
        });
        dispatch(loading(false));
      })
      .catch((err) => {
        console.log(err);
        dispatch(loading(false));
      });
  };
  useEffect(() => {
    getUser();
  }, []);
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

  //update name
  const updateName = (e) => {
    e.preventDefault();
    dispatch(loading(true));
    api(user)
      .put(`/users/${userId}`, {
        name: name,

      })
      .then((response) => {
        console.log(response);
        if (response.data.modifiedCount > 0) {
          notifySuccess("Name Updated");
          getUser();
          console.log(response);
        } else {
          notifyError(response.data);
        }
        dispatch(loading(false));
      })
      .catch((error) => {
        notifyError(error.response.data);
        dispatch(loading(false));
        console.log(error);
      });
  }; 
  //update active
  const updateActiveStatus = (e) => {
    e.preventDefault();
    dispatch(loading(true));
    api(user)
      .put(`/users/${userId}`, {
        isActive

      })
      .then((response) => {
        console.log(response);
        if (response.data.modifiedCount > 0) {
          notifySuccess("User Status Updated");
          getUser();
          console.log(response);
        } else {
          notifyError(response.data);
        }
        dispatch(loading(false));
      })
      .catch((error) => {
        notifyError(error.response.data);
        dispatch(loading(false));
        console.log(error);
      });
  }; 
  //update role
  const updateRole= (e) => {
    e.preventDefault();
    dispatch(loading(true));
    api(user)
      .put(`/users/${userId}`, {
        role:roleid

      })
      .then((response) => {
        console.log(response);
        if (response.data.modifiedCount > 0) {
          notifySuccess("User Role Updated");
          getUser();
          console.log(response);
        } else {
          notifyError(response.data);
        }
        dispatch(loading(false));
      })
      .catch((error) => {
        notifyError(error.response.data);
        dispatch(loading(false));
        console.log(error);
      });
  };
  //update enabled status
  const updateenabledStatus= (e) => {
    e.preventDefault();
    dispatch(loading(true));
    api(user)
      .put(`/users/${userId}`, {
        isEnabled

      })
      .then((response) => {
        console.log(response);
        if (response.data.modifiedCount > 0) {
          notifySuccess("Enabled Updated");
          getUser();
          console.log(response);
        } else {
          notifyError(response.data);
        }
        dispatch(loading(false));
      })
      .catch((error) => {
        notifyError(error.response.data);
        dispatch(loading(false));
        console.log(error);
      });
  };
  //update email
  const updatEmail = (e) => {
    e.preventDefault();
    dispatch(loading(true));
    api(user)
      .put(`/users/${userId}`, {
       email
      })
      .then((response) => {
        console.log(response);
        if (response.data.modifiedCount > 0) {
          notifySuccess("User email Updated");
          getUser();
          console.log(response);
        } else {
          notifyError(response.data);
        }
        dispatch(loading(false));
      })
      .catch((error) => {
        notifyError(error.response.data);
        dispatch(loading(false));
        console.log(error);
      });
  };

  const { pathname } = useLocation();
  //scroll to top when page loads
  useEffect(() => {
    ScrollToTop();
  }, [pathname]);

  return (
    <div>
      <h4 className="text-center my-3">
        <BsTicketDetailedFill className="mx-3 edit-icon" />
        View User Details
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
                            <h4 className="pt-sm-2 pb-1 mb-0 text-nowrap">
                              User Details
                            </h4>
                            <p className="mb-0 custom-control-label">
                              Full Name:{" "}
                              <span className="text-success">
                                {founduser.name}
                              </span>
                            </p>
                            <p className="mb-0 custom-control-label">
                              Email:{" "}
                              <span className="text-success">
                                {founduser.email}
                              </span>
                            </p>
                            <p className="mb-0 custom-control-label">
                              Enabled:{" "}
                              {founduser.isEnabled === true && (
                                <span className="text-success">Yes</span>
                              )}
                              {founduser.isEnabled === false && (
                                <span className="text-success">No</span>
                              )}
                            </p>
                            <p className="mb-0 custom-control-label">
                              Active Status:{" "}
                              {founduser.isActive === true && (
                                <span className="text-success">Yes</span>
                              )}
                              {founduser.isActive === false && (
                                <span className="text-success">No</span>
                              )}
                            </p>
                            <p className="mb-0 custom-control-label">
                              Role:{" "}
                              <span className="text-success">
                                {founduser.role?.role}
                              </span>
                            </p>
                            <p className="mb-0 custom-control-label">
                              Date Added:{" "}
                              <span className="text-success">
                                {new Date(founduser.createdAt).toLocaleString()}
                              </span>
                            </p>
                            <p className="mb-0 custom-control-label">
                              Last Modified:{" "}
                              <span className="text-success">
                                {new Date(founduser.updatedAt).toLocaleString()}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div>
                          <Accordion>
                            <AccordionSummary
                              expandIcon={<FaAngleDown />}
                              aria-controls="panel1-content"
                              id="panel1-header"
                            >
                              <Typography>Edit User Details</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <form className="form">
                                <div className="row ">
                                  <div className="form-group col-md-12 col-lg-5">
                                    <label className="custom-control-label">
                                      Full Name:
                                    </label>
                                    <input
                                      type="text"
                                      className={`form-control `}
                                      onChange={(e) => {
                                        setName(e.target.value);
                                      }}
                                    />
                                  </div>
                                  <div className="col d-flex justify-content-end aling-items-center">
                                    <button
                                      className="btn btn-primary p-2 mt-2"
                                      style={{ height: "fit-content" }}
                                      disabled={!name}
                                      onClick={updateName}
                                    >
                                      Update user name
                                    </button>
                                  </div>
                                </div>
                                <div className="row mt-2">
                                  <div className="form-group col-md-12 col-lg-5">
                                    <label className="custom-control-label">
                                     Email Address:
                                    </label>
                                    <input
                                      name="Easthing"
                                      type="text"
                                      className={`form-control `}
                                      onChange={(e) => {
                                        setEmail(e.target.value);
                                      }}
                                    />
                                  </div>
                                  <div className="col d-flex justify-content-end aling-items-center">
                                    <button
                                      className="btn btn-primary p-2 mt-2"
                                      style={{ height: "fit-content" }}
                                      disabled={!email}
                                      onClick={updatEmail}
                                    >
                                      Update email address
                                    </button>
                                  </div>
                                </div>
                                <div className="row mt-2">
                                  <div className="form-group  col-md-12 col-lg-5">
                                    <label className="custom-control-label">
                                      Enabled
                                    </label>

                                    <select
                                      onChange={(e) => {
                                             setEnable(e.target.value);
                                      }}
                                      className="form-select"
                                      name="incomplete"
                                      aria-label="user role"
                                    >
                                      <option value={true} defaultValue>
                                        Yes
                                      </option>
                                      <option value={false}>No</option>
                                    </select>
                                  </div>
                                  <div className="col d-flex justify-content-end aling-items-center">
                                    <button
                                      className="btn btn-primary p-2 mt-2"
                                      style={{ height: "fit-content" }}
                                        disabled={!isEnabled}
                                       onClick={updateenabledStatus}
                                    >
                                      Update  status
                                    </button>
                                  </div>
                                </div>
                                <div className="row mt-2">
                                  <div className="form-group  col-md-12 col-lg-5">
                                    <label className="custom-control-label">
                                      Active
                                    </label>

                                    <select
                                      onChange={(e) => {
                                       setisActive(e.target.value);
                                      }}
                                      className="form-select"
                                      name="incomplete"
                                      aria-label="user role"
                                    >
                                      <option value={true} defaultValue>
                                        Yes
                                      </option>
                                      <option value={false}>No</option>
                                    </select>
                                  </div>
                                  <div className="col d-flex justify-content-end aling-items-center">
                                    <button
                                      className="btn btn-primary p-2 mt-2"
                                      style={{ height: "fit-content" }}
                                      disabled={!isActive}
                                      onClick={updateActiveStatus}
                                    >
                                      Update  status
                                    </button>
                                  </div>
                                </div>
                                <div className="row mt-2">
                                <div className="form-group  col-md-12 col-lg-5">
                                    <label className="custom-control-label">
                                     Roles:
                                    </label>
                                    {roles && (
                                      <select
                                        className={`form-select`}
                                        name="homesteadId"
                                        aria-label="user role"
                                        onChange={(e) => {
                                          setRolesId(e.target.value);
                                        }}
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
                                  </div>
                                  <div className="col d-flex justify-content-end aling-items-center">
                                    <button
                                      className="btn btn-primary p-2 mt-2"
                                      style={{ height: "fit-content" }}
                                     disabled={!roleid}
                                      onClick={updateRole}
                                    >
                                      Update user role
                                    </button>
                                  </div>
                                </div>
                                
                              </form>
                            </AccordionDetails>
                          </Accordion>
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
    </div>
  );
}

export default ViwUserLocal;
