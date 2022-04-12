import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import JoblyApi from "../api/api";

import Spinner from "../components/Spinner";
import Alert from "../components/Alert";
import CompanyProfileCard from "../components/CompanyProfileCard";
import { useSelector } from "react-redux";

const SingleCompanyPage = () => {
  const { handle } = useParams();
  const [company, setCompany] = useState({});
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [failedResponse, setFailedResponse] = useState();

//#################################################################3
  const username = useSelector((store) => store.username);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [apiProgress, setApiProgress] = useState(false);

  const applyToJob = async (jobId) => {
    setApiProgress(true);
    try {
      await JoblyApi.applyToJobs(username, +jobId);
      getUserApplications();
    } catch (error) {}
    setApiProgress(false);
  };
  const getUserApplications = async () => {
    setApiProgress(true);
    try {
      const response = await JoblyApi.getUserApplications(username);

      setAppliedJobs((jobs) => [...response.user.applications]);
    } catch (error) {}
    setApiProgress(false);
  };

  useEffect(()=>{
      getUserApplications()
  },[])
//###########################################################33
  useEffect(() => {
    const getCompanyByHandle = async () => {
      setPendingApiCall(true);
      try {
        const response = await JoblyApi.getCompany(handle);
        setCompany((company) => ({ ...response }));
      } catch (error) {
        setFailedResponse({ failResponse: error[0] });
      }
      setPendingApiCall(false);
    };
    getCompanyByHandle();
    getUserApplications()  //additions

  }, [handle]);

  let content = (
    <Alert type="secondary" center>
      <Spinner size="big" />
    </Alert>
  );

  if (!pendingApiCall) {
    if (failedResponse) {
      content = (
        <Alert type="danger" center>
          {failedResponse.failResponse}
        </Alert>
      );
    } else {
      content=<CompanyProfileCard company={company} applications={appliedJobs} applyToJob={applyToJob}/>

    }
  }
  return <>{content}</>;
};

export default SingleCompanyPage;
