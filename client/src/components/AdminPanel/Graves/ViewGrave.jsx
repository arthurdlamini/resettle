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

function ViewGrave() {
  //get user from global state
  const user = useSelector((state) => state.user.user);
  const isAdmin = useSelector((state) => state.user.isAdmin);
  //get user id from url
  const graveId = useParams().id;
  const isLoading = useSelector((state) => state.user.isLoading);

  const [homestead, setHomestead] = useState([]);
  const [homesteadid, setHomesteadid] = useState();
  const [southing, setSouthing] = useState();
  const [relocated, setRelocated] = useState(true);
  const [easting, setEasting] = useState();
  const navigate = useNavigate();
  const [grave, setGrave] = useState({
    id: graveId,
    homesteadHead: {},
    createdAt: "",
    southing: "",
    easting: "",
    relocated: "",
  });
  const dispatch = useDispatch();

  const getGrave = async () => {
    dispatch(loading(true));
    api(user)
      .get(`/graves/${graveId}`)
      .then((res) => {
        console.log(res);
        setGrave({
          ...grave,
          homesteadHead: res.data.homesteadId,
          createdAt: res.data.createdAt,
          southing: res.data.southing,
          modifiedAt: res.data.modifiedAt,
          easting: res.data.easthing,
          relocated: res.data?.relocated,
        });
        dispatch(loading(false));
      })
      .catch((err) => {
        console.log(err);
        dispatch(loading(false));
      });
  };
  useEffect(() => {
    getGrave();
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

  //update grave southing
  const updateGraveSouthing = (e) => {
    e.preventDefault();
    dispatch(loading(true));
    api(user)
      .put(`/graves/${graveId}`, {
        easting: grave.easting,
        southing: southing,
        homesteadId: grave.homesteadHead?._id,
      })
      .then((response) => {
        console.log(response);
        if (response.data.modifiedCount > 0) {
          notifySuccess("Southing Updated");
          getGrave();
          setSouthing("");
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
  }; //update grave easthing
  const updateGraveEasting = (e) => {
    e.preventDefault();
    dispatch(loading(true));
    api(user)
      .put(`/graves/${graveId}`, {
        easting: easting,
        southing: grave.southing,
        homesteadId: grave.homesteadHead?._id,
      })
      .then((response) => {
        console.log(response);
        if (response.data.modifiedCount > 0) {
          notifySuccess("Easting Updated");
          getGrave();
          setSouthing("");
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
  }; //update grave homestead
  const updateGraveHomestead = (e) => {
    e.preventDefault();
    dispatch(loading(true));
    api(user)
      .put(`/graves/${graveId}`, {
        easting: grave.easting,
        southing: grave.southing,
        homesteadId: homesteadid,
      })
      .then((response) => {
        console.log(response);
        if (response.data.modifiedCount > 0) {
          notifySuccess("Homestead Updated");
          getGrave();
          setSouthing("");
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
 //update grave relocation
 const updateRelocation = (e) => {
    e.preventDefault();
    dispatch(loading(true));
    api(user)
      .put(`/graves/${graveId}`, {
        
        relocated
       
      })
      .then((response) => {
        console.log(response);
        if (response.data.modifiedCount > 0) {
          notifySuccess("Relocation Status Updated");
          getGrave();
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
  const { pathname } = useLocation();
  //scroll to top when page loads
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
        <BsTicketDetailedFill className="mx-3 edit-icon" />
        View Grave Details
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
                              Grave Details
                            </h4>
                            <p className="mb-0 custom-control-label">
                              Southing:{" "}
                              <span className="text-success">
                                {grave.southing}
                              </span>
                            </p>
                            <p className="mb-0 custom-control-label">
                              Easting:{" "}
                              <span className="text-success">
                                {grave.easting}
                              </span>
                            </p>
                            <p className="mb-0 custom-control-label">
                              Relocated:{" "}
                              <span className="text-success">
                                {grave.relocated===true?"Yes":"No"}
                              </span>
                            </p>
                            <p className="mb-0 custom-control-label">
                              Date Added:{" "}
                              <span className="text-success">
                                {new Date(grave.createdAt).toLocaleString()}
                              </span>
                            </p>
                          </div>
                          <div className=" text-sm-right custom-control-label">
                            Homestead Head:{" "}
                            <span className="text-success">
                              <span>
                                {grave.homesteadHead?.homesteadHead?.name}
                              </span>
                            </span>
                            <div className="text-muted">
                              <small>
                                ID No:{" "}
                                <span className="text-success">
                                  {grave.homesteadHead?.homesteadHead?.IDNo}
                                </span>
                              </small>
                            </div>
                            <div className="text-muted">
                              <small>
                                Phone No:{" "}
                                <span className="text-success">
                                  {grave.homesteadHead?.homesteadHead?.phone}
                                </span>
                              </small>
                            </div>
                            <div className="text-muted">
                              <small>
                                Location:{" "}
                                <span className="text-success">
                                  {grave.homesteadHead?.location}
                                </span>
                              </small>
                            </div>
                          </div>
                        </div>
                        <div>
                          <Accordion>
                            <AccordionSummary
                              expandIcon={<FaAngleDown />}
                              aria-controls="panel1-content"
                              id="panel1-header"
                            >
                              <Typography>Edit Grave Details</Typography>
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
                                        setSouthing(e.target.value);
                                      }}
                                    />
                                  </div>
                                  <div className="col d-flex justify-content-end aling-items-center">
                                    <button
                                      className="btn btn-primary p-2 mt-2"
                                      style={{ height: "fit-content" }}
                                      disabled={!southing}
                                      onClick={updateGraveSouthing}
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
                                        setEasting(e.target.value);
                                      }}
                                    />
                                  </div>
                                  <div className="col d-flex justify-content-end aling-items-center">
                                    <button
                                      className="btn btn-primary p-2 mt-2"
                                      style={{ height: "fit-content" }}
                                      disabled={!easting}
                                      onClick={updateGraveEasting}
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
                                      Update grave relocation
                                    </button>
                                  </div>
                                </div>
                                
                                <div className="row mt-2">
                                  <div className="form-group  col-md-12 col-lg-5">
                                    <label className="custom-control-label">
                                      Homestead Owner
                                    </label>
                                    {homestead && (
                                      <select
                                        className={`form-select`}
                                        name="homesteadId"
                                        aria-label="user role"
                                        onChange={(e) => {
                                          setHomesteadid(e.target.value);
                                        }}
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
                                  </div>
                                  <div className="col d-flex justify-content-end aling-items-center">
                                    <button
                                      className="btn btn-primary btn-block p-2 mt-2"
                                      style={{ height: "fit-content" }}
                                      disabled={!homesteadid}
                                      onClick={updateGraveHomestead}
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

export default ViewGrave;
