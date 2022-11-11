import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function Edit() {

    const params = useParams();
    const navigate = useNavigate();

    const [job, setJob] = useState([]);

    const [credentials, setCredentials] = useState({ title: "", description: "", jobType: "", skills: "", duration: "", deadline: "", salary: "" })
    const findJob = async (id) => {
        // console.log(id);

        await fetch(`http://localhost:5000/api/jobs/findjob/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => {
            return response.json();
        }).then(data => {
            setJob(data);
            setCredentials(data);
            // setCredentials({title: job.title, description:job.description, jobType:job.jobType, skills : job.skills, duration : job.duration, deadline : job.deadline, salary : job.salary});
        })

        

    }

    const updateJob = async (e) => {

        e.preventDefault();
      

        const response = await fetch(`http://localhost:5000/api/jobs/updatejob/${credentials._id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                title: credentials.title, description: credentials.description,
                jobType: document.getElementById('jobType').value, skills: credentials.skills, duration: credentials.duration, deadline: credentials.deadline,
                salary: credentials.salary
            })
        })


        const json = await response.json();

        if (json !== "") {
            navigate("/fetchjobs");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        findJob(params.type);
        // updateJob();
    }, [])


    return (
        <>
            <section className="h-100 h-custom">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-8 col-xl-6">
                            <div className="card rounded-3 border border-1 border-dark">
                                <img src="https://firebasestorage.googleapis.com/v0/b/travelapp-925d4.appspot.com/o/How-To-Get-Offer-Letter-in-Canada-in-3-Easy-Steps-from-India-.webp?alt=media&token=0f8aca90-f8cc-424a-b897-5fe36587e252"
                                    className="w-100" Style="border-top-left-radius: .3rem; border-top-right-radius: .3rem;height: 200px;"
                                    alt="Sample photo" />
                                <div className="card-body p-4 p-md-5">
                                    <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2" Style="overflow:hidden;">Create a Job</h3>

                                    <form className="px-md-2" method='POST' onSubmit={updateJob}>

                                        <div className="form-outline mb-4">
                                            <label className="form-label" for="form3Example1q"> Job Name</label>
                                            <input type="text" name='title' value={credentials.title} onChange={onChange} id="form3Example1q" className="form-control" required />

                                        </div>

                                        <div className="row">
                                            <div className="col-md-6 mb-4">

                                                <div className="form-outline datepicker">
                                                    <label for="exampleDatepicker1" className="form-label">Salary</label>
                                                    <input type="number" name='salary' value={credentials.salary} onChange={onChange} className="form-control" id="exampleDatepicker1" required />

                                                </div>

                                            </div>
                                            <div className="col-md-6  mt-0">
                                                <label for="exampleDatepicker1" className="form-label">Job Type</label>
                                                <select className="form-select" name='jobType' id='jobType' value = {credentials.jobType} onChange={onChange} aria-label="Default select example" required>
                                                    <option value="" disabled selected hidden>Select Type...</option>
                                                    <option value="1">Full time</option>
                                                    <option value="2">Part time</option>
                                                    <option value="3">Work from home</option>

                                                </select>

                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6 mb-4">

                                                <div className="form-outline datepicker">
                                                    <label for="exampleDatepicker1" className="form-label">Duration</label>
                                                    <input type="text" name='duration' value={credentials.duration} onChange={onChange} className="form-control" id="exampleDatepicker1" placeholder="# month/year" required />

                                                </div>

                                            </div>
                                            <div className="col-md-6  mt-0">
                                                <label for="exampleDatepicker1" className="form-label">Deadline</label>
                                                <input type="date" name='deadline' value={credentials.deadline} onChange={onChange} className="form-control" id="exampleDatepicker1" required />

                                            </div>
                                        </div>

                                        {/* <div className="row">
                                            <div className="col-md-6 mb-4">

                                                <div className="form-outline datepicker">
                                                    <label for="exampleDatepicker1" className="form-label">Applicants</label>
                                                    <input type="number" name='applicants'   className="form-control" id="exampleDatepicker1" required />

                                                </div>

                                            </div>
                                            <div className="col-md-6  mt-0">
                                                <label for="exampleDatepicker1" className="form-label">Positions</label>
                                                <input type="number" name='position'  className="form-control" id="exampleDatepicker1" required />

                                            </div>
                                        </div> */}



                                        <div className="mb-2">

                                            <div className="form-outline mb-4">
                                                <label className="form-label" for="form3Example1q"> Skills</label>
                                                <textarea className="form-control" name='skills' value={credentials.skills} onChange={onChange} rows="3" placeholder="require skills.." required></textarea>

                                            </div>
                                        </div>

                                        <div className="mb-4">

                                            <div className="form-outline mb-4">
                                                <label className="form-label" for="form3Example1q"> Description</label>
                                                <textarea className="form-control" name='description' onChange={onChange} value={credentials.description}  rows="3" placeholder="job description.." required></textarea>

                                            </div>
                                        </div>


                                        <center>
                                            <button type="submit" className="btn btn-primary" autocomplete="off">Update Job</button>
                                        </center>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
