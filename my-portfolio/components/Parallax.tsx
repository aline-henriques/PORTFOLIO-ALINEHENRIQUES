"use client";

import { useEffect } from "react";

export default function Parallax(){

useEffect(()=>{

const move=(e:any)=>{

const x=(window.innerWidth/2-e.clientX)/60
const y=(window.innerHeight/2-e.clientY)/60

document.body.style.transform=`rotateY(${x}deg) rotateX(${y}deg)`

}

window.addEventListener("mousemove",move)

return ()=>window.removeEventListener("mousemove",move)

},[])

return null

}