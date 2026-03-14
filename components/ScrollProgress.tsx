"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress(){

const [progress,setProgress] = useState(0)

useEffect(()=>{

const update = ()=>{

const scrollTop = window.scrollY

const height = document.body.scrollHeight - window.innerHeight

const percent = (scrollTop/height)*100

setProgress(percent)

}

window.addEventListener("scroll",update)

return ()=> window.removeEventListener("scroll",update)

},[])

return(

<div className="progress-bar">

<div
className="progress-fill"
style={{width: progress + "%"}}
/>

</div>

)

}