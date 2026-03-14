"use client"

import { useEffect } from "react"

export default function ScrollReveal(){

useEffect(()=>{

const elements=document.querySelectorAll(".reveal")

const observer=new IntersectionObserver(entries=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
entry.target.classList.add("visible")
}
})
},{threshold:.2})

elements.forEach(el=>observer.observe(el))

},[])

return null

}