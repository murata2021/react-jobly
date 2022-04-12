import React, { useEffect } from "react";
import { useState } from "react-dom";
import defaultProfileImage from "../assets/genericCompanyPhoto.jpeg";
import JobListItem from "./JobListItem";
import { useSelector } from "react-redux";
import JoblyApi from "../api/api";

const CompanyProfileCard = (props) => {
  const { company,applications,applyToJob } = props;
console.log(props)

  let content = (
    <>
      <h1>{company.name}</h1>
      <p>{company.description}</p>
    </>
  );

  let jobContent;

  if (!company.jobs) {
    jobContent = <p>No job(s) listed</p>;
  } else {
    jobContent = company.jobs.map((job) => {
      return (
        <JobListItem
          key={job.id}
          job={job}
          applications={applications}
          applyForJob={applyToJob}
        />
      );
    });
  }

  return (
    <>
      <div className="card text-center">
        <div className="card-header">
          <img
            className="rounded-circle shadow"
            src={defaultProfileImage}
            width="200"
            height="200 "
            alt="profile"
          />
        </div>
        <div className="card-body">{content}</div>
      </div>

      <div className="card">
        <div className="card-header text-center">
          <h3>Jobs</h3>
        </div>
        <ul className="list-group list-group flush">{jobContent}</ul>
      </div>
    </>
  );
};

export default CompanyProfileCard;
