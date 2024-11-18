import React from 'react'
import SectionTitle from '../../components/SectionTitle'
import { useSelector } from 'react-redux';

function About() {
    const { loading, portfolioData } = useSelector((state) => state.root);
    const { about } = portfolioData;
    const { skills, lottieURL, description1, description2 } = about;
    return (
        <div>
            <SectionTitle title="About Me" />
            <div className="flex w-full gap-7 item-center sm:flex-col">
                <div className="h-[60vh] w-60% sm:w-full">
                    <lottie-player
                        src={lottieURL}
                        background="##FFFFFF"
                        speed="1"
                        loop
                        autoplay
                        mode="transparent">
                    </lottie-player>
                </div>
                <div className="flex flex-col gap-7 w-3/4 px-10 py-20">
                    <p className="text-others">
                        {description1 || ""}
                    </p>
                    <p className='text-others'>{description2 || ""}
                    </p>
                </div>
            </div>
            <div className='py-3'>
                <h1 className='text-others text-2xl'>Here are a few Technologies I've been working with..
                </h1>
                <div className='flex flex-wrap gap-10 mt-5'>
                    {skills.map((skills, index) => (
                        <div className="border border-tertiary py-3 px-10">
                            <h1 className='text-others gap-3 text-1.5xl'>{skills}</h1>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default About