import React from 'react'
import SectionTitle from '../../components/SectionTitle'
import { useSelector } from 'react-redux';

function Courses() {
    const [selectedItemindex, setselectedItemindex] = React.useState(0);
    const { portfolioData } = useSelector((state) => state.root);
    const { courses } = portfolioData;
    return (
        <div className=' py-3 text-xl'>
            <SectionTitle title="Training & Certifications" />
            <div className="flex py-10 gap-20 sm:flex-col">
                <div className="flex flex-col gap-6 sm:text-l sm:gap-2 border-l-2 border-green w-1/3 sm:flex-row sm:overflow-x-scroll sm:w-full">
                    {courses.map((courses, index) => (
                        <div
                            onClick={() => {
                                setselectedItemindex(index);
                            }}
                            className='cursor-pointer'
                        >
                            <h1
                                className={`text-xl sm:text-l px-5
                                ${selectedItemindex === index
                                        ? 'text-green border-green border-l-4 ml-[3px] bg-[green] opacity-[1] py-3 sm:w-full'
                                        : 'text-white'
                                    } `}
                            >
                                {courses.title}
                            </h1>
                        </div>
                    ))}
                </div>
                   
                <div className="flex items-left justify-center gap-10 sm:flex-col">
                   <img src={courses[selectedItemindex].image} alt="" className="h-30 w-30" />
                    <div className="flex flex-col gap-3">
                        <hi className="text-orange font-bold text-4xl sm:text-l"> {courses[selectedItemindex].title}</hi>
                        <hi className="text-green font-semibold text-xl "> {courses[selectedItemindex].company}</hi>
                        <hi className="text-white"> {courses[selectedItemindex].description}</hi>
                    </div>
                </div>
            </div>
            </div>
    )
}


export default Courses