import React from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { enqueueSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom'
import useUserContext from '../UserContext';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

const SignupSchema = Yup.object().shape({
  name: Yup.string().required('Name is Required ').min(4, 'Name is too short'),
  email: Yup.string().email('Invalid email').required(' Email is Required'),
  password: Yup.string().required('Password id Required').min(8, 'Password is too short')
    .matches(/[a-z]/, 'Password must include Lowercase letter')
    .matches(/[A-Z]/, 'Password must include uppercase letter')
    .matches(/\W/, 'Password must include Number'),
  confirm: Yup.string().oneOf([Yup.ref('password')], null, 'Confirm Passwords must match ').required('Confirm Password is required')

});

const Signup = () => {


  const navigate = useNavigate();
  const { setuserloggedIn } = useUserContext();

  const signupForm = useFormik({
    initialValues: {

      name: '',
      email: '',
      password: '',
      confirm: '',

    },

    onSubmit: async (values, { setSubmitting }) => {
      console.log(values);

      const res = await fetch(`${import.meta.env.VITE_API_URL}/user/add`, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'content-Type': 'application/json'
        }
      });
      //const res=await fetch(`/user/add`,{)

      setSubmitting(false)
      console.log(res.status);

      if (res.status == 200) {
        enqueueSnackbar('Register primaryfully ', { variant: 'success' });
        navigate('/Login');
      } else {
        enqueueSnackbar('Something went wrong', { variant: 'error' });
      }
    },
    validationSchema: SignupSchema
  }
  );



  const googleSignup = async (credentialResponse) => {

    const emailRes = await fetch(`${import.meta.env.VITE_API_URL}/user/getbyemail/${credentialResponse.email}`);

    if (emailRes.status == 200) {

      const userData = await emailRes.json();
      enqueueSnackbar('Signup Successfully ', { variant: 'success' });
      sessionStorage.setItem('user', JSON.stringify(userData));
      setuserloggedIn(true);
      navigate('/')
    } else {

      const res = await fetch(`${import.meta.env.VITE_API_URL}/user/add`, {
        method: 'POST',
        body: JSON.stringify({
          name: credentialResponse.name,
          email: credentialResponse.email,
          loginType: 'google'
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (res.status == 200) {
        enqueueSnackbar('Registered Successfully ', { variant: 'success' });
        const data = await res.json();
        sessionStorage.setItem('user', JSON.stringify(data));
        setuserloggedIn(true);
        navigate('/')
      } else {
        enqueueSnackbar('Something went wrong', { variant: 'error' });
      }
    }

  }

  return (
    <div className='container-fluid row  mb-5'>


      <div className='col-md-5 mx-auto login-card  py-3 '>
        <div className=' rounded-3 '>
          <div className='card-body '>
            <form className='bg-white p-4 rounded shadow' onSubmit={signupForm.handleSubmit}  >
              <h1 className='text-center fw-bold'><i class="fa-solid fa-users"></i></h1>
              <hr />
              <span className='ms-4 fs-6 text-danger'>{signupForm.touched.name && signupForm.errors.name}</span>
              <input type="text" className='form-control border border-secondary p-2  border border-dark '  placeholder='Username' id='name' onChange={signupForm.handleChange} value={signupForm.values.name} />&nbsp;

              <span className='ms-4 fs-6 text-danger'>{signupForm.touched.email && signupForm.errors.email}</span>
              <input type="text" className='form-control border border-secondary p-2 border border-dark' placeholder=' Email Address' id='email' onChange={signupForm.handleChange} value={signupForm.values.email} />&nbsp;

              <span className='ms-4 fs-6 text-danger'>{signupForm.touched.password && signupForm.errors.password}</span>
              <input type="password" className='form-control border border-secondary p-2 border border-dark' placeholder='Password' id='password' onChange={signupForm.handleChange} value={signupForm.values.password} />&nbsp;

              <span className='ms-4 fs-6 text-danger'>{signupForm.touched.confirm && signupForm.errors.confirm}</span>
              <input type="password" className='form-control border border-secondary p-2 border border-dark' placeholder='Confirm Password' id='confirm' onChange={signupForm.handleChange} value={signupForm.values.confirm} />&nbsp;

              <button className='btn btn-primary mt-3 w-100'  >Sign Up</button>&nbsp;
              
              <GoogleOAuthProvider clientId="196496969029-n46m3397qmbsuar3boobrodpd45crveb.apps.googleusercontent.com">
               <GoogleLogin
                  onSuccess={credentialResponse => {
                    const decoded = jwtDecode(credentialResponse.credential);
                    console.log(decoded);
                    googleSignup(decoded);
                  }}
                  onError={() => {
                    console.log('Login Failed');
                  }}
                />
                
              </GoogleOAuthProvider>
              

              <p className='text-center mt-3'> Already Have a Register ?<Link to={'/Login'} className='text-decoration-none ' > Log In</Link></p>
            </form>
          </div>


        </div>
      </div>
      <div className='col-md-5 py-8'>
        <img className='img-fluid' src="https://media.istockphoto.com/id/1305268276/vector/registration-abstract-concept-vector-illustration.jpg?s=612x612&w=0&k=20&c=nfvUbHjcNDVIPdWkaxGx0z0WZaAEuBK9SyG-aIqg2-0=" alt="" />

      </div>
    </div>
  )
}

export default Signup