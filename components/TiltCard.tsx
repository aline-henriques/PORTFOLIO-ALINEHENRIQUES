"use client";

import { useRef } from "react";

export default function TiltCard({children}:{children:React.ReactNode}){

const ref = useRef<HTMLDivElement>(null)

const handleMove = (e:React.MouseEvent)=>{

const el = ref.current

if(!el) return

const rect = el.getBoundingClientRect()

const x = e.clientX - rect.left
const y = e.clientY - rect.top

const rotateX = (y/rect.height - 0.5) * -20
const rotateY = (x/rect.width - 0.5) * 20

el.style.transform = `
perspective(1000px)
rotateX(${rotateX}deg)
rotateY(${rotateY}deg)
scale(1.05)
`

}

const reset = ()=>{

if(ref.current)
ref.current.style.transform =
"perspective(1000px) rotateX(0) rotateY(0)"

}

return(

<div
ref={ref}
onMouseMove={handleMove}
onMouseLeave={reset}
className="tilt-card"
>

{children}

</div>

)

}