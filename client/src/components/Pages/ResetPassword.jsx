import { Link } from 'react-router-dom';

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import { useDispatch, useSelector } from 'react-redux';
import { loading } from '../../context/userSlice';
import Spinner from './Spinner';
import api from '../../ApiInterceptor';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';

function ResetPassword() {

	const navigate = useNavigate();
	const isLoading = useSelector((state) => state.user.isLoading);
	const dispatch = useDispatch();
	const [userData, setUserData] = useState({
		email: '',
	});

	const [user, setUser] = useState({
		token: '',
	});

	const validationSchema = Yup.object().shape({
		email: Yup.string()
		.required('Email is required')
	});
	
	const formOptions = { resolver: yupResolver(validationSchema) };
	const { register, handleSubmit, reset, formState } = useForm(formOptions);
	const { errors } = formState;

	function onSubmit(data) {
        // submit form information when the validation checks have passed
		dispatch(loading(true));
		api(user)
			.post(`/users/resetpassword`, {
				email: data.email,
			})
			.then((response) => {
				if (response.data.success) {
					dispatch(loading(false));
					notifySuccess('Reset password link has been sent to your email.');
					setTimeout(() => {
						navigate('/login');
					}, 3000);
				} else {
					notifyError(response.data.data);
					
					dispatch(loading(false));
				}
			})
			.catch((error) => {
				notifyError(error.message);
				console.log(error);
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

	return (
		<div className='login-div py-5'>
			{isLoading ? (
				// Render the loading spinner while loading is true
				<Spinner />
			) : (
				// Render the fetched data
				<></>
			)}
			<div id='main-wrapper' className='container'>
				<div className='row justify-content-center'>
					<div className='col-xl-10'>
						<div className='card border-0'>
							<div className='card-body p-0'>
								<div className='row no-gutters'>
									<div className='col-lg-6'>
										<div className='p-5'>
											<div className='mb-2'>
												<h3 className='h4 font-weight-bold text-theme'>
													Reset Password
												</h3>
											</div>
											<p className='text-muted mt-2 mb-2'>
												Enter your email address and we will send a link to your
												email.
											</p>
											<form onSubmit={handleSubmit(onSubmit)}>
												<div className='form-group col'>
													<label>Email Address</label>
													<input
														name='email'
														type='email'
														{...register('email')}
														className={`form-control ${
															errors.email ? 'is-invalid' : ''
														}`}
													/>
													<div className='invalid-feedback'>
														{errors.email?.message}
													</div>
												</div>
												<button
													type='submit'
													className='btn btn-theme mt-2'
													//onClick={handleResetPassword}
													>
													Send Reset Password Link
												</button>
											</form>
										</div>
									</div>

									<div className='col-lg-6 d-none d-lg-inline-block'>
										<div className='account-block rounded-right'>
											<div className='overlay rounded-right'></div>
											<div className='account-testimonial mt-0'>
												<div className='bbra mt-0'>
												<h4 className='brandname'>
														<span className='my'>Ewade</span>
														<span className='s'>R</span>
														<span className='darkgrey'>esettlement</span>
														<span className='d'>S</span>
														<span className='darkgrey'>ystem</span>
													</h4>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<p className='text-center mt-3 mb-0 text-footer-auth'>
							Back to login?{' '}
							<Link to='/login' className='text-primary ml-1'>
								Click here
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ResetPassword;
