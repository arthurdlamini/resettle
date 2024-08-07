import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { MdPersonAdd } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { loading, logoutUser } from '../../../context/userSlice';
import Spinner from '../../Pages/Spinner';
import api from '../../../ApiInterceptor';
import { ScrollToTop } from '../../../ScrollTotop';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { RiFolderAddFill } from 'react-icons/ri';

function AddGrave() {
	const navigate = useNavigate();
	const isLoading = useSelector((state) => state.user.isLoading);
	const user = useSelector((state) => state.user.user);
	const dispatch = useDispatch();
	const [homestead, setHomestead] = useState([]);


	const validationSchema = Yup.object().shape({
		southing: Yup.string().required('The Field is required').matches(/^\d.?\d*/, 'Southing must be a valid number'),
		easthing: Yup.string().required('The Field is required').matches(/^\d.?\d*/, 'Easting must be a valid number'),
		homesteadId: Yup.string().required('The Field is required'),
	});
	const formOptions = { resolver: yupResolver(validationSchema) };
	const { register, handleSubmit, reset, formState } = useForm(formOptions);
	const { errors } = formState;

	function onSubmit(data) {
		// submit form information when the validation checks have passed
		console.log(data);
		dispatch(loading(true));
		api(user)
			.post(`/graves`, {
				...data
			})
			.then((response) => {
				if (response.data?._id) {
					dispatch(loading(false));
					reset();
					notifySuccess('Grave Added.');
					navigate('/graves/');
				} else {
					notifyError("Not Added");
					dispatch(loading(false));
				}
			})
			.catch((error) => {
				notifyError(error);
				dispatch(loading(false));
			});
	}
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
	//Manage users

	//scroll to top when page loads
	const { pathname } = useLocation();
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
				<RiFolderAddFill className='mx-3 edit-icon' />
				Add New Grave
			</h4>
			<div>
				{isLoading && (
					// Render the loading spinner while loading is true
					<Spinner />
				)}
				<div className='container'>
					<div className='row flex-lg-nowrap'>
						<div className='col'>
							<div className='row'>
								<div className='col mb-3'>
									<div className='card'>
										<div className='card-body'>
											<div className='e-profile'>
												<ul className='nav nav-tabs'>
													<li className='nav-item'>
														<div href='' className='active nav-link'>
															Grave Information
														</div>
													</li>
												</ul>
												<div className='tab-content pt-3'>
													<div className='tab-pane active'>
														<form
															className='form'
															onSubmit={handleSubmit(onSubmit)}>
															<div className='row mt-2'>
																<div className='col'>
																	<div className='row'>
																		<div className='col-md-12'>
																			<div className='form-group'>
																				<label>Southing</label>
																				<input
																					name='southing'
																					type='text'
																					{...register('southing')}
																					className={`form-control ${errors.southing ? 'is-invalid' : ''
																						}`}
																				/>
																				<div className='invalid-feedback'>
																					{errors.southing?.message}
																				</div>
																			</div>
																		</div><div className='col-md-12'>
																			<div className='form-group'>
																				<label>Easthing</label>
																				<input
																					name='easthing'
																					type='text'
																					{...register('easthing')}
																					className={`form-control ${errors.easthing ? 'is-invalid' : ''
																						}`}
																				/>
																				<div className='invalid-feedback'>
																					{errors.easthing?.message}
																				</div>
																			</div>
																		</div>

																	</div>
																	<div className='form-group  '>
																		<label htmlFor='homesteadId'>Homestead Owner</label>
																		{homestead && (
																			<select
																				className={`form-select ${errors.homesteadId ? 'is-invalid' : ''}`}
																				{...register('homesteadId')}
																				name='homesteadId'
																				aria-label='user role'
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
																		<div className='invalid-feedback'>{errors.homesteadId?.message}</div>
																	</div>
																</div>
															</div>

															<div className='row mt-2'>
																<div className='col d-flex justify-content-end gap-3'>
																<button
                                    className="btn btn-danger"
                                    onClick={() => {
                                      navigate(-1);
                                    }}
                                  >
                                    Back
                                  </button>
																	<button
																		className='btn btn-primary'
																		type='submit'
																	//onClick={addUserBtn}
																	>
																		Add Grave
																	</button>
																</div>
															</div>
														</form>
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
		</div>
	);
}

export default AddGrave;
