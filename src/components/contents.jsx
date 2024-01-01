import { useContext, useEffect, useState } from 'react';
import { NavLink , Link} from 'react-router-dom';

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
const supabaseUrl = 'https://rpllnpgdbmsvfqxnybcp.supabase.co';

const supaPost = supabaseUrl + '/rest/v1/posts';
const supaLikes = supabaseUrl + '/rest/v1/likes';

const secretKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwbGxucGdkYm1zdmZxeG55YmNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY3OTYxODksImV4cCI6MjAxMjM3MjE4OX0.iwpTk5pJP-86barHJ-UTZr5hbtiWY3oj9VIyXUS0qMM';
const supabase = createClient(supabaseUrl, secretKey);

// import { getNickName } from './LittleComp'

import test from '../assets/img/logo/selfi.jpg'
import { GlobalContext } from '../Context/GlobalContext';
function contents(){
    const [count, setCount] = useState(0);
    const [responseEntry, setEntry] = useState([]);
    const [avatar, setAvatar] = useState([]);
    const [likes , setLikes] = useState([]);

    const { isLoggedIn , logUser , activeUser} = useContext(GlobalContext);
    
    console.log(isLoggedIn);
    console.log(activeUser);

    const { setActiveNavLink } = useContext(GlobalContext);

    const defaultImage = 'default-profile-picture-light.svg';
    useEffect(() => {
        renderEntry();
        renderLikes();
        switch(location.pathname){
            case '/':
                setActiveNavLink('#gündem');
                break;
            case '/debe':
                setActiveNavLink('#debe');
                break;
            case '/sorunsallar':
                setActiveNavLink('#sorunsallar');
                break;
            case '/spor':
                setActiveNavLink('#spor');
                break;
            case '/iliskiler':
                setActiveNavLink('#ilişkiler');
                break;
            case '/siyaset':
                setActiveNavLink('#siyaset');
                break;
            default:
                setActiveNavLink('');
                break;
        }
    },[setAvatar, setEntry , location.pathname]);
    const addPost = async(e) => {
        e.preventDefault();
        const postFormData = Object.fromEntries(new FormData(e.target));
        console.log(postFormData);
        console.log(supaPost);

        const NickName = logUser;
        
        const { okey } = await supabase
        .from('posts')
        .insert({
            title: postFormData.title,
            nickname: NickName,
            entry: postFormData.entry,
            image: defaultImage,
        })
        
        okey && alert('post gönderilemedi');
        
        // await supabase
        // .storage
        // .from('images')
        // .upload(postFormData.image.name, postFormData.image)
        renderEntry();
    }
    
    const likePost = async(entry) => {
        console.log(entry);
        const isLike = !!likes.find(like => like.user_id === activeUser.id && like.post_id === entry.id);
        if(isLike){
            console.log('bunu zaten beğendin');
            const { unLike , error } = await supabase
            .from('likes')
            .delete()
            .eq('post_id', entry.id)
            .eq('user_id', activeUser.id)
            .eq('nickname', logUser)

            renderLikes();
            unLike && error;

            if(unLike){
                console.log('unlike edildi');
            }else if(error){
                console.log('like silinemedi');
            }
        }else{
            const { like , error } = await supabase
            .from('likes')
            .insert({
                post_id: entry.id,
                user_id: activeUser.id,
                nickname: logUser,
            })

            renderLikes();
            like && error;
            if(like){
                console.log('bunu beğendin');
            }else if(error){
                console.log('beğenemedik');
            }
        }
    }

        const renderLikes = async() => {
            const resLikes = await fetch(supaLikes,{
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${secretKey}`,
                    'apiKey': secretKey,
                }
            }).then(x => x.json());
            
            setLikes(resLikes);
        }
        
        const renderEntry = async() => {
            const response = await fetch(supaPost,{
                headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${secretKey}`,
                'apiKey': secretKey
            }
        }).then(x => x.json());

        const reversedResponse = response.reverse();
        setEntry(reversedResponse);
        for(const responses of reversedResponse){
            const image = await supabase
        .storage
        .from('images')
        .getPublicUrl(responses.image);
        setAvatar(image);
        }
    }
    // console.log(responseEntry);
    // console.log(avatar);
    
    
    function GetEntry(){
        activeUser;
        
        return(responseEntry.map((entry => 
            <div key={entry.id} className="w-screen max-sm:px-4 xl:w-[500px] lg:w-[500px] md:w-[500px] sm:w-[500px] max-w-[500px]">
                    <div className="flex flex-col gap-5 mb-4 rounded-lg text-base ">
                        <a href='#' className='hover:underline xl:w-[200px] max-w-[200px]'>{entry.title}</a>
                        <p className='break-words max-w-[500px]'> {entry.entry} </p>
                    </div>

                    <div className="flex justify-between place-items-center gap-5">
                        <div className="flex gap-5">
                            <a href="#" title='Çokomelli!' className=" border-[1px] rounded-sm eksi-sukela"><h1 className='relative eksi-sukela-text'>↑</h1></a>

                            <a href="#" title='öghh!' className=" border-[1px] rounded-sm eksi-dislike"><h1 className='relative eksi-sukela-text'>↓</h1></a>
                            {likes.find(like => like.user_id === activeUser.id && like.post_id === entry.id) ?
                            <div title='yaz bunu güzel laf!' className='flex gap-1'>                                
                                <svg onClick={() => likePost(entry)} width="20px" className='eksi-damla cursor-pointer' height="20px" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg">
                                    <path className='active:stroke-[#81C14B]' fill='#81c14b' stroke="#494949" d="M148 120c0 28.719-23.281 52-52 52s-52-23.281-52-52c0-32 52-98 52-98s52 66 52 98Z"/>
                                </svg>
                                <h1 className='eksi-damla-text cursor-pointer hover:underline'>{likes.filter(like => like.post_id === entry.id).length}</h1>
                            </div>
                            :
                            <div title='yaz bunu güzel laf!' className='flex gap-1'>                                
                                <svg onClick={() => likePost(entry)} width="20px" className='eksi-damla cursor-pointer' height="20px" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg">
                                    <path className='active:stroke-[#81C14B]' fill= '' stroke="#494949" d="M148 120c0 28.719-23.281 52-52 52s-52-23.281-52-52c0-32 52-98 52-98s52 66 52 98Z"/>
                                </svg>
                                <h1 className='eksi-damla-text cursor-pointer hover:underline'>{likes.filter(like => like.post_id === entry.id).length}</h1>
                            </div>}
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
                            <NavLink to={'/birisi/' + (entry.nickname)} title={entry.nickname} className='eksi-logo hover:underline cursor-pointer'> {entry.nickname} </NavLink>
                            <div className="flex gap-4">
                                <h1 className='eksi-text'> {entry.created_at.substring(0,10)} </h1>
                                <h1 className='eksi-text'> {entry.created_at.substring(11,16)} </h1>
                            </div>
                        </div>
                        <div className="">
                            <img className='w-12 h-12 rounded-full' src={'https://rpllnpgdbmsvfqxnybcp.supabase.co/storage/v1/object/public/images/' + entry.nickname} alt="" />
                        </div>
                    </div>
                    {/* divider */}
                    <div className="mb-20"></div>
                    {/* divider */}
                </div>)))}

    return(
        <>
        <div className="flex gap-5 justify-center">
            
            <div id='entryList' className="flex flex-col place-items-center w-auto mx-11">
                { isLoggedIn ? <div className="flex">
                    <form onSubmit={addPost} className='max-sm:w-[300px]' id='postForm'>
                        <div id="titleForm">
                            <input required maxLength='50' className='bg-slate-100 max-sm:w-[300px] p-1 mb-4 w-[400px] rounded-md' placeholder='Başlık' type="text" name="title" id="" />
                        </div>

                        {/* <div className='hidden' id="titleForm">
                            <input required className='bg-slate-100 max-sm:w-[300px] p-1 mb-4 w-[400px] rounded-md' placeholder='NickName' type="text" name="nickname" />
                        </div> */}

                        <div id='textForm' className="">
                            <textarea required className='p-4 bg-slate-100 min-h-[200px] max-h-[250px] max-sm:w-[300px] rounded-lg' placeholder='Entry' name="entry" id="post" cols="60" rows="5"></textarea>
                        </div>

                        {/* <div className='mb-4' id="imageForm">
                            <input  type="file" name="image" id="" />
                        </div> */}
                        <button className='bg-slate-100 px-5 py-1 mb-4 hover:bg-[#81C14B] rounded-md transition-all' type="submit">Gönder</button>
                    </form>
                </div> : ''}
                <div className="px-4 hidden">
                    <div className="flex flex-col gap-5 mb-4 rounded-lg text-base ">
                        <a href='#' className='hover:underline max-w-[200px]'>Lorem ipsum dolor sit amet.</a>
                        <p className='break-words max-w-[500px]'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe accusamus aliquid fugiat consequuntur, incidunt iure nulla fugit voluptate reprehenderit nobis amet facilis, minus ducimus sit! Quis nisi corrupti earum tempore?</p>
                    </div>

                    <div className="flex justify-between place-items-center gap-5">
                        <div className="flex gap-7">
                            <a href="#" title='Çokomelli!' className=" border-[1px] rounded-sm eksi-sukela"><h1 className='relative eksi-sukela-text'>↑</h1></a>

                            <a href="#" title='öghh!' className=" border-[1px] rounded-sm eksi-dislike"><h1 className='relative eksi-sukela-text'>↓</h1></a>

                            <div title='yaz bunu güzel laf!' className='flex gap-1'>
                                <svg onClick={() => likePost(entry)} width="20px" className='eksi-damla cursor-pointer' height="20px" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg" fill="none">
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

export default contents