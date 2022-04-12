import React from "react";
import { useState} from "react";
import { useHistory } from "react-router-dom";
import Input from "../components/Input"
// import { login } from "../api/apiCalls";
import JoblyApi from "../api/api";
import Alert from "../components/Alert";
import ButtonWithProgress from "../components/ButtonWithProgress";
import {useDispatch} from "react-redux"
import { loginSuccess } from "../state/authActions";

const LoginPage=()=>{

    // const auth=useContext(AuthContext)

    const [formData,setFormData]=useState({username:'',password:''})
    const [apiProgress,setApiProgress]=useState(false);
    const [failMessage,setFailMessage]=useState()

    const dispatch=useDispatch();

    const history=useHistory()

    const handleChange=(e)=>{

        const {id,value}=e.target

        setFormData((data)=>({...data,[id]:value}))
        setFailMessage();
    }

    const handleSubmit=async (e)=>{

        e.preventDefault();
        setApiProgress(true)

        try{
            const {username,password}=formData
            const response=await JoblyApi.login({username,password})

            history.push('/')

            dispatch(loginSuccess({
                        ...response.data,
                        header:`Bearer ${response.token}`,
                        username:username
                }))


        }catch(error){

            setFailMessage(error[0])

        }
        setApiProgress(false)
    }

    const {username,password}=formData
    let disabled=(username!=="" && password!=="" )?false:true

    return(

        <div className='col-lg-6 offset-lg-3 col-md-8 offset-md-2' data-testid='login-page'>
            <form className='card'>
                <div className="card-header">
                    <h1 className="text-center">Login</h1>
                </div>
                <div className="card-body">
                    <Input id="username" label="Username" onChange={handleChange}/>
                    <Input id="password" type="password" label="Password"onChange={handleChange}/>
                    {failMessage && <Alert type='danger'>{failMessage}</Alert>}
                    <div className="text-center">
                        <ButtonWithProgress disabled={disabled} apiProgress={apiProgress} onClick={handleSubmit}>Login</ButtonWithProgress>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default LoginPage;
