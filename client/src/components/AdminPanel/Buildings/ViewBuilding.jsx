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
function ViewBuilding() {
  //get user from global state
  const user = useSelector((state) => state.user.user);
  //get user id from url
  const buildingId = useParams().id;
  const isLoading = useSelector((state) => state.user.isLoading);

  const [homestead, setHomestead] = useState([]);
  const [homesteadid, setHomesteadid] = useState();
  const [condition, setCondition] = useState();
  const [windows, setWindows] = useState();
  const [walls, setWalls] = useState();
  const [roof, setRoof] = useState();
  const [floors, setFloors] = useState();
  const [length, setlength] = useState();
  const [width, setWidth] = useState();
  const [area, setArea] = useState();
  const [incomplete, setIncomplete] = useState(true);
  const [doors, setDoors] = useState();
  const [notes, setNotes] = useState();
  const [relocated, setRelocated] = useState(true);
  const navigate = useNavigate();
  const [building, setBuilding] = useState({
    id: buildingId,
    homesteadHead: {},
    createdAt: "",
    condition: "",
    roof: "",
    walls: "",
    windows: "",
    incomplete: "",
    notes: "",
    length: "",
    width: "",
    area: "",
    doors: "",
    floor: "",
    relocated:""
  });
  const dispatch = useDispatch();

  const getBuilding = async () => {
    dispatch(loading(true));
    api(user)
      .get(`/buildings/${buildingId}`)
      .then((res) => {
        console.log(res);
        setBuilding({
          ...building,
          homesteadHead: res.data.homesteadID,
          createdAt: res.data.createdAt,
          condition: res.data.condition,
          roof: res.data.roof,
          walls: res.data.walls,
          windows: res.data.windows,
          incomplete: res.data.incomplete,
          notes: res.data.notes,
          length: res.data.length,
          width: res.data.width,
          area: res.data.area,
          doors: res.data.doors,
          floor: res.data.floor,
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
    getBuilding();
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

  //update building homestead
  const updatebuildingHomestead = (e) => {
    e.preventDefault();
    dispatch(loading(true));
    api(user)
      .put(`/buildings/${buildingId}`, {
        homesteadID: homesteadid,
      })
      .then((response) => {
        console.log(response);
        if (response.data.modifiedCount > 0) {
          notifySuccess("Homestead Updated");
          getBuilding();
          setHomesteadid("");
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
  //update building condition
  const updatebuildingCondition = (e) => {
    e.preventDefault();
    dispatch(loading(true));
    api(user)
      .put(`/buildings/${buildingId}`, {
        condition: condition,
      })
      .then((response) => {
        console.log(response);
        if (response.data.modifiedCount > 0) {
          notifySuccess("Condition Updated");
          getBuilding();
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
  //update building type
  const updateWindows = (e) => {
    e.preventDefault();
    dispatch(loading(true));
    api(user)
      .put(`/buildings/${buildingId}`, {
        windows: windows,
      })
      .then((response) => {
        console.log(response);
        if (response.data.modifiedCount > 0) {
          notifySuccess("Building windows Updated");
          getBuilding();
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
  }; //update building walls
  const updateWalls = (e) => {
    e.preventDefault();
    dispatch(loading(true));
    api(user)
      .put(`/buildings/${buildingId}`, {
        walls: walls,
      })
      .then((response) => {
        console.log(response);
        if (response.data.modifiedCount > 0) {
          notifySuccess("Building Walls Updated");
          getBuilding();
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
  //update building roof
  const updateRoof = (e) => {
    e.preventDefault();
    dispatch(loading(true));
    api(user)
      .put(`/buildings/${buildingId}`, {
        roof: roof,
      })
      .then((response) => {
        console.log(response);
        if (response.data.modifiedCount > 0) {
          notifySuccess("Building Walls Updated");
          getBuilding();
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
  //update building size
  const updatebuildingLength = (e) => {
    e.preventDefault();
    dispatch(loading(true));
    api(user)
      .put(`/buildings/${buildingId}`, {
        length: length,
      })
      .then((response) => {
        console.log(response);
        if (response.data.modifiedCount > 0) {
          notifySuccess("Building length Updated");
          getBuilding();
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
  }; //update building width
  const updatebuildingwidth = (e) => {
    e.preventDefault();
    dispatch(loading(true));
    api(user)
      .put(`/buildings/${buildingId}`, {
        width: width,
      })
      .then((response) => {
        console.log(response);
        if (response.data.modifiedCount > 0) {
          notifySuccess("building Width Updated");
          getBuilding();
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
  }; //update building width
  const updatebuildingarea = (e) => {
    e.preventDefault();
    dispatch(loading(true));
    api(user)
      .put(`/buildings/${buildingId}`, {
        area: area,
      })
      .then((response) => {
        console.log(response);
        if (response.data.modifiedCount > 0) {
          notifySuccess("Building Area Updated");
          getBuilding();
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
  }; //update building width
  const updateDoors = (e) => {
    e.preventDefault();
    dispatch(loading(true));
    api(user)
      .put(`/buildings/${buildingId}`, {
        doors: doors,
      })
      .then((response) => {
        console.log(response);
        if (response.data.modifiedCount > 0) {
          notifySuccess("Building doors Updated");
          getBuilding();
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
  //update building width
  const updatebuildingnotes = (e) => {
    e.preventDefault();
    dispatch(loading(true));
    api(user)
      .put(`/buildings/${buildingId}`, {
        notes: notes,
      })
      .then((response) => {
        console.log(response);
        if (response.data.modifiedCount > 0) {
          notifySuccess("building notes Updated");
          getBuilding();
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
  //update building number
  const updateFloors = (e) => {
    e.preventDefault();
    dispatch(loading(true));
    api(user)
      .put(`/buildings/${buildingId}`, {
        floor: floors,
      })
      .then((response) => {
        console.log(response);
        if (response.data.modifiedCount > 0) {
          notifySuccess("No of floors Updated");
          getBuilding();
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
  }; //update building status
  const updateStatus = (e) => {
    e.preventDefault();
    dispatch(loading(true));
    api(user)
      .put(`/buildings/${buildingId}`, {
        incomplete,
      })
      .then((response) => {
        console.log(response);
        if (response.data.modifiedCount > 0) {
          notifySuccess("Status Updated");
          getBuilding();
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
 //update building relocation
 const updateRelocation = (e) => {
  e.preventDefault();
  dispatch(loading(true));
  api(user)
    .put(`/buildings/${buildingId}`, {
      relocated,
    })
    .then((response) => {
      console.log(response);
      if (response.data.modifiedCount > 0) {
        notifySuccess("Relocation Status Updated");
        getBuilding();
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
//Get Homesteads
useEffect(() => {
  //dispatch(loading(true));
  api(user)
    .get(`/homesteads/`)
    .then((res) => {
      console.log(res.data)
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
        View Building Details
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
                        {building.image == null || building.image === "" ? (
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
                                      src={building.image}
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
                              Building Details
                            </h4>
                            <p className="mb-0 custom-control-label">
                              Condition:{" "}
                              <span className="text-success">
                                {building.condition}
                              </span>
                            </p>
                            <p className="mb-0 custom-control-label">
                              Incomplete:
                              <span className="text-success">
                                {building.incomplete === true ? "Yes" : "No"}
                              </span>
                            </p>
                            <p className="mb-0 custom-control-label">
                              Windows:{" "}
                              <span className="text-success">
                                {building.windows}
                              </span>
                            </p>
                            <p className="mb-0 custom-control-label">
                              Walls:{" "}
                              <span className="text-success">
                                {building.walls}
                              </span>
                            </p>
                            <p className="mb-0 custom-control-label">
                              Roof:{" "}
                              <span className="text-success">
                                {building.roof}
                              </span>
                            </p>
                            <p className="mb-0 custom-control-label">
                              Length:{" "}
                              <span className="text-success">
                                {building.length}
                              </span>
                            </p>
                            <p className="mb-0 custom-control-label">
                              Width:{" "}
                              <span className="text-success">
                                {building.width}
                              </span>
                            </p>
                            <p className="mb-0 custom-control-label">
                              Area:{" "}
                              <span className="text-success">
                                {building.area}
                              </span>
                            </p>
                            <p className="mb-0 custom-control-label">
                              Doors:{" "}
                              <span className="text-success">
                                {building.doors}
                              </span>
                            </p>
                            <p className="mb-0 custom-control-label">
                              Notes:{" "}
                              <span className="text-success">
                                {building.notes}
                              </span>
                            </p>
                            <p className="mb-0 custom-control-label">
                              Floor:{" "}
                              <span className="text-success">
                                {building.floor}
                              </span>
                            </p><p className="mb-0 custom-control-label">
                              Relocated:{" "}
                              <span className="text-success">
                                {building.relocated ===true ? "Yes": "No"}
                              </span>
                            </p>
                            <p className="mb-0 custom-control-label">
                              Date Added:{" "}
                              <span className="text-success">
                                {new Date(building.createdAt).toLocaleString()}
                              </span>
                            </p>
                          </div>
                          <div className=" text-sm-right custom-control-label">
                            Homestead Head:{" "}
                            <span className="text-success">
                              <span>
                                {building.homesteadHead?.homesteadHead?.name}
                              </span>
                            </span>
                            <div className="text-muted">
                              <small>
                                ID No:{" "}
                                <span className="text-success">
                                  {building.homesteadHead?.homesteadHead?.IDNo}
                                </span>
                              </small>
                            </div>
                            <div className="text-muted">
                              <small>
                                Phone No:{" "}
                                <span className="text-success">
                                  {building.homesteadHead?.homesteadHead?.phone}
                                </span>
                              </small>
                            </div>
                            <div className="text-muted">
                              <small>
                                Location:{" "}
                                <span className="text-success">
                                  {building.homesteadHead?.location}
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
                              <Typography>Edit Building Details</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <form className="form">
                                <div className="row ">
                                  <div className="form-group col-md-12 col-lg-5">
                                    <label className="custom-control-label">
                                      Conditon:
                                    </label>
                                    <input
                                      type="text"
                                      className={`form-control `}
                                      onChange={(e) => {
                                        setCondition(e.target.value);
                                      }}
                                    />
                                  </div>
                                  <div className="col d-flex justify-content-end aling-items-center">
                                    <button
                                      className="btn btn-primary p-2 mt-2"
                                      style={{ height: "fit-content" }}
                                      disabled={!condition}
                                      onClick={updatebuildingCondition}
                                    >
                                      Update
                                    </button>
                                  </div>
                                </div>
                                <div className="row mt-2">
                                  <div className="form-group col-md-12 col-lg-5">
                                    <label className="custom-control-label">
                                      Windows:
                                    </label>
                                    <input
                                      name="Easthing"
                                      type="text"
                                      className={`form-control `}
                                      onChange={(e) => {
                                        setWindows(e.target.value);
                                      }}
                                    />
                                  </div>
                                  <div className="col d-flex justify-content-end aling-items-center">
                                    <button
                                      className="btn btn-primary p-2 mt-2"
                                      style={{ height: "fit-content" }}
                                      disabled={!windows}
                                      onClick={updateWindows}
                                    >
                                      Update
                                    </button>
                                  </div>
                                </div>
                                <div className="row mt-2">
                                  <div className="form-group col-md-12 col-lg-5">
                                    <label className="custom-control-label">
                                      Walls:
                                    </label>
                                    <input
                                      name="Easthing"
                                      type="text"
                                      className={`form-control `}
                                      onChange={(e) => {
                                        setWalls(e.target.value);
                                      }}
                                    />
                                  </div>
                                  <div className="col d-flex justify-content-end aling-items-center">
                                    <button
                                      className="btn btn-primary p-2 mt-2"
                                      style={{ height: "fit-content" }}
                                      disabled={!walls}
                                      onClick={updateWalls}
                                    >
                                      Update
                                    </button>
                                  </div>
                                </div>
                                <div className="row mt-2">
                                  <div className="form-group col-md-12 col-lg-5">
                                    <label className="custom-control-label">
                                      Roof:
                                    </label>
                                    <input
                                      name="Easthing"
                                      type="text"
                                      className={`form-control `}
                                      onChange={(e) => {
                                        setRoof(e.target.value);
                                      }}
                                    />
                                  </div>
                                  <div className="col d-flex justify-content-end aling-items-center">
                                    <button
                                      className="btn btn-primary p-2 mt-2"
                                      style={{ height: "fit-content" }}
                                      disabled={!roof}
                                      onClick={updateRoof}
                                    >
                                      Update
                                    </button>
                                  </div>
                                </div>
                                <div className="row mt-2">
                                  <div className="form-group col-md-12 col-lg-5">
                                    <label className="custom-control-label">
                                      Length:
                                    </label>
                                    <input
                                      name="Easthing"
                                      type="text"
                                      className={`form-control `}
                                      onChange={(e) => {
                                        setlength(e.target.value);
                                      }}
                                    />
                                  </div>
                                  <div className="col d-flex justify-content-end aling-items-center">
                                    <button
                                      className="btn btn-primary p-2 mt-2"
                                      style={{ height: "fit-content" }}
                                      disabled={!length}
                                      onClick={updatebuildingLength}
                                    >
                                      Update
                                    </button>
                                  </div>
                                </div>
                                <div className="row mt-2">
                                  <div className="form-group col-md-12 col-lg-5">
                                    <label className="custom-control-label">
                                      Width:
                                    </label>
                                    <input
                                      name="Easthing"
                                      type="text"
                                      className={`form-control `}
                                      onChange={(e) => {
                                        setWidth(e.target.value);
                                      }}
                                    />
                                  </div>
                                  <div className="col d-flex justify-content-end aling-items-center">
                                    <button
                                      className="btn btn-primary p-2 mt-2"
                                      style={{ height: "fit-content" }}
                                      disabled={!width}
                                      onClick={updatebuildingwidth}
                                    >
                                      Update
                                    </button>
                                  </div>
                                </div>
                                <div className="row mt-2">
                                  <div className="form-group col-md-12 col-lg-5">
                                    <label className="custom-control-label">
                                      Area:
                                    </label>
                                    <input
                                      name="Easthing"
                                      type="text"
                                      className={`form-control `}
                                      onChange={(e) => {
                                        setArea(e.target.value);
                                      }}
                                    />
                                  </div>
                                  <div className="col d-flex justify-content-end aling-items-center">
                                    <button
                                      className="btn btn-primary p-2 mt-2"
                                      style={{ height: "fit-content" }}
                                      disabled={!area}
                                      onClick={updatebuildingarea}
                                    >
                                      Update
                                    </button>
                                  </div>
                                </div>
                                <div className="row mt-2">
                                  <div className="form-group col-md-12 col-lg-5">
                                    <label className="custom-control-label">
                                      Doors:
                                    </label>
                                    <input
                                      name="Easthing"
                                      type="text"
                                      className={`form-control `}
                                      onChange={(e) => {
                                        setDoors(e.target.value);
                                      }}
                                    />
                                  </div>
                                  <div className="col d-flex justify-content-end aling-items-center">
                                    <button
                                      className="btn btn-primary p-2 mt-2"
                                      style={{ height: "fit-content" }}
                                      disabled={!doors}
                                      onClick={updateDoors}
                                    >
                                      Update
                                    </button>
                                  </div>
                                </div>
                                <div className="row mt-2">
                                  <div className="form-group col-md-12 col-lg-5">
                                    <label className="custom-control-label">
                                      Notes:
                                    </label>
                                    <textarea
                                      name="Easthing"
                                      cols={5}
                                      type="text"
                                      className={`form-control `}
                                      onChange={(e) => {
                                        setNotes(e.target.value);
                                      }}
                                    />
                                  </div>
                                  <div className="col d-flex justify-content-end aling-items-center">
                                    <button
                                      className="btn btn-primary p-2 mt-2"
                                      style={{ height: "fit-content" }}
                                      disabled={!notes}
                                      onClick={updatebuildingnotes}
                                    >
                                      Update
                                    </button>
                                  </div>
                                </div>
                                <div className="row mt-2">
                                  <div className="form-group col-md-12 col-lg-5">
                                    <label className="custom-control-label">
                                      Floors:
                                    </label>
                                    <input
                                      name="Easthing"
                                      type="text"
                                      className={`form-control `}
                                      onChange={(e) => {
                                        setFloors(e.target.value);
                                      }}
                                    />
                                  </div>
                                  <div className="col d-flex justify-content-end aling-items-center">
                                    <button
                                      className="btn btn-primary p-2 mt-2"
                                      style={{ height: "fit-content" }}
                                      disabled={!floors}
                                      onClick={updateFloors}
                                    >
                                      Update
                                    </button>
                                  </div>
                                </div>
                                <div className="row mt-2">
                                  <div className="form-group  col-md-12 col-lg-5">
                                    <label className="custom-control-label">
                                      Incomplete
                                    </label>

                                    <select
                                      onChange={(e) => {
                                        setIncomplete(e.target.value);
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
                                      disabled={!incomplete}
                                      onClick={updateStatus}
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
                                      Update building relocation
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
                                      onClick={updatebuildingHomestead}
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

export default ViewBuilding;
