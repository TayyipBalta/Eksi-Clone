import { useEffect, useState } from 'react';

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabaseUrl = 'https://rpllnpgdbmsvfqxnybcp.supabase.co';

const supaPost = supabaseUrl + '/rest/v1/posts';

const secretKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwbGxucGdkYm1zdmZxeG55YmNwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5Njc5NjE4OSwiZXhwIjoyMDEyMzcyMTg5fQ.0ue9i9JYMQKBX93LN2JGVYW0q1_UdKcAEHze7zLKlXM';

const supabase = createClient(supabaseUrl, secretKey);

import test from '../assets/img/logo/selfi.jpg'
function Politics(){
    const [count, setCount] = useState(0);
    const [responseEntry, setEntry] = useState([]);
    const [avatar, setAvatar] = useState([]);
    
    function fav(){
        if(count === 1){
            setCount(count => count - 1);
        }
        else{
            setCount(count => count + 1);

        }
    }

    const defaultImage = 'default-profile-picture-light.svg';
    useEffect(() => {
        renderEntry();
    },[setAvatar, setEntry]);
    const addPost = async(e) => {
        e.preventDefault();
        const postFormData = Object.fromEntries(new FormData(e.target));
        console.log(postFormData);
        console.log(supaPost);

        const { okey } = await supabase
        .from('posts')
        .insert({
            title: postFormData.title,
            nickname: postFormData.nickname,
            entry: postFormData.entry,
            image: postFormData.image.name ? postFormData.image.name: defaultImage,
        })

        okey && alert('sikinti var kanks');

        await supabase
        .storage
        .from('images')
        .upload(postFormData.image.name, postFormData.image)
        renderEntry();
    }

    const renderEntry = async() => {
        const response = await fetch(supaPost,{
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${secretKey}`,
                'apiKey': secretKey
            }
        }).then(x => x.json());
        setEntry(response);
        for(const responses of response){
            const image = await supabase
        .storage
        .from('images')
        .getPublicUrl(responses.image);
        setAvatar(image);
        }
    }
    console.log(responseEntry);
    console.log(avatar);

    function GetEntry(){
        return(responseEntry.map((entry => 
            <div key={entry.id} className="xl:w-[500px] max-w-[500px]">
                    <div className="flex flex-col gap-5 mb-4 rounded-lg text-base ">
                        <a href='#' className='hover:underline xl:w-[200px] max-w-[200px]'>{entry.title}</a>
                        <p className='break-words max-w-[500px]'> {entry.entry} </p>
                    </div>

                    <div className="flex justify-between place-items-center gap-5">
                        <div className="flex gap-7">
                            <a href="#" title='Çokomelli!' className=" border-[1px] rounded-sm eksi-sukela"><h1 className='relative eksi-sukela-text'>↑</h1></a>

                            <a href="#" title='öghh!' className=" border-[1px] rounded-sm eksi-dislike"><h1 className='relative eksi-sukela-text'>↓</h1></a>

                            <div title='yaz bunu güzel laf!' className='flex gap-1'>
                                <svg onClick={fav} width="20px" className='eksi-damla cursor-pointer' height="20px" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg" fill="none">
                                    <path className='active:stroke-[#81C14B]'  stroke="#494949" d="M148 120c0 28.719-23.281 52-52 52s-52-23.281-52-52c0-32 52-98 52-98s52 66 52 98Z"/>
                                </svg>
                                <h1 className='eksi-damla-text cursor-pointer hover:underline'>{count}</h1>
                            </div>
                        </div>
                        <div className="flex gap-5 place-items-center">
                            <a href="#" title='paylaş' className=" border-[1px] eksi-share"><h1 className='relative eksi-share-text'>↑</h1></a>

                            <a title='diğer' className='hover:text-green-700 text-xl eksi-text' href="#">...</a>
                        </div>
                        
                    </div>
                    {/* divider */}
                    <div className="mb-5"></div>
                    {/* divider */}
                    <div className="flex gap-4 justify-end">
                        <div className="">
                            <h1 title={entry.nickname} className='eksi-logo hover:underline cursor-pointer'> {entry.nickname} </h1>
                            <h1 className='eksi-text'> {entry.created_at} </h1>
                        </div>
                        <div className="">
                            <img className='w-12 h-12 rounded-full' src={'https://rpllnpgdbmsvfqxnybcp.supabase.co/storage/v1/object/public/images/' + entry.image} alt="" />
                        </div>
                    </div>
                    {/* divider */}
                    <div className="mb-20"></div>
                    {/* divider */}
                </div>)))}
    return(
        <>
        <div className="flex gap-5 justify-center ">
            <div className="flex flex-col max-w-[200px] eksi-text xl:block max-sm:hidden sm:hidden">
                <h1 className='mb-2'>#siyaset</h1>
                <a href="#" className='px-20 py-2 border-2 hover:text-[#81C14B] transition-all' >yenile</a>
            </div>
            <div id='entryList' className="flex flex-col place-items-center w-auto mx-11">
                <div className="flex max-sm:hidden">
                    <form onSubmit={addPost} id='postForm'>
                        <div id="titleForm">
                            <input required className='bg-slate-100 p-1 mb-4 w-[400px] rounded-md' placeholder='Başlık' type="text" name="title" id="" />
                        </div>

                        <div id="titleForm">
                            <input required className='bg-slate-100 p-1 mb-4 w-[400px] rounded-md' placeholder='NickName' type="text" name="nickname" id="" />
                        </div>

                        <div id='textForm' className="">
                            <textarea required className='p-4 bg-slate-100 rounded-lg' placeholder='Entry' name="entry" id="post" cols="60" rows="5"></textarea>
                        </div>

                        <div className='mb-4' id="imageForm">
                            <input  type="file" name="image" id="" />
                        </div>
                        <button className='bg-slate-100 px-5 py-1 mb-4 hover:bg-[#81C14B] rounded-md transition-all' type="submit">Gönder</button>
                    </form>
                </div>
                <div className="">
                    <div className="flex flex-col gap-5 mb-4 rounded-lg text-base ">
                        <a href='#' className='hover:underline max-w-[200px]'>Lorem ipsum dolor sit amet.</a>
                        <p className='break-words max-w-[500px]'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe accusamus aliquid fugiat consequuntur, incidunt iure nulla fugit voluptate reprehenderit nobis amet facilis, minus ducimus sit! Quis nisi corrupti earum tempore?</p>
                    </div>

                    <div className="flex justify-between place-items-center gap-5">
                        <div className="flex gap-7">
                            <a href="#" title='Çokomelli!' className=" border-[1px] rounded-sm eksi-sukela"><h1 className='relative eksi-sukela-text'>↑</h1></a>

                            <a href="#" title='öghh!' className=" border-[1px] rounded-sm eksi-dislike"><h1 className='relative eksi-sukela-text'>↓</h1></a>

                            <div title='yaz bunu güzel laf!' className='flex gap-1'>
                                <svg onClick={fav} width="20px" className='eksi-damla cursor-pointer' height="20px" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg" fill="none">
                                    <path className='active:stroke-[#81C14B]'  stroke="#494949" d="M148 120c0 28.719-23.281 52-52 52s-52-23.281-52-52c0-32 52-98 52-98s52 66 52 98Z"/>
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
                <GetEntry />
            </div>
        </div>
        </>
    )
}

export default Politics