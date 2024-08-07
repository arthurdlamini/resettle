import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loading } from '../../context/userSlice';
import Spinner from './Spinner';
import api from '../../ApiInterceptor';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

function Register() {

	const navigate = useNavigate();
	const isLoading = useSelector((state) => state.user.isLoading);
	const dispatch = useDispatch();
	const [user, setUser] = useState({
		token: '',
	});
	
	function onSubmit(data) {
		// submit form information when the validation checks have passed
		console.log(data);
		dispatch(loading(true));
		api(user)
			.post(`/users/register`, {
				name: data.name,
				email: data.email,
				password: data.password,
			})
			.then((response) => {
				if (response.data.success) {
					dispatch(loading(false));
					notifySuccess('User Account Created.');
					
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
	const validationSchema = Yup.object().shape({
		password: Yup.string()
			.required('Password is required')
			 .matches(
			 	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/,
			 	'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character'
			 ),
		confirmPassword: Yup.string()
			.required('Confirm Password is required')
			.oneOf([Yup.ref('password')], 'Passwords do not match'),
		email: Yup.string().required('Email is required'),
		name: Yup.string().required('Name is required'),
	});
	const formOptions = { resolver: yupResolver(validationSchema) };
	const { register, handleSubmit, reset, formState } = useForm(formOptions);
	const { errors } = formState;

	return (
		<div className='register-div  py-5'>
			{isLoading ? (
				// Render the loading spinner while loading is true
				<Spinner />
			) : (
				// Render the fetched data
				<></>
			)}
			<div id='main-wrapper' className='container'>
				<div class='row justify-content-center'>
					<div class='col-xl-10'>
						<div class='card border-0'>
							<div class='card-body p-0'>
								<div class='row no-gutters'>
									<div class='col-lg-6'>
										<div class='p-5'>
											<div class='mb-2'>
												<h3 class='h4 font-weight-bold text-theme'>
													Create Account
												</h3>
											</div>
											<p class='text-muted mt-2 mb-2'>
												Fill in the form and create account to gain access to
												the system.
											</p>
											<form onSubmit={handleSubmit(onSubmit)}>
												<div className='form-group col'>
													<label>Full Name</label>
													<input
														name='fullname'
														type='text'
														{...register('name')}
														className={`form-control ${
															errors.name ? 'is-invalid' : ''
														}`}
													/>
													<div className='invalid-feedback'>
														{errors.name?.message}
													</div>
												</div>
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
												
												<div>
													<div className='form-group col'>
														<label>Password</label>
														<input
															name='password'
															type='password'
															{...register('password')}
															className={`form-control ${
																errors.password ? 'is-invalid' : ''
															}`}
														/>
														<div className='invalid-feedback'>
															{errors.password?.message}
														</div>
													</div>
													<div className='form-group col'>
														<label>Confirm Password</label>
														<input
															name='confirmPassword'
															type='password'
															{...register('confirmPassword')}
															className={`form-control ${
																errors.confirmPassword ? 'is-invalid' : ''
															}`}
														/>
														<div className='invalid-feedback'>
															{errors.confirmPassword?.message}
														</div>
													</div>
												</div>
												<button
													type='submit'
													className='btn btn-primary btn-block mt-2'
													//onClick={handleRegisterUser}
												>
													Create Account
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
							Already have an account?{' '}
							<Link to='/login' className='text-primary ml-1'>
								Login
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Register;
