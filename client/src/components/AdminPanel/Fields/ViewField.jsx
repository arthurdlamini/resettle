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
import { FaAngleDown, FaEye } from "react-icons/fa";
import AddFieldYield from "../Fieldyield/AddFieldYield";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { MdDelete } from "react-icons/md";
import { Button ,Modal} from "react-bootstrap";
function ViewField() {
  //get user from global state
  const user = useSelector((state) => state.user.user);
  //get user id from url
  const fieldId = useParams().id;
  const isLoading = useSelector((state) => state.user.isLoading);

  const [homestead, setHomestead] = useState([]);
  const [homesteadid, setHomesteadid] = useState();
  const [show, setShow] = useState(false);
	const handleShow = () => setShow(true);
  const [area, setArea] = useState();
  const [selectedTree, setselectedTree] = useState({});
	const handleClose = () => {
		setShow(false);
	};
  const [width, setWidth] = useState();
  const [relocated, setRelocated] = useState(true);
  const [length, setLength] = useState();
  const navigate = useNavigate();
  const [field, setField] = useState({
    id: fieldId,
    homesteadHead: {},
    createdAt: "",
    area: "",
    length: "",
    width: "",
    relocated:""
  });
  const [fieldYield, setFieldYield] = useState({});
  const dispatch = useDispatch();

  const getField = async () => {
    dispatch(loading(true));
    api(user)
      .get(`/fields/${fieldId}`)
      .then((res) => {
        console.log(res);
        setField({
          ...field,
          homesteadHead: res.data.homesteadId,
          createdAt: res.data.createdAt,
          width: res.data.width,
          modifiedAt: res.data.modifiedAt,
          length: res.data.length,
          area: res.data.area,
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
    getField();
  }, []);

  const columns = [
   
    {
      field: "croptype",
      headerName: "Crop type",
      width: 100,
    },
    {
      field: "priceperton",
      headerName: "Price per ton",
      width: 150,
    },
    {
      field: "yieldperhectare",
      headerName: "Yield per hectare",
      width: 150,
    },
    {
      field: "totalcost",
      headerName: "total cost",
      width: 150,
    },
    {
      field: "grossmargin",
      headerName: "Gross margin",
      width: 150,
    },
    {
      field: "costperhectare",
      headerName: "cost per hectare",
      width: 100,
    },
    {
      field: "",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
      	return (
      		<>
      			<MdDelete
      				className='mx-2 action-icon-delete'
      				onClick={() => {

      					 setselectedTree(params.row);

      					 handleShow();
      				}}
      			/>

      		</>
      	);
      },
    },
  ];
  const getFieldYield = async () => {
    dispatch(loading(true));
    api(user)
      .get(`/fields/yield/field/${fieldId}`)
      .then((res) => {
        console.log(res);
        setFieldYield(res.data);
        dispatch(loading(false));
      })
      .catch((err) => {
        console.log(err);
        dispatch(loading(false));
      });
  };
  useEffect(() => {
    getFieldYield();
  }, []);
  
  const deleteBtn = (field) => {
		dispatch(loading(true));
		api(user)
    .delete(`/fields/yield/field/${field._id}`)
			.then((response) => {
				if (response.data) {
					dispatch(loading(false));
					notifySuccess('Field Yield Deleted');
					handleClose();
					getFieldYield();
				}
				dispatch(loading(false));
				handleClose();
			})
			.catch((error) => {
				notifyError("Error Occuried");
				dispatch(loading(false));
			});
	};

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

  //update Field homestead
  const updatefieldHomestead = (e) => {
    e.preventDefault();
    dispatch(loading(true));
    api(user)
      .put(`/fields/${fieldId}`, {
        homesteadId: homesteadid,
        area: field.area,
        width: field.width,
        length: field.length,
      })
      .then((response) => {
        console.log(response);
        if (response.data.modifiedCount > 0) {
          notifySuccess("Homestead Updated");
          getField();
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
  //update tree condition
  const updatefieldArea = (e) => {
    e.preventDefault();
    dispatch(loading(true));
    api(user)
      .put(`/fields/${fieldId}`, {
        area: area,
        homesteadId: field.homesteadHead?._id,
        width: field.width,
        length: field.length,
      })
      .then((response) => {
        console.log(response);
        if (response.data.modifiedCount > 0) {
          notifySuccess("Area Updated");
          getField();
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
  //update field
  const updatefieldLength = (e) => {
    e.preventDefault();
    dispatch(loading(true));
    api(user)
      .put(`/fields/${fieldId}`, {
        area: field.area,
        homesteadId: field.homesteadHead?._id,
        width: field.width,
        length: length,
      })
      .then((response) => {
        console.log(response);
        if (response.data.modifiedCount > 0) {
          notifySuccess("Field Length Updated Updated");
          getField();
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
  //update width
  const updatewidth = (e) => {
    e.preventDefault();
    dispatch(loading(true));
    api(user)
      .put(`/fields/${fieldId}`, {
        area: field.area,
        homesteadId: field.homesteadHead?._id,
        width: width,
        length: field.length,
      })
      .then((response) => {
        console.log(response);
        if (response.data.modifiedCount > 0) {
          notifySuccess("Width Updated");
          getField();
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
  }; //update reloca
  const updateRelocation= (e) => {
    e.preventDefault();
    dispatch(loading(true));
    api(user)
      .put(`/fields/${fieldId}`, {
        relocated,
      })
      .then((response) => {
        console.log(response);
        if (response.data.modifiedCount > 0) {
          notifySuccess("Relocation Status Updated");
          getField();
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
        View Field Details
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
                        {field.image == null || field.image === "" ? (
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
                                      src={field.image}
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
                              Field Details
                            </h4>
                            <p className="mb-0 custom-control-label">
                              Area:{" "}
                              <span className="text-success">{field.area}</span>
                            </p>
                            <p className="mb-0 custom-control-label">
                              Length:{" "}
                              <span className="text-success">
                                {field.length}
                              </span>
                            </p>
                            <p className="mb-0 custom-control-label">
                              Width:{" "}
                              <span className="text-success">
                                {field.width}
                              </span>
                            </p><p className="mb-0 custom-control-label">
                              Relocated:{" "}
                              <span className="text-success">
                                {field.relocated===true?"Yes":"No"}
                              </span>
                            </p>
                            <p className="mb-0 custom-control-label">
                              Date Added:{" "}
                              <span className="text-success">
                                {new Date(field.createdAt).toLocaleString()}
                              </span>
                            </p>
                          </div>
                          <div className=" text-sm-right custom-control-label">
                            Homestead Head:{" "}
                            <span className="text-success">
                              <span>
                                {field.homesteadHead?.homesteadHead?.name}
                              </span>
                            </span>
                            <div className="text-muted">
                              <small>
                                ID No:{" "}
                                <span className="text-success">
                                  {field.homesteadHead?.homesteadHead?.IDNo}
                                </span>
                              </small>
                            </div>
                            <div className="text-muted">
                              <small>
                                Phone No:{" "}
                                <span className="text-success">
                                  {field.homesteadHead?.homesteadHead?.phone}
                                </span>
                              </small>
                            </div>
                            <div className="text-muted">
                              <small>
                                Location:{" "}
                                <span className="text-success">
                                  {field.homesteadHead?.location}
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
                              <Typography>Edit Field Details</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <form className="form">
                                <div className="row ">
                                  <div className="form-group col-md-12 col-lg-5">
                                    <label className="custom-control-label">
                                      Area:
                                    </label>
                                    <input
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
                                      onClick={updatefieldArea}
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
                                        setLength(e.target.value);
                                      }}
                                    />
                                  </div>
                                  <div className="col d-flex justify-content-end aling-items-center">
                                    <button
                                      className="btn btn-primary p-2 mt-2"
                                      style={{ height: "fit-content" }}
                                      disabled={!length}
                                      onClick={updatefieldLength}
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
                                      onClick={updatewidth}
                                    >
                                      Update
                                    </button>
                                  </div>
                                </div><div className="row mt-2">
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
                                      onClick={updatefieldHomestead}
                                    >
                                      Update
                                    </button>
                                  </div>
                                </div>
                              </form>
                            </AccordionDetails>
                          </Accordion>
                          {fieldYield.length > 0 && (
                            <Accordion className="mt-3">
                              <AccordionSummary
                                expandIcon={<FaAngleDown />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                              >
                                <Typography>Field Yield</Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                {/* TO Filed yield table list */}
                                <DataGrid
                                  autoHeight
                                  className="product-table"
                                  getRowId={(row) => row._id}
                                  rows={fieldYield}
                                  columns={columns}
                                  slots={{ toolbar: GridToolbar }}
                                  slotProps={{
                                    toolbar: {
                                      showQuickFilter: true,
                                      quickFilterProps: {
                                        debounceMs: 500,
                                      },
                                    },
                                  }}
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
                              </AccordionDetails>
                            </Accordion>
                          )}

                          <Accordion className="mt-3">
                            <AccordionSummary
                              expandIcon={<FaAngleDown />}
                              aria-controls="panel1-content"
                              id="panel1-header"
                            >
                              <Typography>Add Field Yield</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <AddFieldYield fieldID={fieldId} refresh={getField} />
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
      <Modal
				show={show}
				onHide={handleClose}
				backdrop='static'
				size='lg'
				centered>
				<Modal.Header closeButton>
					<Modal.Title>Confirm Yield Deletion</Modal.Title>
				</Modal.Header>
				<Modal.Body className=''>
					{isLoading && (
						// Render the loading spinner while loading is true
						<Spinner />
					)}
					<p className='text-danger emp'>
						This action is irrevesible.
					</p>
					<div className='form-group'>
						<label className='control-label' htmlFor='catdesc'>
							Crop Type:
						</label>
						<div className='col-md-12 mt-2'>
							<input
								id='catdesc'
								name='catdesc'
								type='text'
								placeholder={selectedTree.croptype}

								className='form-control'
								disabled
							/>
						</div>
					</div>

				</Modal.Body>
				<Modal.Footer>
					<Button
						variant='danger'
						className='btn btn-danger'
						onClick={() => {
							deleteBtn(selectedTree);
						}}>
						Delete Field Yield
					</Button>
					<Button
						variant='primary'
						className='btn btn-dark'
						onClick={() => {
							handleClose();
						}}>
						Cancel
					</Button>
				</Modal.Footer>
			</Modal>
    </div>
  );
}

export default ViewField;
