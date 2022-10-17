import React, { useState, useEffect } from 'react'

export default function RecruiterProfile() {

  const [applications, setApplication] = useState([]);

  const fetchAppliedJobs = async () => {

    await fetch('http://localhost:5000/api/application/fetchAllApplications', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      }
    }).then(response => {
      return response.json();
    }).then((data) => setApplication(data))
  }

  useEffect(() => {
    fetchAppliedJobs();
  }, [])


  return (
    <div>
      <div className="container">

        <h1 className="text-center mt-5" Style="overflow-y: hidden;">All Appications</h1>

        <link rel="Stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css" integrity="sha256-3sPp8BkKUE7QyPSl6VfBByBroQbKxKG7tsusY2mhbVY=" crossorigin="anonymous" />

        <div className="container">


          <div className="row">
            <div className="col-lg-10 mx-auto">
              <div className="career-search mb-60">

                <div className="filter-result">
                  {/* <p className="mb-30 ff-montserrat">Total Job Openings : 89</p> */}

                  {(
                    () => {
                      if (applications.length > 0) {
                        return (<ul>
                          {applications.map(application => (
                            <>

                              <div className="job-box d-md-flex align-items-center mb-30">
                                <div className="job-left my-4 d-md-flex align-items-center flex-wrap">

                                  <div className="job-content">
                                    <h5 className="text-left" Style="overflow:hidden;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{application.title}</h5>
                                    <ul className="">
                                      <li className="mr-md-4">
                                        <b>Discription: </b> {application.description}
                                      </li>
                                      <li className="mr-md-4">
                                        <i className=""></i>
                                        <b>Salary: </b>{application.salary} &#8377;
                                      </li>
                                      <li className="mr-md-4">
                                        <i className=""></i>
                                        <b>Job Type: </b>{application.jobType}
                                      </li>
                                      <li className="mr-md-4">
                                        <i className=""></i>
                                        <b>Skills: </b>{application.skills}
                                      </li>
                                      <li className="mr-md-4">
                                        <i className=""></i>
                                        <b>Applicant Name: </b>{application.applicantName}
                                      </li>


                                    </ul>
                                  </div>
                                </div>
                                <div className="job-right my-4 flex-shrink-0" Style="position:relative; right:0px; top:90px;">
                                  <button className="btn  btn-primary mx-2">Apply</button>
                                </div>
                                <div className="job-right my-4 flex-shrink-0" Style="position:relative; right:0px; top:90px;">
                                  <button className="btn btn-danger mx-2">Decline</button>
                                </div>
                              </div>
                            </>

                          ))}

                        </ul>)
                      }
                      else {
                        return (
                          <div className="job-box d-md-flex align-items-center justify-content-between mb-30">
                            <div className="job-left my-4 d-md-flex align-items-center flex-wrap">

                              <div className="job-content">

                                You didn't Apply Any Jobs
                              </div>
                            </div>
                            {/* <div className="job-right my-4 flex-shrink-0" Style="position:relative; right:0px; top:120px;">
                                        <button className="btn d-block w-100 d-sm-inline-block btn-primary" onClick={() => { deletejob(job._id) }}><i class="fa fa-trash-o" aria-hidden="true"></i></button>
                                    </div> */}
                          </div>
                        );
                      }
                    }
                  )()}
                  {/* {applications.length > 0 && (
                             
                            )} */}


                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
