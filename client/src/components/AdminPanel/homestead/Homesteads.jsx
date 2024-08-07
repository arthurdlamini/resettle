import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button, Modal } from "react-bootstrap";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { MdSettings, MdDelete } from "react-icons/md";
import Chip from "@mui/material/Chip";
import { FaEye } from "react-icons/fa";
import axios from "axios";
import { ImTicket } from "react-icons/im";
import { FcHighPriority } from "react-icons/fc";
import { FcMediumPriority } from "react-icons/fc";
import { FcLowPriority } from "react-icons/fc";
import { toast } from "react-toastify";
import { ScrollToTop } from "../../../ScrollTotop";
import { useDispatch, useSelector } from "react-redux";
import { loading } from "../../../context/userSlice";
import LoadingSpinner from "../../Pages/LoadingSpinner";
import api from "../../../ApiInterceptor";
import { IoMdAddCircle } from "react-icons/io";
function Homesteads() {
  const user = useSelector((state) => state.user.user);
  const isAdmin = useSelector((state) => state.user.isAdmin);
  const isLoading = useSelector((state) => state.user.isLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [homesteads, sethomesteads] = useState([]);
  const [selectedHome, setselectedHome] = useState({});
  const handleAddHome = () => {
    navigate("/homesteads/add");
  };

  const columns = [
    {
      field: "_id",
      headerName: "Owner ID No",
      width: 250,
      renderCell: (params) => {
        return params.row.homesteadHead?.IDNo;
      },
    },
    {
      field: "location",
      headerName: "Location",
      width: 250,
    },
    {
      field: "createdAt",
      headerName: "Added On",
      type: Date,
      width: 250,
      renderCell: (params) => {
        const dateString = params.row.createdAt;
        const dateObj = new Date(dateString);
        const formattedDate = dateObj.toLocaleString();
        return formattedDate;
      },
    },
    {
      field: "homesteadHead",
      headerName: "Owner",
      width: 250,
      renderCell: (params) => {
        return params.row.homesteadHead?.name;
      },
    },
    {
      field: "inte",
      headerName: "Intervention",
      width: 250,
      renderCell: (params) => {
        return <Link to={`/compansation/view/${params.row._id}`}>View</Link>;
      },
    },
    {
      field: "",
      headerName: "Actions",
      width: 250,
      renderCell: (params) => {
        return (
          <>
            <>
              <MdDelete
                className="mx-2 action-icon-delete"
                onClick={() => {
                  setselectedHome(params.row);
                  handleShow();
                }}
              />
            </>

            <FaEye
              className="mx-2 action-icon-edit"
              onClick={() => {
                navigate(`/homestead/view/${params.row._id}`);
              }}
            />
          </>
        );
      },
    },
  ];
  const getHomesteads = async () => {
    try {
      dispatch(loading(true)); // Set loading state to true before fetching data
      const { data } = await api(user).get(`/homesteads`);
      sethomesteads(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(loading(false)); // Set loading state to false after fetching data
    }
  };
  useEffect(() => {
    getHomesteads();
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
  //delete homestead
  const deletehomesteadBtn = (home) => {
    dispatch(loading(true));
    api(user)
      .delete(`/homesteads/${home._id}`)
      .then((response) => {
        if (response.data) {
          notifySuccess(`Homestead Deleted`);
          handleClose();
          getHomesteads();
        }
        handleClose();
        dispatch(loading(false));
      })
      .catch((error) => {
        notifyError(error);
        dispatch(loading(false));
      });
  };
  const { pathname } = useLocation();
  //scroll to top when page loads
  useEffect(() => {
    ScrollToTop();
  }, [pathname]);
  return (
    <div className="pt-2 px-3">
      <div className="d-flex">
        <h4>Homesteads</h4>
        <Button
          className="btn mx-3 btn-rounded user-btn"
          variant="secondary"
          onClick={handleAddHome}
        >
          <IoMdAddCircle /> {""}New Homestead
        </Button>
      </div>
      <div>
        {isLoading ? (
          // Render the loading spinner while loading is true
          <LoadingSpinner />
        ) : (
          // Render the fetched data
          <>
            <DataGrid
              autoHeight
              className="product-table"
              getRowId={(row) => row._id}
              rows={homesteads}
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
              //	checkboxSelection
              disableRowSelectionOnClick
              //disableColumnSelector
              disableDensitySelector
            />
          </>
        )}
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Homestead Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body className="">
          <p className="text-danger emp">This action is ireversable.</p>
          <div className="form-group">
            <label className="control-label" htmlFor="catdesc">
              Home Owner:
            </label>
            <div className="col-md-12 mt-2">
              <input
                id="catdesc"
                name="catdesc"
                type="text"
                placeholder={selectedHome.homesteadHead?.name}
                className="form-control"
                disabled
              />
            </div>
          </div>
          <div className="form-group">
            <label className="control-label" htmlFor="catdesc">
              Location:
            </label>
            <div className="col-md-12 mt-2">
              <textarea
                id="catdesc"
                name="catdesc"
                type="text"
                placeholder={selectedHome.location}
                className="form-control"
                disabled
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            className="btn btn-danger"
            onClick={() => {
              deletehomesteadBtn(selectedHome);
            }}
          >
            Delete Homestead
          </Button>
          <Button
            variant="primary"
            className="btn btn-dark"
            onClick={() => {
              handleClose();
            }}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Homesteads;
