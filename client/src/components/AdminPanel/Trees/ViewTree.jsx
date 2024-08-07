import React, { useEffect, useState } from 'react';
import { BsArrow90DegDown, BsTicketDetailedFill } from 'react-icons/bs';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ScrollToTop } from '../../../ScrollTotop';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../../ApiInterceptor';
import Spinner from '../../Pages/Spinner';
import { loading } from '../../../context/userSlice';
import { FileIcon, defaultStyles } from 'react-file-icon';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { FaAngleDown } from "react-icons/fa";

function ViewTree() {
	//get user from global state
	const user = useSelector((state) => state.user.user);
	const isAdmin = useSelector((state) => state.user.isAdmin);
	//get user id from url
	const treeId = useParams().id;
	const isLoading = useSelector((state) => state.user.isLoading);

  
	const [relocated, setRelocated] = useState(true);
	const [homestead, setHomestead] = useState([]);
	const [homesteadid, setHomesteadid] = useState();
	const [condition, setCondition] = useState();
	const [number, setNumber] = useState();
	const [size, setSize] = useState();
	const [type, setType] = useState();
	const navigate = useNavigate();
	const [tree, setTree] = useState({
		id: treeId,
		homesteadHead: {},
		createdAt: '',
		condition: '',
		number: '',
		size: '',
		relocated:"",
		type: ''
	});
	const dispatch = useDispatch();

	const getTree = async () => {
		dispatch(loading(true));
		api(user)
			.get(`/trees/${treeId}`)
			.then((res) => {
				console.log(res);
				setTree({
					...tree,
					homesteadHead: res.data.homesteadId,
					createdAt: res.data.createdAt,
					condition: res.data.condition,
					modifiedAt: res.data.modifiedAt,
					number: res.data.number,
					type: res.data.type,
					size: res.data.size,
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
		getTree();
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

	
	//update tree homestead
	const updateTreeHomestead = (e) => {
		e.preventDefault()
		dispatch(loading(true));
		api(user)
			.put(`/trees/${treeId}`, {
				type: tree.type,
				condition: tree.condition,
				homesteadId: homesteadid,
				size: tree.size,
				number: tree.number
			})
			.then((response) => {
				console.log(response);
				if (response.data.modifiedCount > 0) {
					notifySuccess('Homestead Updated');
					getTree();
					setHomesteadid('');
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
	const updateTreeCondition = (e) => {
		e.preventDefault()
		dispatch(loading(true));
		api(user)
			.put(`/trees/${treeId}`, {
				type: tree.type,
				condition: condition,
				homesteadId: tree.homesteadHead?._id,
				size: tree.size,
				number: tree.number
			})
			.then((response) => {
				console.log(response);
				if (response.data.modifiedCount > 0) {
					notifySuccess('Condition Updated');
					getTree();
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
//update tree type
const updateTreeType = (e) => {
	e.preventDefault()
	dispatch(loading(true));
	api(user)
		.put(`/trees/${treeId}`, {
			type: type,
			condition: tree.condition,
			homesteadId: tree.homesteadHead?._id,
			size: tree.size,
			number: tree.number
		})
		.then((response) => {
			console.log(response);
			if (response.data.modifiedCount > 0) {
				notifySuccess('Tree type Updated');
				getTree();
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
//update tree size
const updateTreeSize = (e) => {
	e.preventDefault()
	dispatch(loading(true));
	api(user)
		.put(`/trees/${treeId}`, {
			type: tree.type,
			condition: tree.condition,
			homesteadId: tree.homesteadHead?._id,
			size: size,
			number: tree.number
		})
		.then((response) => {
			console.log(response);
			if (response.data.modifiedCount > 0) {
				notifySuccess('Tree size Updated');
				getTree();
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
//update tree number
const updateTreeNumber = (e) => {
	e.preventDefault()
	dispatch(loading(true));
	api(user)
		.put(`/trees/${treeId}`, {
			type: tree.type,
			condition: tree.condition,
			homesteadId: tree.homesteadHead?._id,
			size: tree.size,
			number: number
		})
		.then((response) => {
			console.log(response);
			if (response.data.modifiedCount > 0) {
				notifySuccess('No of trees Updated');
				getTree();
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
};//update tree relocation
const updateRelocation = (e) => {
	e.preventDefault()
	dispatch(loading(true));
	api(user)
		.put(`/trees/${treeId}`, {
			relocated
		})
		.then((response) => {
			console.log(response);
			if (response.data.modifiedCount > 0) {
				notifySuccess('Relocation Status Updated');
				getTree();
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
		const extension = file.filename.split('.').pop().toLowerCase();

		// Other file types (using react-file-icon)
		return (
			<div
				key={index}
				className='file-item pt-2'
				style={{ width: '50px' }}
				onClick={() => { }}>
				<FileIcon extension={extension} {...defaultStyles[extension]} />
				<span
					style={{
						width: '100%',
						display: 'block',
						whiteSpace: 'nowrap',
						overflow: 'hidden',
						textOverflow: 'ellipsis',
					}}>
					{file.filename}
				</span>
				<a
					href={file?.secure_url}
					className='mt-5 text-success'
					target='_blank'
					style={{ textDecoration: 'none' }}
					rel='noreferrer'>
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
			<h4 className='text-center my-3'>
				<BsTicketDetailedFill className='mx-3 edit-icon' />
				View Tree Details
			</h4>
			{isLoading && (
				// Render the loading spinner while loading is true
				<Spinner />
			)}
			<div className='container'>
				<div className='row flex-lg-nowrap'>
					<div className='col-md-12 col-sm-12'>
						<div className='row'>
							<div className='col mb-3'>
								<div className='card'>
									<div className='card-body'>
										<div className='e-profile'>
											<div className='row'>
												{tree.image == null || tree.image === '' ? (
													<></>
												) : (
													<>
														<div className='col-12 col-sm-auto mb-3'>
															<div className='mx-auto' style={{ width: 140 }}>
																<div
																	className='d-flex justify-content-center align-items-center rounded'
																	style={{
																		height: 140,
																		backgroundColor: 'rgb(233, 236, 239)',
																	}}>
																	<span
																		style={{
																			color: 'rgb(166, 168, 170)',
																			font: 'bold 8pt Arial',
																		}}>
																		<img
																			src={tree.image}
																			alt='ticket'
																			style={{
																				objectFit: 'contain',
																				width: '100%',
																			}}
																		/>
																	</span>
																</div>
															</div>
														</div>
													</>
												)}

												<div className='col d-flex flex-column flex-sm-row justify-content-between mb-3'>
													<div className='text-sm-left mb-2 mb-sm-0'>
														<h4 className='pt-sm-2 pb-1 mb-0 text-nowrap'>
															Tree  Details
														</h4>
														<p className='mb-0 custom-control-label'>
															Condition:{' '}
															<span className='text-success'>
																{tree.condition

																}

															</span>
														</p>
														<p className='mb-0 custom-control-label'>
															Size:{' '}
															<span className='text-success'>
																{tree.size

																}

															</span>
														</p><p className='mb-0 custom-control-label'>
															Type:{' '}
															<span className='text-success'>
																{tree.type

																}

															</span>
														</p><p className='mb-0 custom-control-label'>
															Number of trees:{' '}
															<span className='text-success'>
																{tree.number

																}

															</span>
														</p><p className='mb-0 custom-control-label'>
															Relocated:{' '}
															<span className='text-success'>
																{tree.relocated===true?"Yes":"No"

																}

															</span>
														</p><p className='mb-0 custom-control-label'>
															Date Added:{' '}
															<span className='text-success'>
																{new Date(tree.createdAt).toLocaleString()}

															</span>
														</p>

													</div>
													<div className=' text-sm-right custom-control-label'>
														Homestead Head:{' '}
														<span className='text-success'>

															<span>{tree.homesteadHead?.homesteadHead?.name}</span>
														</span>

														<div className='text-muted'>
															<small>
																ID No:{' '}
																<span className='text-success'>
																	{tree.homesteadHead?.homesteadHead?.IDNo}
																</span>
															</small>
														</div><div className='text-muted'>
															<small>
																Phone No:{' '}
																<span className='text-success'>
																	{tree.homesteadHead?.homesteadHead?.phone}
																</span>
															</small>
														</div><div className='text-muted'>
															<small>
																Location:{' '}
																<span className='text-success'>
																	{tree.homesteadHead?.location}
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
															<Typography>Edit Tree Details</Typography>
														</AccordionSummary>
														<AccordionDetails>
															<form
																className='form'
															>
																<div className='row '>
																	<div className='form-group col-md-12 col-lg-5'>
																		<label className='custom-control-label'>
																			Conditon:
																		</label><input

																			type='text'
																			className={`form-control `}
																			onChange={(e) => {
																				setCondition(e.target.value)
																			}}
																		/>
																	</div><div className='col d-flex justify-content-end aling-items-center'>
																		<button
																			className='btn btn-primary p-2 mt-2'
																			style={{ height: 'fit-content' }}
																			disabled={!condition}
																		 onClick={updateTreeCondition}
																		>
																			Update
																		</button>
																	</div>
																</div>
																<div className='row mt-2'>
																	<div className='form-group col-md-12 col-lg-5'>
																		<label className='custom-control-label'>
																			Type:
																		</label><input
																			name='Easthing'
																			type='text'
																			className={`form-control `}
																			onChange={(e) => {
																				setType(e.target.value)
																			}}
																		/>
																	</div>
																	<div className='col d-flex justify-content-end aling-items-center'>
																		<button
																			className='btn btn-primary p-2 mt-2'
																			style={{ height: 'fit-content' }}
																			disabled={!type}
																		 onClick={updateTreeType}
																		>
																			Update
																		</button>
																	</div>
																</div><div className='row mt-2'>
																	<div className='form-group col-md-12 col-lg-5'>
																		<label className='custom-control-label'>
																			Size:
																		</label><input
																			name='Easthing'
																			type='text'
																			className={`form-control `}
																			onChange={(e) => {
																				setSize(e.target.value)
																			}}
																		/>
																	</div>
																	<div className='col d-flex justify-content-end aling-items-center'>
																		<button
																			className='btn btn-primary p-2 mt-2'
																			style={{ height: 'fit-content' }}
																			disabled={!size}
																		 onClick={updateTreeSize}
																		>
																			Update
																		</button>
																	</div>
																</div><div className='row mt-2'>
																	<div className='form-group col-md-12 col-lg-5'>
																		<label className='custom-control-label'>
																			Number of trees:
																		</label><input
																			name='Easthing'
																			type='text'
																			className={`form-control `}
																			onChange={(e) => {
																				setNumber(e.target.value)
																			}}
																		/>
																	</div>
																	<div className='col d-flex justify-content-end aling-items-center'>
																		<button
																			className='btn btn-primary p-2 mt-2'
																			style={{ height: 'fit-content' }}
																			disabled={!number}
																		 onClick={updateTreeNumber}
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
																<div className='row mt-2'>
																	<div className='form-group  col-md-12 col-lg-5'>
																		<label className='custom-control-label'>Homestead Owner</label>
																		{homestead && (
																			<select
																				className={`form-select`}
																				name='homesteadId'
																				aria-label='user role'
																				onChange={(e) => {
																					setHomesteadid(e.target.value)
																				}}
																			><option value='' defaultValue>
																					Select Owner
																				</option>
																				{homestead?.map((item) => (
																					<option value={item._id} key={item._id}>
																						{item.homesteadHead?.name} - {item.homesteadHead?.IDNo}
																					</option>
																				))}
																			</select>
																		)}

																	</div><div className='col d-flex justify-content-end aling-items-center'>
																		<button
																			className='btn btn-primary btn-block p-2 mt-2'
																			style={{ height: 'fit-content' }}
																			disabled={!homesteadid}
																			onClick={updateTreeHomestead}
																		>
																			Update
																		</button>
																	</div>
																</div>
															</form>
														</AccordionDetails>
													</Accordion>
												</div>
												<span className='row mt-2'>
													<span className='col d-flex justify-content-end aling-items-center'>
														<button
															className='btn btn-danger'
															onClick={() => {
																navigate(-1);
															}}>
															Back
														</button>{' '}
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

export default ViewTree;
