import React from "react";
import ButtonWithProgress from "../components/ButtonWithProgress";
import Alert from "../components/Alert";
import Input from "../components/Input";

import JoblyApi from "../api/api";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const ProfilePage = () => {

  const auth = useSelector((store) => store);
  const [formData, setFormData] = useState({
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  let currentUser;
  useEffect(()=>{
    const getUserByUsername=async()=>{
      currentUser=await JoblyApi.getUserByUsername(auth.username)
      setFormData((data)=>({...data,firstName:currentUser.user.firstName,lastName:currentUser.user.lastName,email:currentUser.user.email}))
    }
    getUserByUsername()
  },[])

  const [apiProgress, setApiProgress] = useState(false);

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [updateSuccess, setUpdateSuccess] = useState(false);


  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData((data) => ({ ...data, [id]: value }));
    setErrors((errors) => ({ ...errors, [id]: null }));
    setUpdateSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password, firstName, lastName } = formData;
    const body = {
      email,
      firstName,
      lastName,
    };
    setApiProgress(true);

    try {
      await JoblyApi.verify(auth.username, password);
      await JoblyApi.userUpdate(auth.username, body);
      setUpdateSuccess(true);
    } catch (error) {
      for (let err of error) {
        if (err.includes("Invalid username/password")) {

          setErrors((data) => ({ ...data, password: "Invalid password" }));
        }
        if (err.includes("instance.firstName")) {

          setErrors((data) => ({ ...data, firstName: err.slice(9) }));
        }
        if (err.includes("instance.lastName")) {

          setErrors((data) => ({ ...data, lastName: err.slice(9) }));
        }
        if (err.includes("instance.email")) {

          setErrors((data) => ({ ...data, email: err.slice(9) }));
        }
      }
      setApiProgress(false);
    }
    setApiProgress(false);
  };
  let disabled=formData.password===""?true:false
  return (
    <>

      <div
        className="col-lg-6 offset-lg-3 col-md-8 offset-md-2"
        data-testid="login-page"
      >
        <form className="card">
          <div className="card-header">
            <h1 className="text-center">Profile</h1>
          </div>
          <div className="card-body">
            <Input
              id="firstName"
              label="First Name"
              onChange={handleChange}
              help={errors.firstName}
              initialValue={formData.firstName}
            />

            <Input
              id="lastName"
              label="Last Name"
              onChange={handleChange}
              help={errors.lastName}
              initialValue={formData.lastName}

            />

            <Input
              id="email"
              label="E-mail"
              onChange={handleChange}
              help={errors.email}
              initialValue={formData.email}

            />

            <Input
              id="password"
              type="password"
              label="Confirm password to make changes:"
              onChange={handleChange}
              help={errors.password}
            />
            <div className="text-center">
              <ButtonWithProgress
                apiProgress={apiProgress}
                onClick={handleSubmit}
                disabled={disabled}
              >
                Update
              </ButtonWithProgress>
            </div>
          </div>
        </form>
        {updateSuccess && <Alert>User Profile is updated successfully.</Alert>}
      </div>
    </>
  );
};

export default ProfilePage;
