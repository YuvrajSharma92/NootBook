import React, { useState } from 'react'

export default function SignUp() {

    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: ""
    })

    const SignUpHandler = async (e) => {
        e.preventDefault()
        let data = await fetch("http://127.0.0.1:8000/user/SignUp", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        })
        let res = await data.json()
        console.log(res);
    }

    const inputChangeHandler = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
        console.log(credentials);
    }
    return (
        <>
            <div className='min-h-[100vh] pt-4'>
                <h1 className='text-center text-[25px] font-medium text-white'>Register</h1>
                <div className='w-full my-5 flex items-center justify-center'>
                    <div className='rounded-lg flex justify-center items-center'>
                        <form
                            action="" className='bg-gray-300 py-10 font-medium px-10  rounded-lg'
                        >

                            <label
                                htmlFor="" className='py-2 block text-[22px]'
                            >Name</label>
                            <input name='name' onChange={inputChangeHandler}
                                type="text" className='p-2 outline-none rounded-lg border-[1px] border-black ' placeholder='Enter Your Name' required
                            />

                            <label
                                htmlFor="" className='py-2 block text-[22px]'
                            >Email</label>
                            <input onChange={inputChangeHandler}
                                type="text" name="email" id="" className='p-2 outline-none rounded-lg border-[1px] border-black' placeholder='Enter Your Email' required
                            />

                            <label
                                htmlFor="" className='py-2 block text-[22px]'>
                                Password</label>
                            <input onChange={inputChangeHandler}
                                type="password" name="password" id="" className='p-2 outline-none rounded-lg border-[1px] border-black' placeholder='Enter Your Password' required
                            />

                            <div className='flex items-center justify-center pt-4'>
                                <button onClick={SignUpHandler} className='bg-white font-medium px-4 py-1 text-[18px] mt-2 rounded-lg border-[1px] border-black'>Sign Up</button>

                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
