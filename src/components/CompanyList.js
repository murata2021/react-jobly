import React from "react";
import { useEffect, useState } from "react";
import Alert from "./Alert";
import Spinner from "./Spinner";
import CompanyListItem from "./CompanyListItem";

import JoblyApi from "../api/api";

const CompanyList = () => {
  const [companiesList, setCompaniesList] = useState([]);
  const [apiProgress, setApiProgress] = useState(false);
  const [failedResponse, setFailedResponse] = useState();

  const [formData, setFormData] = useState({ companiesSearchBar: "" });

  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData((data) => ({ ...data, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiProgress(true);

    try {
      const response = await JoblyApi.getCompanies(formData.companiesSearchBar);
      setCompaniesList((companies) => [...response.companies]);
    } catch (error) {
      setFailedResponse({ failResponse: error });
    }
    setApiProgress(false);
  };

  //it sends an api request once when the component is rendered. Then based on the search result, handleSubmit function above is going to send another api request
  useEffect(() => {
    const getAllCompanies = async () => {
      setApiProgress(true);
      try {
        const response = await JoblyApi.getCompanies();
        setCompaniesList((companies) => [...response.companies]);
      } catch (error) {
        setFailedResponse({ failResponse: error });
      }
      setApiProgress(false);
    };
    getAllCompanies();
  }, []);

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
      if (companiesList.length === 0) {
        content = "No companies found";
      } else {
        content = companiesList.map((company) => {
          return <CompanyListItem key={company.handle} company={company} />;
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
              id="companiesSearchBar"
              type="search"
              name="companies-search-bar"
              placeholder="Search Company..."
              onChange={(e) => handleChange(e)}
              aria-label="Search"
            />
            <span className="input-group-btn">
              <button className="btn btn-primary" onClick={handleSubmit}>Search</button>
            </span>
          </div>
        </form>
      </div>

      <div className="card">
        <div className="card-header text-center">
          <h3>Companies ({companiesList.length})</h3>
        </div>
        <ul className="list-group list-group flush">{content}</ul>
      </div>
    </>
  );
};

export default CompanyList;
