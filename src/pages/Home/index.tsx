/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Home () {
  const [userName, setUserName] = useState(localStorage.getItem('UserName'))
  const navigate = useNavigate()
  
  useEffect(()=>{
    userName == null && navigate("/") 
  },[userName])

  return(
    <main>
      <h1 className="lead">
        { userName && `User: ${userName}`}
      </h1>
    </main>
  )
}