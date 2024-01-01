import { createContext, useState , useEffect} from "react";
import { Link } from "react-router-dom";

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
const supabaseUrl = 'https://rpllnpgdbmsvfqxnybcp.supabase.co';

const supaPost = supabaseUrl + '/rest/v1/posts';
const supaLikes = supabaseUrl + '/rest/v1/likes';

const secretKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwbGxucGdkYm1zdmZxeG55YmNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY3OTYxODksImV4cCI6MjAxMjM3MjE4OX0.iwpTk5pJP-86barHJ-UTZr5hbtiWY3oj9VIyXUS0qMM';
const supabase = createClient(supabaseUrl, secretKey);

import boyUser from '../assets/img/logo/boy-users.svg'
import girlUser from '../assets/img/logo/girl-users.svg'
import atakUser from '../assets/img/logo/atak.svg'

import { activeUser, detailEntry, getDetail, setActiveUser, setDetail, setNickName } from '../components/LittleComp'
// import { category, getCategory, setCategory } from '../components/LittleComp'

export const GlobalContext = createContext();

export const GlobalProvider = (props) => {

    const [activeNavLink , setActiveNavLink] = useState('');
    
    const [responseTitle, setTitle] = useState([]);
    
    // const [detailEntry , setDetailEntry] = useState({});
    
    
    useEffect(() => {
        renderEntry();
    },[location.pathname]);
    
    const renderEntry = async() => {
        const response = await fetch(supaPost,{
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${secretKey}`,
                'apiKey': secretKey
            }
        }).then(x => x.json());
        
        const reversedResponse = response.reverse();
        setTitle(reversedResponse);
        
        for(const responses of reversedResponse){
            const image = await supabase
            .storage
            .from('images')
            .getPublicUrl(responses.image);
        }
    }
    
    // function setNavCategory(e){
    //     category = e.target.firstChild.data;
    //     setCategory(category);
    //     console.log('category submit');
    //     renderEntry();
    // }
    
    function SideCategory(){
        return(
            <h1 className='mb-2'>
                {activeNavLink}
            </h1>
        )
    }

    function eDetail(entry){
        setDetail(entry);
        console.log(detailEntry.title);
    }
    
    function ReadDetail(){
        if(detailEntry !== ''){
            return(
                detailEntry.map((entry => <div key={entry.id} className="flex flex-col">
                    <h1>{detailEntry.title}</h1> <p>{detailEntry.entry}</p>
                </div>))
            )
        }
    }
    function GetTitle(){
        return(responseTitle.map((entry => <div key={entry.id} className='flex flex-col p-3'>
            <Link to={'/' + entry.title.replace(/\s+/g, '-')} onClick={() => eDetail(entry)} key={entry.id} className='hover:underline  max-w-[200px]'>{entry.title}</Link>
            </div>)))
    }
    
    const [isLoggedIn , setIsLoggedIn] = useState(false);
    const [logUser , setLogUser] = useState([]);
    const [isGender , setGender] = useState(null);

    supabase.auth.onAuthStateChange((event, session) => {
        if(session){
            setIsLoggedIn(true);
            const loginUser = session.user;
            const NickName = session.user.user_metadata.nickname;
            const gender = session.user.user_metadata.gender;
            if(gender === 'male'){
                setGender('boyUser');
            }else if(gender === 'female'){
                setGender('girlUser');
            }else{
                setGender('atakUser');
            }
            setActiveUser(loginUser);
            setLogUser(NickName);
        }
        else{
            setIsLoggedIn(false);
        }
        
    });

    function genderUser(){
        if(isGender === 'boyUser'){
            return boyUser;
        }
        else if(isGender === 'girlUser'){
            return girlUser;
        }
        else{
            return atakUser;
        }
    }

    async function logOut() {
        const { error } = await supabase.auth.signOut();
        setLogUser(null);
    }
    return(
        <GlobalContext.Provider value={{isLoggedIn, logUser, isGender, genderUser, logOut , GetTitle , SideCategory , setActiveNavLink , ReadDetail , detailEntry , activeUser}}>
            {props.children}
        </GlobalContext.Provider>
    );
}