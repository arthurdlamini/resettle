import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import api from '../../ApiInterceptor';
import PasswordValidator from 'password-validator';
import { useDispatch, useSelector } from 'react-redux';
import { loading } from '../../context/userSlice';
import { useForm } from 'react-hook-form';
import Spinner from './Spinner';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

function ResetPasswordForm() {
	const navigate = useNavigate();
	const isLoading = useSelector((state) => state.user.isLoading);
	const dispatch = useDispatch();
	//get user id from url
	const { token, id } = useParams();
	const [user, setUser] = useState({
		token: '',
	});

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
	  });
	const formOptions = { resolver: yupResolver(validationSchema) };
	const { register, handleSubmit, reset, formState } = useForm(formOptions);
	const { errors } = formState;

	function onSubmit(data) {
        // submit form information when the validation checks have passed
		dispatch(loading(true));
		api(user)
			.post(`/users/passwordreset`, {
				userId: id,
				token: token,
				password: data.password,
			})
			.then((response) => {
				if (response.data.success) {
					dispatch(loading(false));
					notifySuccess('Password Reset Successfull.');
					setTimeout(() => {
						navigate('/login');
					}, 3000);
					console.log(response.data);
				} else {
					dispatch(loading(false));
					notifyError(response.data.data);
				}
			})
			.catch((error) => {
				dispatch(loading(false));
				notifyError(error.message);
				console.log(error);
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
												Create a new password and enjoy.
											</p>

											<form onSubmit={handleSubmit(onSubmit)}>
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
												<button
													type='submit'
													className='btn btn-theme mt-2'
													>
													Reset Password
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
					</div>
				</div>
			</div>
		</div>
	);
}

export default ResetPasswordForm;
