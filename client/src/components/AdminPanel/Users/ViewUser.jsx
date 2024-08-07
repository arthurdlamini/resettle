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
import { FaSync } from "react-icons/fa";

function ViewUser() {
	//get user from global state
	const user = useSelector((state) => state.user.user);
	const isAdmin = useSelector((state) => state.user.isAdmin);
	//get user id from url
	const userId = useParams().id;
	const isLoading = useSelector((state) => state.user.isLoading);

	const [name, setName] = useState();
	const [IDNo, setIDNo] = useState();
	const [phone, setPhone] = useState();
	const navigate = useNavigate();
	const [founduser, setUser] = useState({
		id: userId,
		createdAt: '',
		IDNo: '',
		name: '',
		phone: '',
	});
	const dispatch = useDispatch();

	const getUser = async () => {
		dispatch(loading(true));
		api(user)
			.get(`/person/${userId}`)
			.then((res) => {
				console.log(res);
				setUser({
					...founduser,
					createdAt: res.data.createdAt,
					IDNo: res.data.IDNo,
					modifiedAt: res.data.modifiedAt,
					name: res.data.name,
					phone: res.data.phone,
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
		e.preventDefault()
		dispatch(loading(true));
		api(user)
			.put(`/person/${userId}`, {
				name: name,
				IDNo: founduser.IDNo,
				phone: founduser.phone,

			})
			.then((response) => {
				console.log(response);
				if (response.data.modifiedCount > 0) {
					notifySuccess('Name Updated');
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
	//update IDNo
	const updateIDNo = (e) => {
		e.preventDefault()
		dispatch(loading(true));
		api(user)
			.put(`/person/${userId}`, {
				name: founduser.name,
				IDNo: IDNo,
				phone: founduser.phone,
			})
			.then((response) => {
				console.log(response);
				if (response.data.modifiedCount > 0) {
					notifySuccess('ID No Updated');
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
	//update Number
	const updateNumber = (e) => {
		e.preventDefault()
		dispatch(loading(true));
		api(user)
			.put(`/person/${userId}`, {
				name: founduser.name,
				IDNo: founduser.IDNo,
				phone: phone,
			})
			.then((response) => {
				console.log(response);
				if (response.data.modifiedCount > 0) {
					notifySuccess('Phone No Updated');
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
			<h4 className='text-center my-3'>
				<BsTicketDetailedFill className='mx-3 edit-icon' />
				View Home Owner Details
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

												<div className='col d-flex flex-column flex-sm-row justify-content-between mb-3'>
													<div className='text-sm-left mb-2 mb-sm-0'>
														<h4 className='pt-sm-2 pb-1 mb-0 text-nowrap'>
															Home Owner  Details
														</h4>
														<p className='mb-0 custom-control-label'>
															Full Name:{' '}
															<span className='text-success'>
																{founduser.name

																}

															</span>
														</p>
														<p className='mb-0 custom-control-label'>
															Phone No:{' '}
															<span className='text-success'>
																{founduser.phone

																}

															</span>
														</p><p className='mb-0 custom-control-label'>
															Idendity No:{' '}
															<span className='text-success'>
																{founduser.IDNo

																}

															</span>
														</p><p className='mb-0 custom-control-label'>
															Date Added:{' '}
															<span className='text-success'>
																{new Date(founduser.createdAt).toLocaleString()}

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
															<Typography>Edit Home Owner Details</Typography>
														</AccordionSummary>
														<AccordionDetails>
															<form
																className='form'
															>
																<div className='row '>
																	<div className='form-group col-md-12 col-lg-5'>
																		<label className='custom-control-label'>
																			Full Name:
																		</label><input

																			type='text'
																			className={`form-control `}
																			onChange={(e) => {
																				setName(e.target.value)
																			}}
																		/>
																	</div><div className='col d-flex justify-content-end aling-items-center'>
																		<button
																			className='btn btn-primary p-2 mt-2'
																			style={{ height: 'fit-content' }}
																			disabled={!name}
																			onClick={updateName}
																		>
																			Update user name
																		</button>
																	</div>
																</div>
																<div className='row mt-2'>
																	<div className='form-group col-md-12 col-lg-5'>
																		<label className='custom-control-label'>
																			ID Number:
																		</label><input
																			name='Easthing'
																			type='text'
																			className={`form-control `}
																			onChange={(e) => {
																				setIDNo(e.target.value)
																			}}
																		/>
																	</div>
																	<div className='col d-flex justify-content-end aling-items-center'>
																		<button
																			className='btn btn-primary p-2 mt-2'
																			style={{ height: 'fit-content' }}
																			disabled={!IDNo}
																			onClick={updateIDNo}
																		>
																			Update user ID no.
																		</button>
																	</div>
																</div>
																<div className='row mt-2'>
																	<div className='form-group col-md-12 col-lg-5'>
																		<label className='custom-control-label'>
																			Phone Number:
																		</label><input
																			name='Easthing'
																			type='text'
																			className={`form-control `}
																			onChange={(e) => {
																				setPhone(e.target.value)
																			}}
																		/>
																	</div>
																	<div className='col d-flex justify-content-end aling-items-center'>
																		<button
																			className='btn btn-primary p-2 mt-2'
																			style={{ height: 'fit-content' }}
																			disabled={!phone}
																			onClick={updateNumber}
																		>
																			Update user phone number
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

export default ViewUser;
