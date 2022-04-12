import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import Alert from "../components/Alert";
import ButtonWithProgress from "../components/ButtonWithProgress";
import JoblyApi from "../api/api";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../state/authActions";

const SignUpPage = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const [apiProgress, setApiProgress] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((data) => ({ ...data, [id]: value }));

    // const errorsCopy=JSON.parse(JSON.stringify(error)) a method for deep copy

    setErrors((errors) => ({ ...errors, [id]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password, firstName, lastName } = formData;
    const body = {
      username,
      email,
      password,
      firstName,
      lastName,
    };
    setApiProgress(true);
    try {
      const response = await JoblyApi.signUp(body);
      setSignUpSuccess(true);

      dispatch(
        loginSuccess({
          ...response.data,
          header: `Bearer ${response.token}`,
          username,
        })
      );
      history.push("/");
    } catch (e) {
      for (let err of e) {
        if (err.includes("instance.username")) {
          setErrors((data) => ({ ...data, username: err.slice(9) }));
        }
        if (err.includes("instance.password")) {
          setErrors((data) => ({ ...data, password: err.slice(9) }));
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

        if (err.includes("Duplicate username")) {
          setErrors((data) => ({ ...data, username: err }));
        }
      }
      // setErrors(data=>({...e}))
      setApiProgress(false);
    }
  };

  const disabled =
    formData.password === formData.passwordRepeat && formData.password !== ""
      ? false
      : true;
  const passportMismatch =
    formData.password !== formData.passwordRepeat ? "Password mismatch" : null;

  return (
    <div
      className="col-lg-6 offset-lg-3 col-md-8 offset-md-2"
      data-testid="signup-page"
    >
      {!signUpSuccess && (
        <form className="card" data-testid="form-sign-up">
          <div className="card-header">
            <h1 className="text-center">Sign Up</h1>
          </div>
          <div className="card-body">
            <Input
              id="username"
              label="Username"
              onChange={handleChange}
              help={errors.username}
            />
            <Input
              id="email"
              label="E-mail"
              onChange={handleChange}
              help={errors.email}
            />
            <Input
              id="firstName"
              label="First Name"
              onChange={handleChange}
              help={errors.firstName}
            />
            <Input
              id="lastName"
              label="Last Name"
              onChange={handleChange}
              help={errors.lastName}
            />

            <Input
              id="password"
              type="password"
              label="Password"
              onChange={handleChange}
              help={errors.password}
            />
            <Input
              id="passwordRepeat"
              type="password"
              label="Password Repeat"
              onChange={handleChange}
              help={passportMismatch}
            />
            <div className="text-center">
              <ButtonWithProgress
                disabled={disabled}
                apiProgress={apiProgress}
                onClick={handleSubmit}
              >
                Sign Up
              </ButtonWithProgress>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default SignUpPage;
