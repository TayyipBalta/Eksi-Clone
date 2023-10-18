import { useState } from 'react'
import test from '../assets/img/logo/selfi.jpg'
function RelationShip(){
    const [count, setCount] = useState(0)
    function fav(){setCount(count => count + 1)}
    return(
        <>
        <div className="flex gap-14 justify-center">
            <div className="flex flex-col max-w-[200px] eksi-text">
                <h1>ilişkiler</h1>
            </div>
            <div className="flex flex-col place-items-center w-auto">
                <div className="">
                    <div className="flex flex-col gap-5 mb-4 rounded-lg text-base ">
                        <a href='#' className='hover:underline max-w-[200px]'>Lorem ipsum dolor sit amet.</a>
                        <p className='break-words max-w-[500px]'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe accusamus aliquid fugiat consequuntur, incidunt iure nulla fugit voluptate reprehenderit nobis amet facilis, minus ducimus sit! Quis nisi corrupti earum tempore?</p>
                    </div>

                    <div className="flex justify-between place-items-center gap-5">
                        <div className="flex gap-7">
                            <a href="#" title='Çokomelli!' className=" border-[1px] rounded-md eksi-sukela"><h1 className='relative eksi-sukela-text'>↑</h1></a>

                            <a href="#" title='öghh!' className=" border-[1px] rounded-md eksi-dislike"><h1 className='relative eksi-sukela-text'>↓</h1></a>

                            <div title='yaz bunu güzel laf!' className='flex gap-1'>
                                <svg onClick={fav} width="20px" className='eksi-damla cursor-pointer' height="20px" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg" fill="none">
                                    <path className='active:stroke-[#81C14B]' stroke="#494949" stroke-linejoin="round" stroke-width="12" d="M148 120c0 28.719-23.281 52-52 52s-52-23.281-52-52c0-32 52-98 52-98s52 66 52 98Z"/>
                                </svg>
                                <h1 className='eksi-damla-text cursor-pointer hover:underline'>{count}</h1>
                            </div>
                        </div>
                        <div className="flex gap-5 place-items-center">
                            <a href="#" title='paylaş' className=" border-[1px] eksi-share"><h1 className='relative eksi-share-text'>↑</h1></a>

                            <a title='diger madde' className='hover:text-green-700 text-xl eksi-text' href="#">...</a>
                        </div>
                        
                    </div>
                    {/* divider */}
                    <div className="mb-5"></div>
                    {/* divider */}
                    <div className="flex gap-4 justify-end">
                        <div className="">
                            <h1 className='eksi-logo hover:underline cursor-pointer'>TayyipBalta</h1>
                            <h1 className='eksi-text'>14.10.2023 01:40</h1>
                        </div>
                        <div className="">
                            <img className='w-12 h-12 rounded-full' src={test} alt="" />
                        </div>
                    </div>
                    {/* divider */}
                    <div className="mb-20"></div>
                    {/* divider */}
                </div>
                {/* diger yorumlar */}
            </div>
        </div>
        </>
    )
}

export default RelationShip