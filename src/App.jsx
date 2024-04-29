import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from './Appwrite/auth'
import {login,logout} from "./Store/AuthSlice" 
import { Outlet } from 'react-router-dom'
import {Header,Footer} from "./Components"

function App() {

  const [loading,setLoading]=useState(true)

  const dispatch=useDispatch()

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }
      else{
        dispatch(logout())
      }
    })
    .finally(()=> setLoading(false))
  },[])

  return !loading?(
    <div className='min-h-sc flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header/>
        {/* <main>
          <Outlet/>
        </main> */}
        <Footer/>
      </div>
      test
    </div>
  ):(null)
}

export default App
