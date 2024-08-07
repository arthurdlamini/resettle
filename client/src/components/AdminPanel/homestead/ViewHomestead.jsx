import axios from "axios";
import React, { useEffect, useState } from "react";
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
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { FaAngleDown } from "react-icons/fa";
function ViewHomestead() {
  //get user from global state
  const user = useSelector((state) => state.user.user);
  const isAdmin = useSelector((state) => state.user.isAdmin);
  //get user id from url
  const homesteadId = useParams().id;
  const isLoading = useSelector((state) => state.user.isLoading);
  
  const [relocated, setRelocated] = useState(true);

  const [comment, setComment] = useState("");

  const [homesteadid, setHomesteadid] = useState();
  const [graves, setGraves] = useState([]);
  const [trees, setTrees] = useState([]);
  const [fields, setFields] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [structures, setstructures] = useState([]);
  const [userID, setuserID] = useState();
  const [person, setPerson] = useState();

  const [easting ,setEasting] = useState()
  const [southing,setSouthing] = useState()
  const [location,setlocation] = useState()




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
    relocated:""
  });
  const dispatch = useDispatch();

  const getHomestead = async () => {
    dispatch(loading(true));
    api(user)
      .get(`/homesteads/${homesteadId}`)
      .then((res) => {
        console.log(res);
        setHomestead({
          ...homestead,

          homesteadHead: res.data.homesteadHead,
          createdAt: res.data.createdAt,
          southern: res.data.southing,
          modifiedAt: res.data.modifiedAt,
          eastern: res.data.easting,
          location: res.data.location,
          relocated:res.data.relocated
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
  const getGraves = async () => {
    dispatch(loading(true));
    api(user)
      .get(`/graves/home/${homesteadId}`)
      .then((res) => {
        console.log(res);
        setGraves(res.data);
        dispatch(loading(false));
      })
      .catch((err) => {
        console.log(err);
        dispatch(loading(false));
      });
  };

  useEffect(() => {
    getGraves();
  }, []);
  const getFields = async () => {
    dispatch(loading(true));
    api(user)
      .get(`/fields/home/${homesteadId}`)
      .then((res) => {
        console.log(res);
        setFields(res.data);
        dispatch(loading(false));
      })
      .catch((err) => {
        console.log(err);
        dispatch(loading(false));
      });
  };

  useEffect(() => {
    getFields();
  }, []);
  const getTrees = async () => {
    dispatch(loading(true));
    api(user)
      .get(`/trees/home/${homesteadId}`)
      .then((res) => {
        console.log(res);
        setTrees(res.data);
        dispatch(loading(false));
      })
      .catch((err) => {
        console.log(err);
        dispatch(loading(false));
      });
  };

  useEffect(() => {
    getTrees();
  }, []);
  const getStructures = async () => {
    dispatch(loading(true));
    api(user)
      .get(`/structure/home/${homesteadId}`)
      .then((res) => {
        console.log(res);
        setstructures(res.data);
        dispatch(loading(false));
      })
      .catch((err) => {
        console.log(err);
        dispatch(loading(false));
      });
  };

  useEffect(() => {
    getStructures();
  }, []);
  const getBuildings = async () => {
    dispatch(loading(true));
    api(user)
      .get(`/buildings/home/${homesteadId}`)
      .then((res) => {
        console.log(res);
        setBuildings(res.data);
        dispatch(loading(false));
      })
      .catch((err) => {
        console.log(err);
        dispatch(loading(false));
      });
  };

  useEffect(() => {
    getBuildings();
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

  const getFileTypeIcon = (file, index, url) => {
    const extension = file.filename.split(".").pop().toLowerCase();

    // Other file types (using react-file-icon)
    return (
      <div
        key={index}
        className="file-item pt-2"
        style={{ width: "50px" }}
        onClick={() => {}}
      >
        <FileIcon extension={extension} {...defaultStyles[extension]} />
        <span
          style={{
            width: "100%",
            display: "block",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {file.filename}
        </span>
        <a
          href={file?.secure_url}
          className="mt-5 text-success"
          target="_blank"
          style={{ textDecoration: "none" }}
          rel="noreferrer"
        >
          View
        </a>
      </div>
    );
  };
  //update  homestead owner
  const updatehomeowner = (e) => {
    e.preventDefault();
    dispatch(loading(true));
    api(user)
      .put(`/homesteads/${homesteadId}`, {
        homesteadHead: userID,
      })
      .then((response) => {
        console.log(response);
        if (response.data.modifiedCount > 0) {
          notifySuccess("Homestead Updated");
          getHomestead();

          //setSouthing('');
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
  //update  homestead location
  const updatehomelocation = (e) => {
    e.preventDefault();
    dispatch(loading(true));
    api(user)
      .put(`/homesteads/${homesteadId}`, {
        location:location,
      })
      .then((response) => {
        console.log(response);
        if (response.data.modifiedCount > 0) {
          notifySuccess("Location Updated");
          getHomestead();

          //setSouthing('');
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
  //update  homestead southing
  const updatehomesouthing = (e) => {
    e.preventDefault();
    dispatch(loading(true));
    api(user)
      .put(`/homesteads/${homesteadId}`, {
        southing:southing,
      })
      .then((response) => {
        console.log(response);
        if (response.data.modifiedCount > 0) {
          notifySuccess("Southing Updated");
          getHomestead();

          //setSouthing('');
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
  }; //update  homestead easting
  const updatehomeeasting = (e) => {
    e.preventDefault();
    dispatch(loading(true));
    api(user)
      .put(`/homesteads/${homesteadId}`, {
        easting:easting,
      })
      .then((response) => {
        console.log(response);
        if (response.data.modifiedCount > 0) {
          notifySuccess("Easting Updated");
          getHomestead();

          //setSouthing('');
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
  };//update  homestead relocati
  const updateRelocation = (e) => {
    e.preventDefault();
    dispatch(loading(true));
    api(user)
      .put(`/homesteads/${homesteadId}`, {
        relocated,
      })
      .then((response) => {
        console.log(response);
        if (response.data.modifiedCount > 0) {
          notifySuccess("Relocation Status Updated");
          getHomestead();

          //setSouthing('');
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
  //Get Person
  useEffect(() => {
    //dispatch(loading(true));
    api(user)
      .get(`/person/`)
      .then((res) => {
        console.log(res.data);
        setPerson(res.data);
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
        View Homestead Details
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
                        {homestead.image == null || homestead.image === "" ? (
                          <></>
                        ) : (
                          <>
                            <div className="col-12 col-sm-auto mb-3">
                              <div className="mx-auto" style={{ width: 140 }}>
                                <div
                                  className="d-flex justify-content-center align-items-center rounded"
                                  style={{
                                    height: 140,
                                    backgroundColor: "rgb(233, 236, 239)",
                                  }}
                                >
                                  <span
                                    style={{
                                      color: "rgb(166, 168, 170)",
                                      font: "bold 8pt Arial",
                                    }}
                                  >
                                    <img
                                      src={homestead.image}
                                      alt="ticket"
                                      style={{
                                        objectFit: "contain",
                                        width: "100%",
                                      }}
                                    />
                                  </span>
                                </div>
                              </div>
                            </div>
                          </>
                        )}

                        <div className="col d-flex flex-column flex-sm-row justify-content-between mb-3">
                          <div className="text-sm-left mb-2 mb-sm-0">
                            <h4 className="pt-sm-2 pb-1 mb-0 text-nowrap">
                              Homestead {homestead.reference} Details
                            </h4>
                            <p className="mb-0 custom-control-label">
                              Southern:{" "}
                              <span className="text-success">
                                {homestead.southern}
                              </span>
                            </p>
                            <p className="mb-0 custom-control-label">
                              Eastern:{" "}
                              <span className="text-success">
                                {homestead.eastern}
                              </span>
                            </p>
                            <div className="text-muted custom-control-label">
                              <small>
                                Location:{" "}
                                <span className="text-success">
                                  {homestead.location}
                                </span>
                              </small>
                            </div><div className="text-muted custom-control-label">
                              <small>
                                Relocated:{" "}
                                <span className="text-success">
                                  {homestead.relocated===true?"Yes":"No"}
                                </span>
                              </small>
                            </div>
                          </div>
                          <div className=" text-sm-right custom-control-label">
                            Homestead Head:{" "}
                            <span className="text-success">
                              {homestead.createdBy?.name}
                              <span>{homestead.homesteadHead?.name}</span>
                            </span>
                            <div className="text-muted">
                              <small>
                                ID No:{" "}
                                <span className="text-success">
                                  {homestead.homesteadHead?.IDNo}
                                </span>
                              </small>
                            </div>
                            <div className="text-muted">
                              <small>
                                Added On:{" "}
                                <span className="text-success">
                                  {new Date(
                                    homestead.createdAt
                                  ).toLocaleString()}
                                </span>
                              </small>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          {/* {graves.length > 0 && <><h4>Graves({(graves.length)})</h4>

													</>}
												</div><div className='row'>

													{fields.length > 0 && <><h4>Fields({(fields.length)})</h4>

													</>}
												</div><div className='row'>

													{trees.length > 0 && <><h4>Trees({(trees.length)})</h4>

													</>}
												</div><div className='row'>

													{buildings.length > 0 && <><h4>Buildings({(buildings.length)})</h4>

													</>}
												</div><div className='row'>

													{structures.length > 0 && <><h4>Structures({(structures.length)})</h4>

													</>} */}
                          <Accordion>
                            <AccordionSummary
                              expandIcon={<FaAngleDown />}
                              aria-controls="panel1-content"
                              id="panel1-header"
                            >
                              <Typography>Edit Homestead Details</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <form className="form">
                                <div className="row ">
                                  <div className="form-group col-md-12 col-lg-5">
                                    <label className="custom-control-label">
                                      Southing:
                                    </label>
                                    <input
                                      type="text"
                                      className={`form-control `}
                                      onChange={(e) => {
                                        			setSouthing(e.target.value)
                                      }}
                                    />
                                  </div>
                                  <div className="col d-flex justify-content-end aling-items-center">
                                    <button
                                      className="btn btn-primary p-2 mt-2"
                                      style={{ height: "fit-content" }}
                                      		disabled={!southing}
                                      	onClick={updatehomesouthing}
                                    >
                                      Update
                                    </button>
                                  </div>
                                </div>
                                <div className="row mt-2">
                                  <div className="form-group col-md-12 col-lg-5">
                                    <label className="custom-control-label">
                                      Easthing:
                                    </label>
                                    <input
                                      name="Easthing"
                                      type="text"
                                      className={`form-control `}
                                      onChange={(e) => {
                                        			setEasting(e.target.value)
                                      }}
                                    />
                                  </div>
                                  <div className="col d-flex justify-content-end aling-items-center">
                                    <button
                                      className="btn btn-primary p-2 mt-2"
                                      style={{ height: "fit-content" }}
                                      	disabled={!easting}
                                      	onClick={updatehomeeasting}
                                    >
                                      Update
                                    </button>
                                  </div>
                                </div>
                                <div className="row mt-2">
                                  <div className="form-group col-md-12 col-lg-5">
                                    <label className="custom-control-label">
                                      Location:
                                    </label>
                                    <input
                                      name="Easthing"
                                      type="text"
                                      className={`form-control `}
                                      onChange={(e) => {
                                        			setlocation(e.target.value)
                                      }}
                                    />
                                  </div>
                                  <div className="col d-flex justify-content-end aling-items-center">
                                    <button
                                      className="btn btn-primary p-2 mt-2"
                                      style={{ height: "fit-content" }}
                                      	disabled={!location}
                                      	onClick={updatehomelocation}
                                    >
                                      Update
                                    </button>
                                  </div>
                                </div>
                                <div className="row mt-2">
                                  <div className="form-group  col-md-12 col-lg-5">
                                    <label className="custom-control-label">
                                      Relocated
                                    </label>

                                    <select
                                      onChange={(e) => {
                                        setRelocated(e.target.value);
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
                                      disabled={!relocated}
                                      onClick={updateRelocation}
                                    >
                                      Update
                                    </button>
                                  </div>
                                </div>
                                <div className="row mt-2">
                                  <div className="form-group  col-md-12 col-lg-5">
                                    <label className="custom-control-label">
                                      Homestead Owner
                                    </label>
                                    {person && (
                                      <select
                                        className={`form-select`}
                                        name="homesteadId"
                                        aria-label="user role"
                                        onChange={(e) => {
                                          setuserID(e.target.value);
                                        }}
                                      >
                                        <option value="" defaultValue>
                                          Select Owner
                                        </option>
                                        {person?.map((item) => (
                                          <option
                                            value={item._id}
                                            key={item._id}
                                          >
                                            {item?.name} - {item?.IDNo}
                                          </option>
                                        ))}
                                      </select>
                                    )}
                                  </div>
                                  <div className="col d-flex justify-content-end aling-items-center">
                                    <button
                                      className="btn btn-primary btn-block p-2 mt-2"
                                      style={{ height: "fit-content" }}
                                      disabled={!userID}
                                      onClick={updatehomeowner}
                                    >
                                      Update
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

export default ViewHomestead;
