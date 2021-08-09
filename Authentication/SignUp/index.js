import { Button } from 'antd';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { withRouter, Link } from 'react-router-dom';
import EyeInvisibleIcon from '../../../Assets/Icons/EyeInvisibleIcon';
import EyeVisibleIcon from '../../../Assets/Icons/EyeVisibleIcon';
import Logo from '../../../Assets/Images/logo-black.png';
import axios from '../axios/axios';
import {
	errorNotify,
	internalErrorNotify,
	successNotify,
} from '../helpers/notiication';

const Signup = (props) => {
	//defining states
	const [newPasswordToggle, setNewPasswordToggle] = useState(false); //for password
	const [confirmPasswordToggle, setConfirmPasswordToggle] = useState(false); //for password
	const [loading, setLoading] = useState(false); //Loader state
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm(); // for form validation

	const onSubmit = (data) => {
		if (data.password !== data.confirmPassword) {
			setError('confirmPassword', {
				type: 'manual',
				message: 'Both password should be same',
			});
		} else {
			setLoading(true);
			var bodyFormData = new FormData();
			bodyFormData.append('first_name', data.firstName);
			bodyFormData.append('last_name', data.lastName);
			bodyFormData.append('email', data.email);
			bodyFormData.append('password', data.password);
			bodyFormData.append('city', data.city);
			axios
				.post('register', bodyFormData)
				.then((res) => {
					if (res.data.status === '200') {
						successNotify(res.data.message);
						props.history.push('/signin-customer');
					} else if (res.data.status === '201') {
						errorNotify(res.data.message);
					} else {
						internalErrorNotify();
					}
					setLoading(false);
				})
				.catch(() => {
					internalErrorNotify();
					setLoading(false);
				});
		}
	};

	return (
		<div>
			<div className='headerBorder'></div>
			<div className='container mb-30 mt-60 pb-50'>
				<div className='signinLogo'>
					<img src={Logo} alt='logo-black' />
				</div>
				<div className='signupForm mt-50'>
					<h3 className='text-center'>Sign Up</h3>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className='row'>
							<div className='col-sm-6'>
								<div className='form-group'>
									<p className='formLabel'>E-mail</p>
									<input
										className='form-control'
										type='email'
										{...register('email', {
											required: '*This field is required',
										})}
									/>
									{errors.email && (
										<span className='input-error'>{errors.email.message}</span>
									)}
								</div>
							</div>
							<div className='col-sm-6'>
								<div className='form-group'>
									<p className='formLabel'>City</p>
									<input
										className='form-control'
										type='text'
										{...register('city', {
											required: '*This field is required',
										})}
									/>
									{errors.city && (
										<span className='input-error'>{errors.city.message}</span>
									)}
								</div>
							</div>
						</div>

						<div className='row'>
							<div className='col-sm-6'>
								<div className='form-group'>
									<p className='formLabel'>First name</p>
									<input
										className='form-control'
										type='text'
										{...register('firstName', {
											required: '*This field is required',
										})}
									/>
									{errors.firstName && (
										<span className='input-error'>
											{errors.firstName.message}
										</span>
									)}
								</div>
							</div>
							<div className='col-sm-6'>
								<div className='form-group'>
									<p className='formLabel'>Last name</p>
									<input
										className='form-control'
										type='text'
										{...register('lastName', {
											required: '*This field is required',
										})}
									/>
									{errors.lastName && (
										<span className='input-error'>
											{errors.lastName.message}
										</span>
									)}
								</div>
							</div>
						</div>

						<div className='row'>
							<div className='col-sm-6'>
								<div className='form-group'>
									<p className='formLabel'>Password</p>
									<div className='passwithicon'>
										<input
											className='form-control'
											type={newPasswordToggle ? 'text' : 'password'}
											{...register('password', {
												required: '*This field is required',
											})}
										/>
										{errors.password && (
											<span className='input-error'>
												{errors.password.message}
											</span>
										)}
										{!newPasswordToggle ? (
											<EyeVisibleIcon
												onClick={() => setNewPasswordToggle(true)}
											/>
										) : (
											<EyeInvisibleIcon
												onClick={() => setNewPasswordToggle(false)}
											/>
										)}
									</div>
								</div>
							</div>
							<div className='col-sm-6'>
								<div className='form-group'>
									<p className='formLabel'>Confirm Password</p>
									<div className='passwithicon'>
										<input
											className='form-control'
											type={confirmPasswordToggle ? 'text' : 'password'}
											{...register('confirmPassword', {
												required: '*This field is required',
											})}
										/>
										{errors.confirmPassword && (
											<span className='input-error'>
												{errors.confirmPassword.message}
											</span>
										)}
										{!confirmPasswordToggle ? (
											<EyeVisibleIcon
												onClick={() => setConfirmPasswordToggle(true)}
											/>
										) : (
											<EyeInvisibleIcon
												onClick={() => setConfirmPasswordToggle(false)}
											/>
										)}
									</div>
								</div>
							</div>
						</div>

						<p className='text-center'>
							By proceeding, you agree to the{' '}
							<Link to='#'>Terms and Conditions</Link>
						</p>

						<div className='d-grid mt-30 mb-10'>
							<Button
								loading={loading}
								type='primary'
								className='btn btn-primary large-btn'
								size='large'
								htmlType='submit'
							>
								Create account
							</Button>
						</div>
						<p className='text-center'>
							Already have an account?{' '}
							<Link to='/signin-customer'>
								<u>Log in</u>
							</Link>
						</p>
					</form>
				</div>
			</div>
		</div>
	);
};

export default withRouter(Signup);
