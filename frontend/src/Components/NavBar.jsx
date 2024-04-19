import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, } from 'react-router-dom'

export default function NavBar() {
  const location = useLocation().pathname;
  const [login, setLogin] = useState(false)

const navigate = useNavigate()
  const logoutHandler = (e)=>{
    e.preventDefault()
    if (confirm("logout?")) {
      localStorage.removeItem("User")
      navigate("/")
    }
  }

  useEffect(() => {
    let login = localStorage.getItem("User")
    if (login) {
      setLogin(true)
    }
    else{
      setLogin(false)
    }
  }, [])

  return (
    <>
      <div className='w-full flex text-[18px]'>
        <div className='bg-gray-300 w-[80%] font-medium'>
          <ul className='flex items-center gap-5 sm:gap-9 pt-5 px-3 py-3'>
            <Link to={"/"}
              className={`${location == "/" ? "text-blue-600" : "text-black"}`}
            >Home
            </Link>

            <Link to={"/Login"}
              className={`${location == "/Login" ? "text-blue-600" : "text-black"} ${login?"hidden":"block"}`}
            >Login
            </Link>
            <Link to={"/SignUp"}
              className={`${location == "/SignUp" ? "text-blue-600" : "text-black"} ${login?"hidden":"block"}`}
            >Sign Up
            </Link>
            <Link 
            onClick={logoutHandler}
              className={`${location == "/logout" ? "text-blue-600" : "text-black"} ${login?"block":"hidden"}`}
            >logout
            </Link>
          </ul>
        </div>
        <div className='bg-gray-300 w-[20%] flex items-center justify-end pr-6 py-2 '>
          <div className='w-[50px]'>
            <img className='rounded-full' src="https://www.bunaai.com/cdn/shop/products/new-6118.jpg?v=1661810604&width=360" alt="" />
          </div>
        </div>
      </div>
    </>
  )
}

