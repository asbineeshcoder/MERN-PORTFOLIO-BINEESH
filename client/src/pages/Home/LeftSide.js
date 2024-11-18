import React from 'react'

function LeftSide() {
    return (
        <div className="fixed left-0 bottom-0 px-6 sm:static">
            <div className='flex flex-col items-center'>
            <div className='flex flex-col gap-2 sm:flex-row'>
                <a href='https://google.com' target="_blank">
                {" "}
            <i class="ri-mail-fill text-white text-4xl"></i>
            </a>
            <i class="ri-linkedin-box-fill text-white text-4xl"></i>
            <i class="ri-facebook-circle-fill text-white text-4xl"></i>
            <i class="ri-instagram-fill text-white text-4xl"></i>
            <i class="ri-whatsapp-fill text-white text-4xl"></i>
        </div>
            <div className="w-[1px] h-52 bg-header sm:hidden">
            </div>
        </div>
        </div>
    )
}

export default LeftSide