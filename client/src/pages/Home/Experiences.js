import React from 'react'
import SectionTitle from '../../components/SectionTitle'
import { useSelector } from 'react-redux'

function Experiences() {
    const [selectedItemindex, setselectedItemindex] = React.useState(0);
    const { portfolioData } = useSelector((state) => state.root);
    const { experiences } = portfolioData;
    
    return (
        <div className=' py-10 text-xl'>
            <SectionTitle title="Experiences" />

            <div className="flex py-10 gap-20 sm:flex-col">
                <div className="flex flex-col gap-6 border-l-2 border-green w-1/3 sm:flex-row sm:overflow-x-scroll sm:w-full">
                    {experiences.map((experience, index) => (
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
                                {experience.period}
                            </h1>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col gap-5">
                    <hi className="text-orange font-bold text-4xl"> {experiences[selectedItemindex].title}</hi>
                    <hi className="text-green font-semibold text-xl "> {experiences[selectedItemindex].company}</hi>
                    <hi className="text-white"> {experiences[selectedItemindex].description}</hi>
                </div>
            </div>
        </div>
    )
}

export default Experiences