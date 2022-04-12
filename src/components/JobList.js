import React from "react";
import { useEffect, useState } from "react";
import Alert from "./Alert";
import Spinner from "./Spinner";
import JobListItem from "./JobListItem";

import JoblyApi from "../api/api";
import { useSelector } from "react-redux";

const JobList = () => {
  const username = useSelector((store) => store.username);

  const [jobList, setJobList] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [apiProgress, setApiProgress] = useState(false);
  const [failedResponse, setFailedResponse] = useState();

  const [formData, setFormData] = useState({ jobsSearchBar: "" });


  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData((data) => ({ ...data, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiProgress(true);

    try {
      const response = await JoblyApi.getJobs(formData.jobsSearchBar);
      setJobList((jobs) => [...response.jobs]);
    } catch (error) {
      setFailedResponse({ failResponse: error });
    }
    setApiProgress(false);
  };

  //it sends an api request once when the component is rendered. Then based on the search result, handleSubmit function above is going to send another api request
  useEffect(() => {
    let isMounted = true;
    const getAllJobs = async () => {
      setApiProgress(true);
      try {
        const response = await JoblyApi.getJobs();
        setJobList((jobs) => [...response.jobs]);

        getUserApplications()
      } catch (error) {
        setFailedResponse({ failResponse: error });
      }
      setApiProgress(false);
    };

    if (isMounted) getAllJobs();


    return () => (isMounted = false);
  }, []);

  const getUserApplications = async () => {
    setApiProgress(true);
    try {
      const response = await JoblyApi.getUserApplications(username);

      setAppliedJobs((jobs) => [...response.user.applications]);
    } catch (error) {
      setFailedResponse({ failResponse: error });
    }
    setApiProgress(false);
  };

  const applyToJob = async (jobId) => {
    setApiProgress(true);
    try {
      await JoblyApi.applyToJobs(username, +jobId);
      getUserApplications()
    } catch (error) {
    }
    setApiProgress(false);
  };

  let content = (
    <Alert type="secondary" center>
      <Spinner size="big" />
    </Alert>
  );

  if (!apiProgress) {
    if (failedResponse) {
      content = (
        <Alert type="danger" center>
          {failedResponse.failResponse}
        </Alert>
      );
    } else {
      if (jobList.length === 0) {
        content = "No jobs found";
      } else {
        content = jobList.map((job) => {
          return (
            <JobListItem
              key={job.id}
              job={job}
              companyHandle
              applications={appliedJobs}
              applyForJob={applyToJob}
            />
          );
        });
      }
    }
  }

  return (
    <>
      <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2">
        <form>
          <div className="input-group">
            <input
              className="form-control "
              id="jobsSearchBar"
              type="search"
              name="jobs-search-bar"
              placeholder="Search Job Title..."
              onChange={(e) => handleChange(e)}
              aria-label="Search"
            />
            <span className="input-group-btn">
              <button className="btn btn-primary" onClick={handleSubmit}>
                Search
              </button>
            </span>
          </div>
        </form>
      </div>

      <div className="card">
        <div className="card-header text-center">
          <h3>Jobs ({jobList.length})</h3>
        </div>
        <ul className="list-group list-group flush">{content}</ul>
      </div>
    </>
  );
};

export default JobList;
