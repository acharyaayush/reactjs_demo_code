import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { withRouter, Link, Redirect } from 'react-router-dom';
import EyeInvisibleIcon from '../../../Assets/Icons/EyeInvisibleIcon';
import EyeVisibleIcon from '../../../Assets/Icons/EyeVisibleIcon';
import Logo from '../../../Assets/Images/logo-black.png';
import axios from '../axios/axios';
import store from 'store';
import { message, Button } from 'antd';
import { errorNotify, internalErrorNotify } from '../helpers/notiication';

const LoginCustomer = (props) => {
	//defining states
	const [passwordToggle, setPasswordToggle] = useState(false); //for password
	const [loading, setLoading] = useState(false); //Loader state

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	useEffect(() => {
		if (store.get('hhr_token')) {
			props.history.push('/my-account');
		}
	}, []); //Will Load on only for once

	const onSubmit = (data) => {
		setLoading(true);
		var bodyFormData = new FormData();
		bodyFormData.append('email', data.email);
		bodyFormData.append('password', data.password);
		axios
			.post('login', bodyFormData)
			.then((res) => {
				if (res.data.status === '200') {
					store.set('hhr_token', res.data.data.token);
					props.history.push('/book-table');
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
	};

	return (
		<div>
			<div className='headerBorder'></div>
			<div className='container mb-30 mt-60'>
				<div className='signinLogo'>
					<img src={Logo} alt='logo-black' />
				</div>

				<div className='signForm mt-30'>
          //Login Form
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className='form-group px-30'>
							<p className='formLabel'>Email</p>
							<input
								className='form-control style_2'
								type='email'
								{...register('email', {
									required: '*This field is required',
								})}
							/>
              //this will show when any error occurs
							{errors.email && (
								<span className='input-error'>{errors.email.message}</span>
							)}
						</div> 
						<div className='form-group px-30'>
							<p className='formLabel'>Password</p>
							<div className='passwithicon'>
								<input
									className='form-control style_2'
									type={passwordToggle ? 'text' : 'password'}
									{...register('password', {
										required: '*This field is required',
									})}
								/>
								{errors.password && (
									<span className='input-error'>{errors.password.message}</span>
								)}
								{!passwordToggle ? (
									<EyeVisibleIcon onClick={() => setPasswordToggle(true)} />
								) : (
									<EyeInvisibleIcon onClick={() => setPasswordToggle(false)} />
								)}
							</div>
							<p className='text-end mb-0 mt-5'>
								<Link to='/forgot-password'>Forgot Password?</Link>
							</p>
						</div>

						<div className='d-grid mt-30'>
							<Button
								loading={loading}
								type='primary'
								className='btn btn-primary'
								size='large'
								htmlType='submit'
							>
								Log in
							</Button>
							<p className='mx-auto mt-2'>
								Need an Account?{' '}
								<Link to='/signup' style={{ color: '#526BF3' }}>
									<u>Register Here</u>
								</Link>
							</p>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default withRouter(LoginCustomer);
