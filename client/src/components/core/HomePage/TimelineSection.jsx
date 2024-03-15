import React from 'react'

import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timelineImage from "../../../assets/Images/TimelineImage.png"

const timeline = [
    {
        Logo: Logo1,
        heading: "Leadership",
        Description:"Fully committed to the success company",
    },
    {
        Logo: Logo2,
        heading: "Leadership",
        Description:"Fully committed to the success company",
    },
    {
        Logo: Logo3,
        heading: "Leadership",
        Description:"Fully committed to the success company",
    },
    {
        Logo: Logo4,
        heading: "Leadership",
        Description:"Fully committed to the success company",
    },
];

const TimelineSection = () => {
  return (
    <div>
      <div className='flex flex-row flex-wrap gap-6  items-center lg:flex-nowrap lg:gap-15'>

        <div className='flex flex-col gap-16 lg:w-[45%] ' >
            {
                timeline.map( (element, index) => {
                    return (
                        <div className='flex flex-row gap-10 ' key={index}>

                            <div className='w-[50px] h-[50px] bg-white flex justify-center  items-center  rounded-full shadow-[0px_0px_20px_10px_#00000024] relative'>
                                <img src={element.Logo}  />
                                <div className='absolute bottom-16 border-r-[1px] border-dashed border-richblack-100'>
                                <p className={index ?`{ h-10  lastOne}`: ""}></p>
                                </div>
                            </div>

                            <div>
                                <h2 className='font-semibold text-[18px]'>{element.heading}</h2>
                                <p className='text-base'>{element.Description}</p>
                            </div>

                        </div>
                    )
                } )
            }
        </div>
        <div className='relative shadow-blue-200 z-10'>

            <img  src={timelineImage}
            alt="timelineImage"
            className='shadow-white object-cover h-fit '
            />

            <div className='absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-7
                            left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                <div className='flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-7'>
                    <p className='text-3xl font-bold'>10</p>
                    <p className='text-caribbeangreen-300 text-sm'>Years of Experience</p>
                </div>

                <div className='flex gap-5 items-center px-7'>
                <p className='text-3xl font-bold'>250</p>
                    <p className='text-caribbeangreen-300 text-sm'>TYpe of Courses</p>
                </div>

            </div>
            <div className={"w-[330px] h-[250px] blur-[40px]  bg-gradient-to-br from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] rounded-[50%] absolute top-20 left-[-1rem] -z-10 lg:w-[110%] lg:h-[50%]"}></div>

        </div>

      </div>
    </div>
  )
}

export default TimelineSection
