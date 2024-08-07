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

function ViewStructure() {
  //get user from global state
  const user = useSelector((state) => state.user.user);
  const isAdmin = useSelector((state) => state.user.isAdmin);
  //get user id from url
  const structureId = useParams().id;
  const isLoading = useSelector((state) => state.user.isLoading);

  const [homestead, setHomestead] = useState([]);
  const [homesteadid, setHomesteadid] = useState();
  const [condition, setCondition] = useState();
  const [number, setNumber] = useState();
  const [length, setlength] = useState();
  const [width, setWidth] = useState();
  const [area, setArea] = useState();
  const [runningM, setRunningM] = useState();
  const [replaced, setReplaced] = useState(true);
  const [notes, setNotes] = useState();
  const [type, setType] = useState();
  const [relocated, setRelocated] = useState(true);
  const navigate = useNavigate();
  const [structure, setStructure] = useState({
    id: structureId,
    homesteadHead: {},
    createdAt: "",
    condition: "",
    number: "",
    size: "",
    type: "",
    replaced: "",
    notes: "",
    length: "",
    width: "",
    area: "",
    runningM: "",
    relocated:""
  });
  const dispatch = useDispatch();

  const getStructure = async () => {
    dispatch(loading(true));
    api(user)
      .get(`/structure/${structureId}`)
      .then((res) => {
        console.log(res);
        setStructure({
          ...structure,
          homesteadHead: res.data.homesteadID,
          createdAt: res.data.createdAt,
          condition: res.data.condition,
          modifiedAt: res.data.modifiedAt,
          number: res.data.number,
          type: res.data.type,
          size: res.data.size,
          replaced: res.data.replaced,
          notes: res.data.notes,
          length: res.data.length,
          width: res.data.width,
          area: res.data.area,
          runningM: res.data.runningM,
          relocated:res.data?.relocated
        });
        dispatch(loading(false));
      })
      .catch((err) => {
        console.log(err);
        dispatch(loading(false));
      });
  };
  useEffect(() => {
    getStructure();
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

  //update structure homestead
  const updatestructureHomestead = (e) => {
    e.preventDefault();
    dispatch(loading(true));
    api(user)
      .put(`/structure/${structureId}`, {
        type: structure.type,
        condition: condition,
        homesteadID: homesteadid,
        number: structure.number,
        replaced: structure.replaced,
        notes: structure.notes,
        length: structure.length,
        width: structure.width,
        area: structure.area,
        runningM: structure.runningM,
      })
      .then((response) => {
        console.log(response);
        if (response.data.modifiedCount > 0) {
          notifySuccess("Homestead Updated");
          getStructure();
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
  //update structure condition
  const updatestructureCondition = (e) => {
    e.preventDefault();
    dispatch(loading(true));
    api(user)
      .put(`/structure/${structureId}`, {
        type: structure.type,
        condition: condition,
        homesteadID: structure.homesteadHead?._id,
        number: structure.number,
        replaced: structure.replaced,
        notes: structure.notes,
        length: structure.length,
        width: structure.width,
        area: structure.area,
        runningM: structure.runningM,
      })
      .then((response) => {
        console.log(response);
        if (response.data.modifiedCount > 0) {
          notifySuccess("Condition Updated");
          getStructure();
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
  //update structure type
  const updatestructureType = (e) => {
    e.preventDefault();
    dispatch(loading(true));
    api(user)
      .put(`/structure/${structureId}`, {
        type: type,
        condition: structure.condition,
        homesteadID: structure.homesteadHead?._id,
        number: structure.number,
        replaced: structure.replaced,
        notes: structure.notes,
        length: structure.length,
        width: structure.width,
        area: structure.area,
        runningM: structure.runningM,
      })
      .then((response) => {
        console.log(response);
        if (response.data.modifiedCount > 0) {
          notifySuccess("Structure type Updated");
          getStructure();
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
  //update structure size
  const updateStructureLength = (e) => {
    e.preventDefault();
    dispatch(loading(true));
    api(user)
      .put(`/structure/${structureId}`, {
        type: structure.type,
        condition: structure.condition,
        homesteadID: structure.homesteadHead?._id,
        number: structure.number,
        replaced: structure.replaced,
        notes: structure.notes,
        length: length,
        width: structure.width,
        area: structure.area,
        runningM: structure.runningM,
      })
      .then((response) => {
        console.log(response);
        if (response.data.modifiedCount > 0) {
          notifySuccess("Structure length Updated");
          getStructure();
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
  }; //update structure width
  const updateStructurewidth = (e) => {
    e.preventDefault();
    dispatch(loading(true));
    api(user)
      .put(`/structure/${structureId}`, {
        type: structure.type,
        condition: structure.condition,
        homesteadID: structure.homesteadHead?._id,
        number: structure.number,
        replaced: structure.replaced,
        notes: structure.notes,
        length: structure.length,
        width: width,
        area: structure.area,
        runningM: structure.runningM,
      })
      .then((response) => {
        console.log(response);
        if (response.data.modifiedCount > 0) {
          notifySuccess("Structure Width Updated");
          getStructure();
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
  }; //update structure width
  const updateStructurearea = (e) => {
    e.preventDefault();
    dispatch(loading(true));
    api(user)
      .put(`/structure/${structureId}`, {
        type: structure.type,
        condition: structure.condition,
        homesteadID: structure.homesteadHead?._id,
        number: structure.number,
        replaced: structure.replaced,
        notes: structure.notes,
        length: structure.length,
        width: structure.width,
        area: area,
        runningM: structure.runningM,
      })
      .then((response) => {
        console.log(response);
        if (response.data.modifiedCount > 0) {
          notifySuccess("Structure Area Updated");
          getStructure();
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
  };//update structure width
  const updateStructurerunnigM = (e) => {
    e.preventDefault();
    dispatch(loading(true));
    api(user)
      .put(`/structure/${structureId}`, {
        type: structure.type,
        condition: structure.condition,
        homesteadID: structure.homesteadHead?._id,
        number: structure.number,
        replaced: structure.replaced,
        notes: structure.notes,
        length: structure.length,
        width: structure.width,
        area: structure.area,
        runningM: runningM,
      })
      .then((response) => {
        console.log(response);
        if (response.data.modifiedCount > 0) {
          notifySuccess("Structure RunningM Updated");
          getStructure();
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
  //update structure width
  const updateStructurenotes = (e) => {
    e.preventDefault();
    dispatch(loading(true));
    api(user)
      .put(`/structure/${structureId}`, {
        type: structure.type,
        condition: structure.condition,
        homesteadID: structure.homesteadHead?._id,
        number: structure.number,
        replaced: structure.replaced,
        notes: notes,
        length: structure.length,
        width: structure.width,
        area: structure.area,
        runningM: structure.runningM,
      })
      .then((response) => {
        console.log(response);
        if (response.data.modifiedCount > 0) {
          notifySuccess("Structure notes Updated");
          getStructure();
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
  //update structure number
  const updatestructureNumber = (e) => {
    e.preventDefault();
    dispatch(loading(true));
    api(user)
      .put(`/structure/${structureId}`, {
        type: structure.type,
        condition: structure.condition,
        homesteadID: structure.homesteadHead?._id,
        number: number,
        replaced: structure.replaced,
        notes: structure.notes,
        length: structure.length,
        width: structure.width,
        area: structure.area,
        runningM: structure.runningM,
      })
      .then((response) => {
        console.log(response);
        if (response.data.modifiedCount > 0) {
          notifySuccess("No of structures Updated");
          getStructure();
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
  }; //update structure replaced
  const updatestructurereplaced = (e) => {
    e.preventDefault();
    dispatch(loading(true));
    api(user)
      .put(`/structure/${structureId}`, {
        
        replaced: replaced
        
      })
      .then((response) => {
        console.log(response);
        if (response.data.modifiedCount > 0) {
          notifySuccess("Replaced Updated");
          getStructure();
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
 //update structure relocation
 const updateRelocation = (e) => {
  e.preventDefault();
  dispatch(loading(true));
  api(user)
    .put(`/structure/${structureId}`, {
      
      relocated
      
    })
    .then((response) => {
      console.log(response);
      if (response.data.modifiedCount > 0) {
        notifySuccess("Relocation Status Updated");
        getStructure();
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
        View Structure Details
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
                        {structure.image == null || structure.image === "" ? (
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
                                      src={structure.image}
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
                              Structure Details
                            </h4>
                            <p className="mb-0 custom-control-label">
                              Condition:{" "}
                              <span className="text-success">
                                {structure.condition}
                              </span>
                            </p>
                            <p className="mb-0 custom-control-label">
                              Replaced:{" "}
                              <span className="text-success">
                                {structure.replaced === true ? "Yes" : "No"}
                              </span>
                            </p>
                            <p className="mb-0 custom-control-label">
                              Type:{" "}
                              <span className="text-success">
                                {structure.type}
                              </span>
                            </p>
                            <p className="mb-0 custom-control-label">
                              Length:{" "}
                              <span className="text-success">
                                {structure.length}
                              </span>
                            </p>
                            <p className="mb-0 custom-control-label">
                              Width:{" "}
                              <span className="text-success">
                                {structure.width}
                              </span>
                            </p>
                            <p className="mb-0 custom-control-label">
                              Area:{" "}
                              <span className="text-success">
                                {structure.area}
                              </span>
                            </p>
                            <p className="mb-0 custom-control-label">
                              Number of structures:{" "}
                              <span className="text-success">
                                {structure.number}
                              </span>
                            </p>
                            <p className="mb-0 custom-control-label">
                              Notes:{" "}
                              <span className="text-success">
                                {structure.notes}
                              </span>
                            </p>
                            <p className="mb-0 custom-control-label">
                              RunningM:{" "}
                              <span className="text-success">
                                {structure.runningM}
                              </span>
                            </p><p className="mb-0 custom-control-label">
                              Relocated:{" "}
                              <span className="text-success">
                                {structure.relocated===true?"Yes":"No"}
                              </span>
                            </p>
                            <p className="mb-0 custom-control-label">
                              Date Added:{" "}
                              <span className="text-success">
                                {new Date(structure.createdAt).toLocaleString()}
                              </span>
                            </p>
                          </div>
                          <div className=" text-sm-right custom-control-label">
                            Homestead Head:{" "}
                            <span className="text-success">
                              <span>
                                {structure.homesteadHead?.homesteadHead?.name}
                              </span>
                            </span>
                            <div className="text-muted">
                              <small>
                                ID No:{" "}
                                <span className="text-success">
                                  {structure.homesteadHead?.homesteadHead?.IDNo}
                                </span>
                              </small>
                            </div>
                            <div className="text-muted">
                              <small>
                                Phone No:{" "}
                                <span className="text-success">
                                  {
                                    structure.homesteadHead?.homesteadHead
                                      ?.phone
                                  }
                                </span>
                              </small>
                            </div>
                            <div className="text-muted">
                              <small>
                                Location:{" "}
                                <span className="text-success">
                                  {structure.homesteadHead?.location}
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
                              <Typography>Edit Structure Details</Typography>
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
                                      onClick={updatestructureCondition}
                                    >
                                      Update
                                    </button>
                                  </div>
                                </div>
                                <div className="row mt-2">
                                  <div className="form-group col-md-12 col-lg-5">
                                    <label className="custom-control-label">
                                      Type:
                                    </label>
                                    <input
                                      name="Easthing"
                                      type="text"
                                      className={`form-control `}
                                      onChange={(e) => {
                                        setType(e.target.value);
                                      }}
                                    />
                                  </div>
                                  <div className="col d-flex justify-content-end aling-items-center">
                                    <button
                                      className="btn btn-primary p-2 mt-2"
                                      style={{ height: "fit-content" }}
                                      disabled={!type}
                                      onClick={updatestructureType}
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
                                      onClick={updateStructureLength}
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
                                      onClick={updateStructurewidth}
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
                                      onClick={updateStructurearea}
                                    >
                                      Update
                                    </button>
                                  </div>
                                </div>
                                <div className="row mt-2">
                                  <div className="form-group col-md-12 col-lg-5">
                                    <label className="custom-control-label">
                                      RunningM:
                                    </label>
                                    <input
                                      name="Easthing"
                                      type="text"
                                      className={`form-control `}
                                      onChange={(e) => {
                                        setRunningM(e.target.value);
                                      }}
                                    />
                                  </div>
                                  <div className="col d-flex justify-content-end aling-items-center">
                                    <button
                                      className="btn btn-primary p-2 mt-2"
                                      style={{ height: "fit-content" }}
                                      disabled={!runningM}
                                      onClick={updateStructurerunnigM}
                                    >
                                      Update
                                    </button>
                                  </div>
                                </div>
                                
                                <div className="row mt-2">
                                  <div className="form-group  col-md-12 col-lg-5">
                                    <label className="custom-control-label">
                                      Replaced
                                    </label>

                                    <select
                                      onChange={(e) => {
                                        setReplaced(e.target.value);
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
                                      disabled={!replaced}
                                      onClick={updatestructurereplaced}
                                    >
                                      Update Structure status
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
                                      Update relocation status
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
                                      onClick={updateStructurenotes}
                                    >
                                      Update
                                    </button>
                                  </div>
                                </div>
                                <div className="row mt-2">
                                  <div className="form-group col-md-12 col-lg-5">
                                    <label className="custom-control-label">
                                      Number of Structures:
                                    </label>
                                    <input
                                      name="Easthing"
                                      type="text"
                                      className={`form-control `}
                                      onChange={(e) => {
                                        setNumber(e.target.value);
                                      }}
                                    />
                                  </div>
                                  <div className="col d-flex justify-content-end aling-items-center">
                                    <button
                                      className="btn btn-primary p-2 mt-2"
                                      style={{ height: "fit-content" }}
                                      disabled={!number}
                                      onClick={updatestructureNumber}
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
                                      onClick={updatestructureHomestead}
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

export default ViewStructure;
