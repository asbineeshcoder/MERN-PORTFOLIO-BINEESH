import React from 'react'
import SectionTitle from '../../components/SectionTitle'
import { useSelector } from 'react-redux';

function Projects() {
    const [selectedItemindex, setselectedItemindex] = React.useState(0);
    const { portfolioData } = useSelector((state) => state.root);
    const { projects } = portfolioData;

    return (
        <div className=' py-3 text-xl'>
            <SectionTitle title="Projects" />
            <div className="flex py-10 gap-20 sm:flex-col">
                <div className="flex flex-col gap-6 sm:text-l sm:gap-2 border-l-2 border-green w-1/3 sm:flex-row sm:overflow-x-scroll sm:w-full">
                    {projects.map((projects, index) => (
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
                                {projects.title}
                            </h1>
                        </div>
                    ))}
                </div>

                <div className="flex items-left justify-center gap-10 sm:flex-col">
                    <img src={projects[selectedItemindex].image} alt="" className="h-90 w-90" />
                    <div className="flex flex-col gap-3">
                        <hi className="text-orange font-bold text-4xl sm:text-l"> {projects[selectedItemindex].title}</hi>
                        {/*<hi className="text-green font-semibold text-xl "> {projects[selectedItemindex].company}</hi>*/}
                        <hi className="text-white"> {projects[selectedItemindex].description}</hi>
                    </div>
                </div>
            </div>
        </div>


    )
}


export default Projects