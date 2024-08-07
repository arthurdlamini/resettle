import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser, setAdmin, loading } from '../../context/userSlice';
import { LuEye } from 'react-icons/lu';
import { FiEyeOff } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import Spinner from './Spinner';
import api from '../../ApiInterceptor';

function Login() {
	let location = useLocation();
	let { from } = location.state || { from: { pathname: "/" } }; // default to redirect to home if no location state is provided

	const isLoading = useSelector((state) => state.user.isLoading);
	const dispatch = useDispatch();
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();
	const [userData, setUserData] = useState({
		email: '',
		password: '',
	});
	const [user, setInitUser] = useState({
		token: '',
	});

	const handleLoginUser = (e) => {
		dispatch(loading(true))
		e.preventDefault();
		try {
			// Set loading state to true before fetching data
			dispatch(loading(true))
			api(user)
				.post(`/users/login`, {
					email: userData.email,
					password: userData.password,
				})
				.then((response) => {

					if (response.data.success) {
						dispatch(loading(false))

						notifySuccess('Succesfully Logged In');

						// set currently loggedin user state
						dispatch(setUser(response.data.data));

						if (response.data.data.role === 'Admin') {
							//if is admin user set state
							dispatch(setAdmin(response.data.data));
						}
						navigate(from.pathname);
					} else {
						notifyError('Login Error.. Try Again');
						console.log(response.data);
						dispatch(loading(false))
					}
				})
				.catch((error) => {
					notifyError(error.message);
					console.log(error);
					dispatch(loading(false))
				});
		} catch (error) {
			console.error(error);
			dispatch(loading(false))
		}
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

	return (
		<div className='login-div py-5'>
			{isLoading ? (
				// Render the loading spinner while loading is true
				<Spinner />

			) : (
				// Render the fetched data
				<>

				</>
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
												<h3 className='h4 font-weight-bold text-theme'>Login</h3>
											</div>
											<h6 className='h5 mb-0'>Welcome back!</h6>
											<p className='text-muted mt-2 mb-2'>
												Enter your email address and password to gain access to
												the system.
											</p>
											<form>
												<div className='form-group'>
													<label htmlFor='exampleInputEmail1'>Email address</label>
													<input
														type='email'
														className='form-control'
														id='exampleInputEmail1'
														value={userData.email}
														onChange={(e) => {
															setUserData({
																...userData,
																email: e.target.value,
															});
														}}
													/>
												</div>
												<div className='form-group mb-5'>
													<label htmlFor='exampleInputPassword1'>
														Password
													</label>
													<div className='input-group'>
														<input
															type={showPassword ? 'text' : 'password'}
															className='form-control'
															id='exampleInputPassword1'
															value={userData.password}
															onChange={(e) => {
																setUserData({
																	...userData,
																	password: e.target.value,
																});
															}}
														/>
														<div className='input-group-prepend'>
															<button
																className='btn'
																type='button'
																onClick={() => setShowPassword(!showPassword)}>
																{showPassword ? <FiEyeOff /> : <LuEye />}
															</button>
														</div>
													</div>
												</div>
												<button
													type='submit'
													className='btn btn-theme'
													onClick={(e) => {
														//	setLoading(true)
														handleLoginUser(e)
													}}>
													Login
												</button>
												<Link
													to='/reset-password'
													className='forgot-link float-right text-primary text-right mx-5'>
													Forgot password?
												</Link>
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
							Don't have an account?{' '}
							<Link to='/register' className='text-primary ml-1'>
								Register
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
