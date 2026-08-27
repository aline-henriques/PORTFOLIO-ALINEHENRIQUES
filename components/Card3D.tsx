"use client";

import { motion } from "framer-motion";

export default function Card3D({ children }: any) {

return(

<motion.div
whileHover={{
rotateX:10,
rotateY:-10,
scale:1.05
}}
transition={{type:"spring", stiffness:200}}
style={{transformStyle:"preserve-3d"}}
className="bg-white/5 backdrop-blur-lg p-6 rounded-xl shadow-xl"
>

{children}

</motion.div>

)

}