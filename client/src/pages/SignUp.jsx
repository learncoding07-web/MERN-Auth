import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState({nameError: "", emailError: "", passError: ""});
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  /* to check for empty inputs */
  let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validateInputs = () => {
    if(formData.name === "") {
      setError({...error,"nameError": "*Please enter name"});
      return false;
    } else if(formData.email === "") {
      setError({...error,"emailError": "*Please enter email"});
      return false;
    } else if(!(formData.email.includes(regex))){
      setError({...error,"emailError": "*Please enter valid email"});
      return false;
    } 
    else if(formData.password === "") {
      setError({...error,"passError": "*Please enter password"});
      return false;
    }

    return true;
  }

  /* to submit form */
  const handleSubmit = async(e) => {
      e.preventDefault();
      const isValidated = await validateInputs();
      if(!isValidated) return;
      try {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        const data = await res.json();

        if(data.status === false) {
          setLoading(false);
          setDisabled(false);
          toast.error("Something Went Wrong");
        } else {
          toast.success(data.message);
          setLoading(true);
          setDisabled(true);
          navigate("/signin");
        }
      } catch (error) {
        setLoading(false);
        setDisabled(false);
        toast.error("Something Went Wrong");
        console.log("error in register", error);
      }
      
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input 
          type='text' 
          className='bg-slate-100 p-3 text-center rounded-lg ' 
          placeholder='Name' 
          id='name' 
          name='name'
          value={formData.name || ""} 
          onChange={handleChange}
        />
        <span className='bg-red-500 text-white'>{formData.name ? "" : error.nameError}</span>
        <input 
          type='email' 
          className='bg-slate-100 p-3 text-center rounded-lg ' 
          placeholder='Email' 
          id='email' 
          name='email' 
          value={formData.email || ""} 
          onChange={handleChange}
        />
        <span className='bg-red-500 text-white'>{formData.email ? "" : error.emailError}</span>

        <input 
          type='password' 
          className='bg-slate-100 p-3 text-center rounded-lg ' 
          placeholder='Password' 
          id='password' 
          name='password' 
          value={formData.password || ""} 
          onChange={handleChange}
        />
        <span className='bg-red-500 text-white'>{formData.password ? "" : error.passError}</span>

        <button disabled={disabled} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80' >{loading ? "Loading..." : "Register"}</button>
      </form>
      <div className='flex space-x-2 '>
        <p>Have an account?</p>
        <Link to='/signin'>
          <span className='text-blue-500'>Sign In</span>
        </Link>
      </div>
    </div>
  )
}

export default SignUp