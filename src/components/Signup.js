import React , {useState} from 'react'
import {useNavigate} from 'react-router-dom'

const Signup = (props) => {
    let navigate= useNavigate();

    const [cred, setCred] = useState({ name:"", email: "", password: "", cpassword:""})

    const {name,email,password}=cred;

    const onChange = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value });
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:2000/api/auth/createuser", 
        {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({name,email,password})
        });
        const json= await response.json();
        console.log(json);
        if(json.success)
        {
            //re-direct
            localStorage.setItem('token',json.authtoken);
            navigate("/",{replace: true});
            props.showAlert("Successfully Created your Account","success");
        }
        else{
          props.showAlert("Invalid Details","danger");
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name </label>
                    <input type="text" className="form-control" id="name" name='name' required value={cred.name} onChange={onChange} aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' required value={cred.email} onChange={onChange} aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' required minLength={5} value={cred.password} onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Password</label>
                    <input type="cpassword" className="form-control" id="cpassword" name='cpassword' required minLength={5} value={cred.cpassword} onChange={onChange}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
