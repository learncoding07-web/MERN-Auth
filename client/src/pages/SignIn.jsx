import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice';
const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const dispatch = useDispatch();
  const [error, setError] = useState({ emailError: "", passError: ""});
  const { loading } = useSelector((state) => state.user);
  // const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  /* to check for empty inputs */
  const validateInputs = () => {
    
    if(formData.email === "") {
      setError({...error,"emailError": "*Please enter email"});
      return false;
    } else if(formData.password === "") {
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
        dispatch(signInStart());
        const res = await fetch("/api/auth/signin", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        const data = await res.json();

        if(data.status === false) {
          dispatch(signInFailure());
          setDisabled(false);
          toast.error(data.message);
        } else {
          toast.success(data.message);
          dispatch(signInSuccess(data));
          setDisabled(true);
          navigate("/");
        }
      } catch (error) {
        dispatch(signInFailure());
        setDisabled(false);
        toast.error("Something Went Wrong");
        console.log("error in register", error);
      }
      
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'> 
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

        <button disabled={disabled} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80' >{loading ? "Loading..." : "Login"}</button>
      </form>
      <div className='flex space-x-2 '>
        <p>Register here</p>
        <Link to='/signup'>
          <span className='text-blue-500'>Sign Up</span>
        </Link>
      </div>
    </div>
  )
}

export default SignIn