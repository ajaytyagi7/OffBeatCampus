import { useFormik } from 'formik'
import { enqueueSnackbar } from 'notistack'
import React, { useState } from 'react'
import * as Yup from 'yup';
import MDEditor from '@uiw/react-md-editor/nohighlight';

const JobPostSchema = Yup.object().shape({
    title: Yup.string().required('Title is Require'),

});





const JobPost = () => {

    const [desc, setDesc] = React.useState('');

    const [currentCompany, setCurrentCompany] = useState(JSON.parse(sessionStorage.getItem('company')));

    const JobPostForm = useFormik({
        initialValues: {
            title: '',
            name: '',
            address: '',
            salary: '',
            description: '',
            experience: '',
            company: currentCompany._id,

        },

        onSubmit: async (value) => {
            value.description = desc;
            console.log(value)
            const res = await fetch(`${import.meta.env.VITE_API_URL}/job/add`, {
                method: 'POST',
                body: JSON.stringify(value),
                headers: {
                    'Content-type': 'application/json'
                }
            });

            const data = await res.json();
            if (res.status == 200) {
                enqueueSnackbar('Job Post Successfully', { variant: 'success' })
            } else if (res.status == 401) {
                enqueueSnackbar('Invalid Post ', { variant: 'error' })
            } else {
                enqueueSnackbar('Something went wrong', { variant: 'error' })
            }



        },

        validationSchema: JobPostSchema
    });
    return (
        <div className='container-fluid  mb-5 '>
            <div className='row'>
                <div className='col-md-7 mx-auto py-2'>
                    <div className=''>
                        <div className='card-body'>
                            <form className='rounded bg-white shadow   p-4 bg-white' onSubmit={JobPostForm.handleSubmit} >
                                <h1 className='text-center fw-bold'>Post Job</h1> <hr className='text-white' /><hr />
                                <span className='ms-4 fs-6 text-danger'>{JobPostForm.errors.email}</span>
                                <input type="text" className='form-control mb-3 border border-secondary p-3' placeholder='Job Title' id='title' onChange={JobPostForm.handleChange} value={JobPostForm.values.title} />

                            
                                <span className='ms-4 fs-6 text-danger'>{JobPostForm.errors.email}</span>
                                <input type="text" className='form-control mb-3 border border-secondary p-3' placeholder='Enter Address' id='address' onChange={JobPostForm.handleChange} value={JobPostForm.values.address} />

                                <span className='ms-4 fs-6 text-danger'>{JobPostForm.errors.email}</span>
                                <input type="text" className='form-control mb-3 border border-secondary p-3'placeholder='Enter Salary' id='salary' onChange={JobPostForm.handleChange} value={JobPostForm.values.salary} />

                                <span className='ms-4 fs-6 text-danger'>{JobPostForm.errors.experience}</span>
                                <input type="text" className='form-control mb-3 border border-secondary p-3' placeholder='Enter experience' id='experience' onChange={JobPostForm.handleChange} value={JobPostForm.values.experience} />

                                <span className='ms-4 fs-6 text-danger'>{JobPostForm.errors.skill}</span>
                                <input type="text" className='form-control mb-3 border border-secondary p-3' placeholder='Enter Skill' id='skill' onChange={JobPostForm.handleChange} value={JobPostForm.values.skill} />

                                <span className='ms-4 fs-6 text-danger'>{JobPostForm.errors.education}</span>
                                <input type="text" className='form-control mb-3 border border-secondary p-3' placeholder='Enter Education' id='education' onChange={JobPostForm.handleChange} value={JobPostForm.values.education} />

                                <span className='ms-4 fs-6 text-danger'>{JobPostForm.errors.benefits}</span>
                                <input type="text" className='form-control mb-3 border border-secondary p-3' placeholder='Enter Benefits' id='benefits' onChange={JobPostForm.handleChange} value={JobPostForm.values.benefits} />
                                
                                <label htmlFor="jobtype">Job Type</label>
                                <span className='ms-4 fs-6 text-danger'>{JobPostForm.errors.jobtype}</span>
                                <select className='form-control mb-3 border border-secondary p-3' id="jobtype" onChange={JobPostForm.handleChange} value={JobPostForm.values.jobtype}>
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

                               

                                <label htmlFor="description">Description</label>
                                <span className='ms-4 fs-6 text-danger'>{JobPostForm.errors.email}</span>
                                <MDEditor
                                    value={desc}
                                    onChange={setDesc}
                                    plzceholder='Enter Description'
                                />


                                <button className='btn btn-primary w-100 mt-5'>Post Job</button>

                            </form>
                        </div>
                    </div>
                </div>
                <div className='col-md-5 '>
                    <img className='img-fluid post-img' src="https://cdn.dribbble.com/users/2837665/screenshots/16468935/media/ee9f3604d6b19a9af7086aa171ed0c97.png" alt="" />
                </div>
            </div>
           
        </div>
    )
}

export default JobPost