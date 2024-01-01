import { Link, NavLink } from 'react-router-dom'

import eksiLogo from '../assets/img/logo/Eksi_ikon.svg'
import eksiSearch from '../assets/img/logo/eksi-search.svg'

import message from '../assets/img/logo/message.svg'
import seismometer from '../assets/img/logo/seismometer.svg'
import threePointer from '../assets/img/logo/three-point-leader.svg'
import { useState, useContext, useEffect } from 'react'

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
const supabaseUrl = 'https://rpllnpgdbmsvfqxnybcp.supabase.co';
const supaPost = supabaseUrl + '/rest/v1/posts';
const secretKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwbGxucGdkYm1zdmZxeG55YmNwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5Njc5NjE4OSwiZXhwIjoyMDEyMzcyMTg5fQ.0ue9i9JYMQKBX93LN2JGVYW0q1_UdKcAEHze7zLKlXM';
const supabase = createClient(supabaseUrl, secretKey);

import { GlobalContext } from '../Context/GlobalContext.jsx'
import { ppdetail } from './Profil.jsx'

function Navbar() {

    const { setNavCategory,isLoggedIn, logUser, isGender, genderUser, logOut } = useContext(GlobalContext);
    console.log(isGender);

    const userLink = '/birisi/' + logUser;
    
    function SignIn(){
        return(
            <>
                <NavLink to={userLink} onClick={ppdetail(logUser)} className="flex items-center max-sm:w-[20px] max-sm:h-[25px] hover:underline cursor-pointer">
                    <img src={genderUser()} alt="" />
                    <h1 className='eksi-text eksi-mesage'> {logUser} </h1>
                </NavLink>

                <div className="flex gap-1 items-center justify-center max-md:w-[25px] max-md:h-[25px] p-px md:py-1 md:px-3 eksi-color rounded-md cursor-pointer hover:underline text-white">
                    <img className='' src={message} alt="" />
                    <h1 className='eksi-mesage'>mesaj</h1>
                </div>

                <div className="flex gap-1 items-center justify-center max-md:w-[25px] max-md:h-[25px] md:py-1 md:px-3 eksi-color rounded-md hover:underline cursor-pointer text-white">
                    <img src={seismometer} alt="" />
                    <h1 className='eksi-mesage'>olay</h1>
                </div>

                <div className="flex items-center">
                    <img className='cursor-pointer eksi-mesage' src={threePointer} alt="" />
                </div>
                
                {/* <div className="flex mt-4">
                    <button onClick={logOut} className='hover:text-white bg-slate-100 px-5 py-1 mb-4 hover:bg-[#ff4b4b] rounded-md transition-all' type="submit">Git Burdan</button>
                </div> */}

            </>
        )
    }

    function SignOut(){
        return(
            <>
                <div className="eksi-text">
                    <NavLink to='/giris' className='hover:underline decoration-1 min-[300px]:hidden xl:block' >giriş</NavLink>
                </div>

                <div className="eksi-text">
                    <NavLink to='/kayitOl' className='hover:underline decoration-1 min-[300px]:hidden xl:block'>kayıt ol</NavLink>
                </div>
            </>
        )
    }

    function LoginBar(){
        return(
            <>
                <div className="flex xl:gap-8 justify-center items-center text-sm font-bold min-[300px]:mb-0 xl:mb-0 mb-4">
                    <div className="eksi-nav">
                        <NavLink className='px-8 py-4' to='/'>gündem</NavLink>
                    </div>

                    <div className="eksi-nav">
                        <NavLink className='px-8 py-4' to='/debe'>debe</NavLink>
                    </div>

                    <div className="eksi-nav">
                        <NavLink className='px-8 py-4 min-[300px]:hidden xl:block' to='/sorunsallar'>sorunsallar</NavLink>
                    </div>

                    <div className="eksi-nav">
                        <NavLink className='px-8 py-4 min-[300px]:hidden xl:block' to='/spor'>#spor</NavLink>
                    </div>
            
                    <div className="eksi-nav">
                        <NavLink className='px-8 py-4 min-[300px]:hidden xl:block' to='/iliskiler'>#ilişkiler</NavLink>
                    </div>

                    <div className="eksi-nav">
                        <NavLink className='px-8 py-4 min-[300px]:hidden xl:block' to='/siyaset'>#siyaset</NavLink>
                    </div>

                    {isLoggedIn ? <SignNav /> : <SignOutNav />}
                </div>
            </>
        )
    }
    
    function SignNav(){
        return(
            <>
                <div className="eksi-logOut">
                    <button onClick={logOut} className='px-8 py-4'>Terket</button>
                </div>
            </>
        )
    }

    function SignOutNav(){
        return(
            <>
                <div className="eksi-nav">
                    <NavLink to='/giris' className='px-4 py-4 xl:hidden min-[300px]:block'>giriş</NavLink>
                </div>

                <div className="eksi-nav">
                    <NavLink to='/kayitOl' className='px-4 py-4 xl:hidden'>kayıtOl</NavLink>
                </div>
            </>
        )
    }
    
    function LogOutBar(){
        return(
            <>
                <div className="flex xl:gap-8 justify-center items-center text-sm font-bold xl:mb-0 lg:mb-0">
                    <div className="eksi-nav">
                        <NavLink className='px-8 py-4 min-[300px]:px-4' to='/'>gündem</NavLink>
                    </div>

                    <div className="eksi-nav">
                        <NavLink className='px-8 py-4 min-[300px]:px-4' to='/debe'>debe</NavLink>
                    </div>

                    <div className="eksi-nav">
                        <NavLink className='px-8 py-4 min-[300px]:hidden xl:block' to='/sorunsallar'>sorunsallar</NavLink>
                    </div>

                    <div className="eksi-nav">
                        <NavLink className='px-8 py-4 min-[300px]:hidden xl:block' to='/spor'>#spor</NavLink>
                    </div>
            
                    <div className="eksi-nav">
                        <NavLink className='px-8 py-4 min-[300px]:hidden xl:block' to='/iliskiler'>#ilişkiler</NavLink>
                    </div>

                    <div className="eksi-nav">
                        <NavLink className='px-8 py-4 min-[300px]:hidden xl:block' to='/siyaset'>#siyaset</NavLink>
                    </div>

                    {isLoggedIn ? '' : <SignOutNav />}
                </div>
            </>
        )
    }
    return(
    <>
        <div className="sticky top-0 z-10 bg-white">
                <div className="h-1 eksi-color mb-4"></div>
            <div className="flex flex-col">
                <div className="flex mb-3 place-items-center justify-center xl:gap-24 min-[300px]:gap-3">
                    <div className='flex place-items-center xl:gap-28 xl:mr-24'>
                        <div className="xl:px-2 mr-2 mb-2 sm:mr-7 flex place-items-center font-bold text-2xl">
                            <img className='w-5 h-5' src={eksiLogo} alt="" />
                            <h1 className='text-gray-800 min-[250px]:hidden xl:block'>tatlış</h1>
                            <h1 className='eksi-logo min-[250px]:hidden xl:block'>sözlük</h1>
                        </div>
                        <div className="mb-2 flex font-normal">
                            <input className='focus-visible:outline-none h-7 rounded-md eksi-search max-sm:w-[150px] 2xl:w-96 xl:w-56 xl:px-3 xl:py-1' type="search" name="search" placeholder='baslik#entry@yazar' id="" />
                            <button><img className='relative eksi-search-box rounded-e-md p-1 sm:w-[33px] sm:h-[28px] min-[300px]:w-[25px] min-[300px]:h-[28px] right-[5px]' src={eksiSearch} alt="" /></button>
                        </div>
                    </div>

                    <div className="flex gap-2 items-center">
                        {isLoggedIn ? <SignIn />:<SignOut />}
                    </div>
                </div>

                {isLoggedIn ? <LoginBar /> : <LogOutBar />}

                <div className="w-full h-px eksi-stack"></div>

            </div>
        </div>
    </>)
}

export default Navbar