'use client'
import { useRef, useState } from "react";
import { motion } from "framer-motion";

const FlashText = ({ children = "insert_your|text_here", className = "", delay = 4000 }) => {
   
   let text
      
      text = children && children.split( "|" );
   const [sliderText, setSliderText] = useState(
      text[1] ? text[1] : null
   );
   
   const [titleOpacity, setTitleOpacity] = useState(1);
   const [titleY, setTitleY] = useState(-10);
   const [isAnimation, setIsAnimation] = useState(true);

   const counter = useRef(0);
   const timer = useRef();
   let word;

   const textEngine = text => {
      text.map((w, i) => {
         if (counter.current >= text.length) counter.current = 0;
         if (i === counter.current) word = w;
      });
      counter.current++;
      setSliderText(word);
   };

   const timeLoop = () => {
      timer.current = setInterval(() => {
         setTitleOpacity(0);
         setTitleY(10);
         setTimeout(() => {
            textEngine(text);
         }, 800);
         setTimeout(() => {
            setTitleOpacity(1);
            setTitleY(0);
         }, 800);
      }, delay);
   };

   if (isAnimation) {
      timeLoop();
      setIsAnimation(false);
   }
   return (
      <motion.span
         key={sliderText}
         initial={{ opacity: 0, y: 100 }}
         animate={{
            opacity: titleOpacity,
            y: titleY,
            scale: titleY,
         }}
         className={className}
         whileHover={() => {
            clearInterval(timer.current);
         }}
         onHoverEnd={() => {
            timeLoop();
            setIsAnimation(true);
         }}>
         {sliderText}
      </motion.span>
   );
};

export default FlashText;
