import React from "react";
import { Link } from "react-router-dom";


const JobListItem = (props) => {
  const { job,applyForJob,applications } = props;

  let isApplied;
  let content;
  if(applications){
    isApplied=applications.includes(job.id)?true:false
    content=isApplied?<button className="btn btn-danger" disabled={isApplied} onClick={()=>applyForJob(job.id)}>Applied</button>:<button className="btn btn-danger" onClick={()=>applyForJob(job.id)}>Apply</button>

  }

  return (
    <>
      <li
        style={{ cursor: "pointer" }}
        className="list-group-item list-group-item-action"
      >
        {props.companyHandle&& <Link style={{textDecoration:"none",fontWeight:"bolder"}} exact to={`/companies/${job.companyHandle}`}>{job.companyName}</Link>}
        <p style={{fontSize:16, fontWeight:"bold"}}> {job.title}</p>
        <p>Salary: {job.salary || 'Salary information is not available'}</p>
        <p>Equity: {job.equity || 'Equity information is not available'}</p>
        {content}
      </li>
    </>
  );
};

export default JobListItem;
