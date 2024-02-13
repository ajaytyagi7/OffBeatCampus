import { useFormik } from 'formik'
import { enqueueSnackbar } from 'notistack'
import React from 'react'
import * as Yup from 'yup';

const JobPostSchema=Yup.object().shape({
    title:Yup.string().required('Title is Require'),
    name:Yup.string().required('Name is require')
});




const JobPost = () => {

    const JobPostForm=useFormik({
        initialValues:{
            title:'',
            name:'',
            address:'',
            salary:'',
            description:'',
            experience:''

        },

        onSubmit:async(value)=>{
            console.log(value)
            const res=await fetch('http://localhost:4000/job/add',{
                method:'POST',
                body:JSON.stringify(value),
                headers:{
                    'Content-type':'application/json'
                }
            });

            const data=await res.json();
            if(res.status==200){
                enqueueSnackbar('Job Post Successfully',{variant:'success'})
            } else if(res.status==401){
                enqueueSnackbar('Invalid Post ',{variant:'error'})
            }else{
                enqueueSnackbar('Something went wrong',{variant:'error'})
            }

            

        },

        validationSchema:JobPostSchema
    });
  return (
    <div className='container-fluid  '>
        <div className='col-md-4 mx-auto py-5'>
            <div className=''>
                <div className='card-body'>
                    <form onSubmit={JobPostForm.handleSubmit} >
                        <h1 className='text-center fw-bold'>Post Job</h1> <hr className='text-white' />
                        <label htmlFor="title">Job Title</label>
                         <span className='ms-4 fs-6 text-danger'>{  JobPostForm.errors.email}</span>
                         <input type="text" className='form-control mb-3' id='title' onChange={JobPostForm.handleChange} value={JobPostForm.values.title} />

                        <label htmlFor="name">Enter Company Name</label>
                        <span className='ms-4 fs-6 text-danger'>{  JobPostForm.errors.email}</span>
                         <input type="text" className='form-control mb-3' id='name' onChange={JobPostForm.handleChange} value={JobPostForm.values.name} />

                        <label htmlFor="address"> Enter Address</label>
                         <span className='ms-4 fs-6 text-danger'>{  JobPostForm.errors.email}</span>
                        <input type="text" className='form-control mb-3' id='address' onChange={JobPostForm.handleChange} value={JobPostForm.values.address} />

                        <label htmlFor="salary">Enter Salary</label>
                         <span className='ms-4 fs-6 text-danger'>{  JobPostForm.errors.email}</span>
                        <input type="text" className='form-control mb-3' id='salary' onChange={JobPostForm.handleChange} value={JobPostForm.values.salary} />
                        
                        <label htmlFor="salary">Enter experience</label>
                         <span className='ms-4 fs-6 text-danger'>{  JobPostForm.errors.experience}</span>
                        <input type="text" className='form-control mb-3' id='experience' onChange={JobPostForm.handleChange} value={JobPostForm.values.experience} />
                        
                        <label htmlFor="skill">Enter Skill</label>
                        <span className='ms-4 fs-6 text-danger'>{  JobPostForm.errors.skill}</span>
                        <input type="text" className='form-control mb-3' id='skill' onChange={JobPostForm.handleChange} value={JobPostForm.values.skill} />

                        <label htmlFor="education">Enter Education</label>
                        <span className='ms-4 fs-6 text-danger'>{  JobPostForm.errors.education}</span>
                        <input type="text" className='form-control mb-3' id='education' onChange={JobPostForm.handleChange} value={JobPostForm.values.education} />

                        <label htmlFor="jobtype">Enter Job Type</label>
                        <span className='ms-4 fs-6 text-danger'>{  JobPostForm.errors.jobtype}</span>
                        <select className='form-control mb-3' id="jobtype" onChange={JobPostForm.handleChange}value={JobPostForm.values.jobtype}>
                             <option >
                                
                            </option>
                            <option >
                                Full Time
                            </option>
                            <option >
                                Part Time
                            </option>
                            <option >
                                Work From Home
                            </option>
                        </select >

                        <label htmlFor="benefits">Enter Benefits</label>
                        <span className='ms-4 fs-6 text-danger'>{  JobPostForm.errors.benefits}</span>
                        <input type="text" className='form-control mb-3' id='benefits' onChange={JobPostForm.handleChange} value={JobPostForm.values.benefits} />

                        <label htmlFor="description">Enter Description</label>
                        <span className='ms-4 fs-6 text-danger'>{  JobPostForm.errors.email}</span>
                         <textarea id="description" className="form-control w-100  bg-white-subtle " rows="4" cols="50" onChange={JobPostForm.handleChange} value={JobPostForm.values.description}   ></textarea>

                        <button className='btn btn-primary w-100 mt-3'>Post Job</button>

                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default JobPost