import React , {useState} from 'react'
import {useNavigate} from 'react-router-dom'

const Login = (props) => {
    let navigate= useNavigate();

    const [cred, setCred] = useState({ email: "", password: ""})

    const onChange = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value });
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:2000/api/auth/login", 
        {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email:cred.email,password:cred.password})
          });
        const json= await response.json();
        console.log(json);
        if(json.success)
        {
            //re-direct
            localStorage.setItem('token',json.authtoken);
            navigate("/",{replace: true});
            props.showAlert("Successfully Logged in","success");
        }
        else{
            props.showAlert("Invalid credentials","danger");
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' value={cred.email} onChange={onChange} aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={cred.password} onChange={onChange}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
