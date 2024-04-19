import React from 'react'
import Login from './Components/User/Login'
import NavBar from './Components/NavBar'
import Blog from './Components/Blog'
import SignUp from './Components/User/SignUp'


import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

export default function App() {
  return (
    <>
     <BrowserRouter>
     <NavBar/>
    <Routes>
       <Route exact path ="/" element ={<Blog/>}/>
       <Route exact path ="/Login" element ={<Login/>}/>
       <Route exact path ="SignUp" element ={<SignUp/>}/>
    </Routes>
   </BrowserRouter>
    </>
  )
}
