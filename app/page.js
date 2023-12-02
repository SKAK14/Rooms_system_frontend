"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const page = () => {
  const [rooms,setRooms]=useState("")
  const [Roomid, setRoomid] = useState("");
  const [Beds, setBeds] = useState("");
  const [IsFull, setIsFull] = useState("");
  const [Task, setTask] = useState([]);

  useEffect(async() => {
    const myFunction = async () => {
      const myRooms = await axios.get("https://localhost:7216/api/Rooms");
      setRooms(myRooms.data)
    };
    myFunction();
  }, [])
  

  const submitHandler = async (e) => {
    e.preventDefault(); // Prevent form submission
    setTask([...Task, { Roomid, Beds, IsFull }]);
    setRoomid("");
    setBeds("");
    setIsFull("");
    await axios.post("https://localhost:7216/api/Rooms", { id: Roomid, beds: Beds, isFull: Boolean(IsFull) });
    const myRooms = await axios.get("https://localhost:7216/api/Rooms");
    setRooms(myRooms.data)


  };
  
  const deleteHandler = async (i) => {
    await axios.delete("https://localhost:7216/api/Rooms/" +i );
    const myRooms = await axios.get("https://localhost:7216/api/Rooms");
    setRooms(myRooms.data)
  }



  let renderTask=<h2>no task avialable</h2>
  if (rooms.length>0) {
    renderTask=rooms.map((t,i)=>{
      return (
      <li key={i} className='flex justify-between'>
        <div className='flex justify-between'>
          <h5>{t.Id}</h5> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <h6>{t.Beds}</h6>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <p>{t.IsFull.toString()}</p>
        </div>
      <button onClick={()=>{
        deleteHandler(t.Id)
      }} className='bg-red-400 text-white px-4 py-1 rounded font-bold'>Delete</button>
      </li>);
    })
  }
  return (
    <>
    <h1 className='bg-black text-white p-5 text-5xl font-bold text-center'> $K@K Room List</h1>
    <form>
      <input type='number' className='text 2xl border-zinc-800 border-2 m-5 px-4 py-2' placeholder='Room Id' value={Roomid} onChange={(e)=>{setRoomid(e.target.value)}}/>
      <input type='number' className='text 2xl border-zinc-800 border-2 m-5 px-4 py-2' placeholder='Beds'value={Beds} onChange={(e)=>{setBeds(e.target.value)}}/>
      <input type='text' className='text 2xl border-zinc-800 border-2 m-5 px-4 py-2' placeholder='Is Full'value={IsFull}onChange={(e)=>{setIsFull(e.target.value)}}/>
      
      <button onClick={submitHandler} className='btn bg-black text-white px-4 py-2 text-2xl font-bold round m-5'>Add</button>
    </form>
    <hr/>
    <div className='p-8 bg-slate-200'>
      <ul>
        {renderTask}
      </ul>
    </div>
    </>
  );
}

export default page