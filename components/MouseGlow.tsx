"use client";

import { useEffect, useRef } from "react";

export default function MouseGlow() {

const glowRef = useRef<HTMLDivElement | null>(null)

useEffect(()=>{

const glow = glowRef.current

const move = (e:MouseEvent)=>{

if(!glow) return

glow.style.left = e.clientX + "px"
glow.style.top = e.clientY + "px"

}

window.addEventListener("mousemove",move)

return ()=> window.removeEventListener("mousemove",move)

},[])

return (

<div
ref={glowRef}
className="mouse-glow"
/>

)

}