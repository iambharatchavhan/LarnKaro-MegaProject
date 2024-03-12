import React from 'react'
import CTAButton from "../Homepage/Button"
import HighlightText from './HighlightText'
import {FaArrowRight} from "react-icons/fa"
import { TypeAnimation } from 'react-type-animation'

const CodeBlocks = ({
    position, heading, subheading, ctabtn1, ctabtn2, codeblock, backgroudGradient, codeColor
}) => {
  return (
    <div className={`flex ${position} flex-wrap my-20 justify-between gap-10`}>
      
    {/*Section 1*/}
    <div className=' flex flex-col justify-center items-center gap-8 lg:w-[50%] lg:justify-normal lg:items-start'>
        {heading}
        <div className='text-richblack-300 font-bold '>
            {subheading}
        </div>

        <div className='flex gap-7 mt-7'>
            <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                <div className='flex gap-2 items-center'>
                    {ctabtn1.btnText}
                    <FaArrowRight/>
                </div>
            </CTAButton>

            <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>  
                    {ctabtn2.btnText}
            </CTAButton>
        </div>


    </div>

     {/*Section 2*/}
     <div className='relative h-fit  flex flex-row text-10[px] w-[100%] py-4 lg:w-[500px] bg-gray-600 rounded-sm bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20  border-[1px] border-[#ffffff0c]'> 
        {/*HW -> BG gradient*/}

        <div className='text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold'>
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>
        </div>

        <div className={` w-[300px] flex flex-col  flex-wrap gap-2 font-bold font-mono ${codeColor} pr-2  `}>
           <TypeAnimation
            sequence={[codeblock, 2000, ""]}
            repeat={Infinity}
            cursor={true}
           
            style = {
                {
                    whiteSpace: "pre-line",
                    display:"block",
                }
            }
            omitDeletionAnimation={true}
           />
        </div>
        <div className={`w-[200px] h-[150px]  blur-[110px] ${backgroudGradient}  rounded-full absolute top-0 left-0 z-0 opacity-50`}></div>

     </div>


    </div>
  )
}

export default CodeBlocks
