import React from "react";
import { Link } from "react-router-dom";
import defaultProfileImage from "../assets/genericCompanyPhoto.jpeg";

const CompanyListItem = (props) => {
  const { company } = props;
  return (
    <>
      <Link
        style={{ cursor: "pointer", textDecoration: "none", color: "black" }}
        to={`/companies/${company.handle}`}
      >
        <li className="list-group-item list-group-item-action">
          <img
            className="rounded-circle shadow-sm"
            src={defaultProfileImage}
            width="30"
            alt="profile"
          />
          <span style={{ marginLeft: "4px" }}>{company.name}</span>
        </li>
      </Link>
    </>
  );
};
export default CompanyListItem;
