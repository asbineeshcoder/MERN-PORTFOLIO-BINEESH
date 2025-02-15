import React from 'react'
import '../../index.css';
import { useSelector } from 'react-redux';

function Intro() {
    const {loading , portfolioData} = useSelector((state) => state.root);
    const {intro} = portfolioData;
    const {firstName , lastName , welcomeText , description , caption} = intro;
    return (
        <div className="h-[80vh] bg-primary flex flex-col items-start justify-center gap-8 py-10">
            <h1 className='text-white'>{welcomeText || ''}</h1>
            <h1 style={{ fontFamily: '"Teko", sans-serif' }} className='text-7xl sm:text-3xl text-secondary font-bold'>{firstName || ""} {lastName || ""}</h1>
            <h1 className='text-6xl sm:text-2xl text-others font-normal'>{caption || ""}</h1>
            <p className='text-white'>{description || ""}</p>
            <button className="border-2 border-tertiary text-white px-10 py-3 rounded">Get Started</button>
        </div >
    );
}



export default Intro