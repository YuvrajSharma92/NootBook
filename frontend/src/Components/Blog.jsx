import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


export default function Blog() {
    const navigate = useNavigate()
    const [click, setClick] = useState(false)
    const [notes, setNotes] = useState([])
    const [id, setid] = useState("")
    const [login, setLogin] = useState( )

    const [info, setInfo] = useState({
        title: "",
        description: ""

    })

    const setNotesHandler = async (e) => {
        e.preventDefault()

        if (info.title.length >= 3 && info.description.length >= 10) {
            // notes.push(info)
            if (id) {
                await updateHandler(id)

            } else {

                await postnotehandler()
            }

            getNotes()
            setClick(!click)

        }
    }

    const postnotehandler = async () => {
        let user = await JSON.parse(localStorage.getItem("User"));
        let data = await fetch(`${import.meta.env.VITE_API_KEY}/post/note`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "userId": user._id
            },
            body: JSON.stringify(info)
        })
        let res = await data.json()
        console.log(res);
    }

    const deleteHandler = async (id) => {
        if (confirm("are you sure?")) {
            await fetch(`${import.meta.env.VITE_API_KEY}/delete/note/${id}`, {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json' },
            })
            alert("Note deleted successfully")
            getNotes()
        }
    }

    const updateHandler = async (id) => {
        await fetch(`${import.meta.env.VITE_API_KEY}/update/note/${id}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(info)
        })
    }

    const getNotes = async () => {
        let user = await JSON.parse(localStorage.getItem("User"));

        const data = await fetch(`${import.meta.env.VITE_API_KEY}/get/notes`, {
            headers: {
                "userId": user._id
            }
        })
        const note = await data.json()
        setNotes(note.note)
        // console.log(note);
    }
    useEffect(() => {
        if (!localStorage.getItem("User")) {
            setLogin(false)
            return navigate("/login")
        }
        getNotes()
    }, [])

    return (
        <>
            <div className='min-h-[100vh]'>
                <div className={`flex items-center justify-center pt-3`}>
                    <div
                        onClick={() => {
                            setClick(!click)
                            setid(null)
                        }} className='bg-gray-300 w-[80%] sm:w-[30%] rounded-xl flex flex-col items-center justify-center text-center'>
                        <i className="cursor-pointer text-[60px] bi bi-plus"></i>
                        <h1 className='pb-4 font-medium text-[30px]'>Add</h1>
                    </div>

                </div>

                <div className={`bg-pink-300  z-10 w-[80%] sm:w-[50%] absolute top-[30%] ${!click && "hidden"} left-[10%] sm:left-[25%] rounded-xl text-end`}>
                    <i onClick={() => {
                        setClick(!click)
                    }} className="pr-4 text-[23px] cursor-pointer  bi bi-x-lg"></i>

                    <div className='rounded-lg flex justify-center items-center'>
                        <form
                            action="" className='py-10 font-medium  rounded-lg text-start'
                        >
                            <label
                                htmlFor="" className='py-2 block text-[22px]'
                            >Title</label>

                            <input
                                required
                                minLength={3}
                                type="text"
                                onChange={(e) => {
                                    e.preventDefault();
                                    setInfo({ ...info, title: e.target.value })

                                }}
                                className='p-2 outline-none rounded-lg border-[1px] border-black ' placeholder='Enter Your Title'
                            />

                            <label
                                htmlFor="" className='py-2 block text-[22px]'
                            >description</label>

                            <textarea
                                required
                                minLength={10}
                                onChange={(e) => {
                                    e.preventDefault();
                                    setInfo({ ...info, description: e.target.value })
                                }}
                                type="text" name="" id="" className='p-2 outline-none rounded-lg border-[1px] border-black' placeholder='Enter Your Des..'
                            />

                            <div className='flex items-center justify-center'>
                                <button onClick={setNotesHandler} className='bg-white font-medium px-4 py-1 text-[18px] mt-2 rounded-lg'>{id ? "Update" : "Save"}</button>

                            </div>

                        </form>
                    </div>
                </div>
                <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 items-ceznter place-content-center place-items-center justify-evenly py-5'>

                    {notes && notes.map((item) => (
                        <div className='bg-gray-300 w-[90%] min py-7 rounded-lg flex items-center justify-between px-4'>
                            <div>
                                <h1 className='text-2xl font-medium'>{item.title}</h1>
                                <p className=''>{item.description}</p>
                                {/* <p>{item._id}</p> */}
                            </div>
                            <div className='flex flex-col gap-3'>
                                <button onClick={() => {
                                    setClick(!click);

                                    setid(item._id)
                                }} ><i className="bi bi-pencil-square"></i></button>
                                <button onClick={() => { deleteHandler(item._id) }}><i className="bi bi-trash3 hover:text-red-700"></i></button>
                            </div>
                        </div>
                    ))}



                </div>


            </div>
        </>
    )
}
