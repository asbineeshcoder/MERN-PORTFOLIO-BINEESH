import React from 'react'

function SectionTitle({
    title,
}) {
    return (
        <div className='flex gap-5 items-center'>
            <h1 className="text 4xl text-others font-semibold">{title}</h1>
            <div className='w-60 h-[1px] bg-header'>
            </div>
        </div>
            )
}

            export default SectionTitle