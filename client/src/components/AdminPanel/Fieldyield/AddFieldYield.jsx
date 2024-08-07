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
import { IoMdAddCircle } from 'react-icons/io';

function AddFieldYield({fieldID,refresh}) {
    const navigate = useNavigate();
	const isLoading = useSelector((state) => state.user.isLoading);
	const user = useSelector((state) => state.user.user);
	const dispatch = useDispatch();

    
	const validationSchema = Yup.object().shape({
		grossmargin: Yup.string().required('The Field is required').matches(/^\d.?\d*/, 'This field must be a valid number'),
		totalcost: Yup.string().required('The Field is required').matches(/^\d.?\d*/, 'This field must be a valid number'),
		yieldperhectare: Yup.string().required('The Field is required').matches(/^\d.?\d*/, 'This field must be a valid number'),
		costperhectare: Yup.string().required('The Field is required').matches(/^\d.?\d*/, 'This field must be a valid number'),
		priceperton: Yup.string().required('The Field is required').matches(/^\d.?\d*/, 'This field must be a valid number'),
		croptype: Yup.string().required('The Field is required'),
		
	});
	const formOptions = { resolver: yupResolver(validationSchema) };
	const { register, handleSubmit, reset, formState } = useForm(formOptions);
	const { errors } = formState;

	function onSubmit(data) {
		// submit form information when the validation checks have passed
		console.log(data);
		dispatch(loading(true));
		api(user)
			.post(`/fields/yield/${fieldID}`, {
				...data,fieldId:fieldID
			})
			.then((response) => {
				if (response.data?._id) {
					dispatch(loading(false));
					reset();
					notifySuccess('Yield Added.');
					refresh()
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
	
	
	return (
		<div>
		
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
															Field Yield Information
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
																				<label>Crop Type</label>
																				<input
																					name='croptype'
																					type='text'
																					{...register('croptype')}
																					className={`form-control ${errors.croptype ? 'is-invalid' : ''
																						}`}
																				/>
																				<div className='invalid-feedback'>
																					{errors.croptype?.message}
																				</div>
																			</div>
																		</div><div className='col-md-12'>
																			<div className='form-group'>
																				<label>Price Per Ton</label>
																				<input
																					name='priceperton'
																					type='text'
																					{...register('priceperton')}
																					className={`form-control ${errors.priceperton ? 'is-invalid' : ''
																						}`}
																				/>
																				<div className='invalid-feedback'>
																					{errors.priceperton?.message}
																				</div>
																			</div>
																			<div className='form-group'>
																				<label>Cost Per Hecture</label>
																				<input
																					name='costperhectare'
																					type='text'
																					{...register('costperhectare')}
																					className={`form-control ${errors.costperhectare ? 'is-invalid' : ''
																						}`}
																				/>
																				<div className='invalid-feedback'>
																					{errors.costperhectare?.message}
																				</div>
																			</div><div className='form-group'>
																				<label>Yield Per Hectare</label>
																				<input
																					name='yieldperhectare'
																					type='text'
																					{...register('yieldperhectare')}
																					className={`form-control ${errors.yieldperhectare ? 'is-invalid' : ''
																						}`}
																				/>
																				<div className='invalid-feedback'>
																					{errors.yieldperhectare?.message}
																				</div>
																			</div>
																		</div><div className='col-md-12'>
																			<div className='form-group'>
																				<label>Gross Margin</label>
																				<input
																					name='grossmargin'
																					type='text'
																					{...register('grossmargin')}
																					className={`form-control ${errors.grossmargin ? 'is-invalid' : ''
																						}`}
																				/>
																				<div className='invalid-feedback'>
																					{errors.grossmargin?.message}
																				</div>
																			</div>
																		</div> 
																		 <div className='col-md-12'>
																			<div className='form-group'>
																				<label>Total Cost</label>
																				<input
																					name='totalcost'
																					type='text'
																					{...register('totalcost')}
																					className={`form-control ${errors.totalcost ? 'is-invalid' : ''
																						}`}
																				/>
																				<div className='invalid-feedback'>
																					{errors.totalcost?.message}
																				</div>
																			</div>
																		</div>

																	</div>
																	
																</div>
															</div>

															<div className='row mt-2'>
																<div className='col d-flex justify-content-end'>
																	<button
																		className='btn btn-primary'
																		type='submit'
																	//onClick={addUserBtn}
																	>
																		Add Yield
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

export default AddFieldYield