import React from 'react'
import Instructor from "../../../assets/Images/Instructor.png"
import HighlightText from './HighlightText'
import CTAButton from "../HomePage/Button"
import { FaArrowRight } from 'react-icons/fa'

const InstructorSection = () => {
  return (
    <div className='mt-16'>
      <div className='flex flex-col-reverse gap-20 items-center lg:flex-row '>

     
      <div className='w-fit block lg:hidden'>
                <CTAButton active={true} linkto={"/signup"}>
                    <div className='flex flex-row gap-2 items-center'>
                        Start Learning Today
                        <FaArrowRight />
                    </div>
                </CTAButton>
            </div>

        <div className='lg:w-[50%]'>
            <img
                src={Instructor}
                alt=""
                className='lg:shadow-[-20px_-20px_0px_0px_#ffffff]'
            />
        </div>

        <div className='flex flex-col gap-10 lg:w-[50%] '>
            <div className=' text-4xl font-semibold lg:w-[50%]'>
                Become an
                <HighlightText text={"Instructor"} />
            </div>

            <p className='font-medium text-[16px]  text-richblack-300 lg:w-[80%]'>
            Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
            </p>

            <div className='w-fit hidden lg:block'>
                <CTAButton active={true} linkto={"/signup"}>
                    <div className='flex flex-row gap-2 items-center'>
                        Start Learning Today
                        <FaArrowRight />
                    </div>
                </CTAButton>
            </div>


        </div>

      </div>
    </div>
  )
}

export default InstructorSection
