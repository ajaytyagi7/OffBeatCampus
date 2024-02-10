import { useFormik } from 'formik'
import { enqueueSnackbar } from 'notistack';
import React from 'react'
import { Link } from 'react-router-dom'
import * as Yup from 'yup';
import useCompanyContext from '../CompanyContext';
import { useNavigate } from 'react-router-dom';


const CompanyLoginSchema=Yup.object().shape({
  email:Yup.string().email('Invalid Email').required('Password Require'),
  password:Yup.string().required('Password is Require').min(8,'Password is too short'),
});




const CompanyLogin = () => {

  const navigate=useNavigate();


  const {setCompanyLoggedin} = useCompanyContext();

  const CompanyLoginForm=useFormik({

    initialValues:{
      email:"",
      password:"",
    },

    onSubmit:async(values) =>{
      console.log(values);
      const res=await fetch('http://localhost:4000/user/authenticate',{
        method:'POST',
        body:JSON.stringify(values),
        headers:{
          'Content-type':'application/json'
        }
      });

      const data=await res.json();
      if(res.status==200){
        enqueueSnackbar('Logged in Successfully',{variant:'success'});

        sessionStorage.setItem('company',JSON.stringify(data));
        setCompanyLoggedin(true);
        navigate('/JobPost')

      }else if(res.status==401){
        enqueueSnackbar('Inavlid Email',{variant:'error'});
      }else{
        enqueueSnackbar('Some thing went wrong',{variant:'error'})
      }

    },
  });


  
  return (
    <div className='container-fluid company-login-bg-img text-white'>
        <div className='col-md-4 mx-auto py-5'>
            <div className='mt-5 '>
                <div className='card-body p-3 '>
                   <form onSubmit={CompanyLoginForm.handleSubmit}>
                    <h1 className='text-center fw-bold'>Company Login</h1>
                    <span className='ms-4 fs-6 text-danger'>{  CompanyLoginForm.errors.email}</span>
                    <input type="text" className='form-control'  style={{borderRadius:50}} placeholder='Enter Your Email' id='email' onChange={CompanyLoginForm.handleChange} value={CompanyLoginForm.values.email} />&nbsp;
                    
                    <span className='ms-4 fs-6 text-danger'>{  CompanyLoginForm.errors.password}</span>
                    <input type="text"  className='form-control' style={{borderRadius:50}} placeholder='Enter Your Password' id='password'  onChange={CompanyLoginForm.handleChange} value={CompanyLoginForm.values.password}/>&nbsp;
                    
                    <button className='btn btn-primary w-100' style={{borderRadius:50}}>Login</button>&nbsp;
                    <Link className=" text-decoration-none text-white" >Froget Password ?</Link>

                    
                    </form> 
                </div>

            </div>
        </div>
    </div>
  )
}

export default CompanyLogin