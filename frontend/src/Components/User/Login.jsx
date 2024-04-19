import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
const [user, setUser] = useState(null)
const navigate = useNavigate()

    let getUser = async()=>{
        let User = await JSON.parse(localStorage.getItem("User"))
      await  setUser(User)
    }

    const [credentials, setCredentials] = useState({
        email:"",
        password:""
    })
 
    const loginHandler = async(e)=>{
        e.preventDefault()
        let data = await fetch("http://127.0.0.1:8000/user/login",{
            method:"POST",
            headers:{'Content-Type': 'application/json'}, 
            body:JSON.stringify(credentials)
        })
        
        if (data.ok) {
            let res = await data.json()
            console.log(res);
          await  localStorage.setItem("User",JSON.stringify(res.user))
           navigate("/")
        }
    }

    const inputChangeHandler = (e)=>{
       setCredentials({...credentials,[e.target.name]:e.target.value})
       console.log(credentials);
    }

    useEffect(() => {
    
     getUser()
    }, [])
    
  return (
    <>
      <div className='min-h-[100vh]'>
        <h1 className='text-center text-[25px] font-medium pt-7 text-white'>Login</h1>
        <div className=' w-full my-5 flex items-center justify-center'>
          <div className='bg-green-6 w-[40%] rounded-lg px-3 items-center flex justify-center '>
            <form
              action="" className='bg-gray-300 py-10 font-medium px-10 rounded-lg'
            >
              <label
                htmlFor="" className='py-2 block text-[22px]'>
                E-mail</label>

              <input name='email' onChange={inputChangeHandler}
                type="text" className='p-2 outline-none rounded-lg border-[1px] border-black' placeholder='Enter Your Email' required
              />

              <label
                htmlFor="" className='py-2 block text-[22px]'
              >Password</label>

              <input name='password' onChange={inputChangeHandler}
                type="password" className='p-2 outline-none rounded-lg border-[1px] border-black' placeholder='Enter Your Password'
                required />


              <div className='flex items-center justify-center pt-3'>
                <button onClick={loginHandler} className='bg-white px-4 py-1 text-[18px] mt-2 rounded-lg border-[1px] border-black'>Sign in</button>

              </div>

            </form>
          </div>
        </div>
      </div>
    </>
  )
}
