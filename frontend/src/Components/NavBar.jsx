import React, {} from 'react'
import { Link, useLocation,} from 'react-router-dom'

export default function NavBar() {
  const location = useLocation().pathname;
  return (
    <>
      <div className='w-full flex text-[18px]'>
        <div className='bg-gray-300 w-[90%] font-medium'>
          <ul className='flex items-center gap-5 sm:gap-9 pt-5 px-3'>
            <Link to={"/"}
             className={`${location == "/" ? "text-blue-600" : "text-black"}`}
             >Home
            </Link>

            <Link to={"/Login"}
            className={`${location == "/Login" ? "text-blue-600" : "text-black"}`}
             >Login
            </Link>
            <Link to={"/SignUp"}
            className={`${location == "/SignUp" ? "text-blue-600" : "text-black"}`}
            >Sign Up
            </Link>
          </ul>
        </div>
        {/* <div className='bg-gray-300 flex items-center justify-center'>
           <button>remove</button>
        </div> */}
        <div className='bg-gray-300 w-[10%] flex items-center justify-end pr-6 py-2 '>
          <div className='w-[50px]'>
            <img className='rounded-full' src="https://www.bunaai.com/cdn/shop/products/new-6118.jpg?v=1661810604&width=360" alt="" />
          </div>
        </div>
      </div>
    </>
  )
}

