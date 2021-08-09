import { useState } from 'react';
import { Button } from 'antd';
import axios from '../../../axios';
import { useForm } from 'react-hook-form';
import { withRouter, Link } from 'react-router-dom';
import ArrowLeftIcon from '../../../Assets/Icons/ArrowLeftIcon';
import {
	errorNotify,
	internalErrorNotify,
	successNotify,
} from '../../../helpers/notiication';

const ForgetPassword = (props) => {
	//defining states
	const [loading, setLoading] = useState(false); //loader state
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm(); // for form validation

	const onSubmit = (data) => {
		setLoading(true);
		var bodyFormData = new FormData();
		bodyFormData.append('email', data.email);
		axios
			.post('forgot-password', bodyFormData)
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
	};

	return (
		<div>
			<div className='headerBorder'></div>
			<div className='d-breadcrumb'>
				<nav aria-label='breadcrumb'>
					<ol className='breadcrumb'>
						<li className='breadcrumb-item'>
							<ArrowLeftIcon />
						</li>
						<li className='breadcrumb-item'>
							<Link to='#'>Home</Link>
						</li>
						<li className='breadcrumb-item'>
							<Link to='#'>ACCOUNT</Link>
						</li>
						<li className='breadcrumb-item active'>MY ACCOUNT</li>
					</ol>
				</nav>
			</div>
			<div className='contact-form pt-30 pb-50'>
				<div className='container mb-30 mt-60 pb-50'>
					<div className='signupForm mt-50'>
						<h3 className='text-center'>Forget Password</h3>
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className='row'>
								<div className='col-sm-3'></div>
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
											<span className='input-error'>
												{errors.email.message}
											</span>
										)}
									</div>
									<div className='d-grid mt-30 mb-10'>
										<Button
											loading={loading}
											type='primary'
											className='btn btn-primary large-btn'
											size='large'
											htmlType='submit'
										>
											Continue
										</Button>
									</div>
								</div>
								<div className='col-sm-3'></div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default withRouter(ForgetPassword);
