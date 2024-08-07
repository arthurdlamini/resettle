import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ScrollToTop } from "../../../ScrollTotop";
import { useDispatch, useSelector } from "react-redux";
import api from "../../../ApiInterceptor";
import Spinner from "../../Pages/Spinner";
import { loading } from "../../../context/userSlice";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { FaAngleDown } from "react-icons/fa";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

function GravesRep() {
  //get user from global state
  const user = useSelector((state) => state.user.user);
  //get user id from url
  const isLoading = useSelector((state) => state.user.isLoading);
const navigate = useNavigate();
const dispatch = useDispatch();
const [graves, setGraves] = useState([]);
const cancelTokenRef = useRef();

	const getGraves = async () => {
		try {
			dispatch(loading(true)); // Set loading state to true before fetching data
			const { data } = await api(user).get('/graves', {
				cancelToken: cancelTokenRef.current.token,
			});
			setGraves(data);
			console.log(data)
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
		getGraves();
		//Clean up function
		return () => {
			cancelTokenRef.current.cancel('Component unmounted');
		};
	}, []);
	const columns = [{
		field: 'homesteadId',
		headerName: 'Home Owner',
		width: 200, renderCell: (params) => {
			return params.row.homesteadId?.homesteadHead?.name;
		},
	},
	{
		field: 'easthing',
		headerName: 'East',
		width: 200,
	}, {
		field: 'southing',
		headerName: 'South',

		width: 200,
	},
	{
		field: 'createdAt',
		headerName: 'Added on',
		renderCell: (params) => {
			const dateString = params.row.createdAt;
			const dateObj = new Date(dateString);
			const formattedDate = dateObj.toLocaleString();
			return formattedDate;
		},
		width: 200,
	},
	];
 
const relocatedTrue = graves.filter(item => item?.relocated === true);
const relocatedFalse = graves.filter(item => item?.relocated === false);
  const { pathname } = useLocation();
  //scroll to top when page loads
  useEffect(() => {
    ScrollToTop();
  }, [pathname]);
  
  return (
    <div>
      
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
                          <div className="text-sm-left mb-sm-0">
                            <h4 className="pt-sm-2 pb-1 mb-0 text-nowrap">
                               Graves Summary
                            </h4>
                          </div>
                        </div>
                        <div>
                          <Accordion>
                            <AccordionSummary
                              expandIcon={<FaAngleDown />}
                              aria-controls="panel1-content"
                              id="panel1-header"
                            >
                              <Typography>Relocated Graves</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            <DataGrid
                                  autoHeight
                                  className="product-table"
                                  getRowId={(row) => row._id}
                                  rows={relocatedTrue}
                                  columns={columns}
                                  pageSizeOptions={[10]}
                                  disableColumnSelector
                                  disableDensitySelector
                                  initialState={{
                                    pagination: {
                                      paginationModel: {
                                        pageSize: 10,
                                      },
                                    },
                                  }}
                                />
                                
                                <b className="text-success text-bold">Total: {relocatedTrue.length}</b>
                            </AccordionDetails>
                          </Accordion>
                          {true > 0 && (
                            <Accordion className="mt-1">
                              <AccordionSummary
                                expandIcon={<FaAngleDown />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                              >
                                <Typography>Not Relocated Graves</Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                {/* TO Filed yield table list */}
                                <DataGrid
                                  autoHeight
                                  className="product-table"
                                  getRowId={(row) => row._id}
                                  rows={relocatedFalse}
                                  columns={columns}
                                  
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
                                <b className="text-success text-bold">Total: {relocatedFalse.length}</b>
                              </AccordionDetails>
                            </Accordion>
                          )}
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

export default GravesRep;
