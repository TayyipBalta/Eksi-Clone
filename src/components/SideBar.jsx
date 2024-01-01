import { useEffect , useState , useContext } from "react";
import { Link } from "react-router-dom";

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
const supabaseUrl = 'https://rpllnpgdbmsvfqxnybcp.supabase.co';
const supaPost = supabaseUrl + '/rest/v1/posts';
const secretKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwbGxucGdkYm1zdmZxeG55YmNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY3OTYxODksImV4cCI6MjAxMjM3MjE4OX0.iwpTk5pJP-86barHJ-UTZr5hbtiWY3oj9VIyXUS0qMM';
const supabase = createClient(supabaseUrl, secretKey);

import { GlobalContext } from "../Context/GlobalContext";

function SideBar(){
    
    const { navText , setNavText , GetTitle , SideCategory} = useContext(GlobalContext);
    // const [sideCategory , setSideCategory] = useState(location.pathname);
    
    return(
        <>
            <div className="fixed top-36 
            left-[20%] max-2xl:left-[10%] min-[1708px]:left-[15%] min-[2348px]:left-[25%] min-[2818px]:left-[30%] min-[3758px]:left-[35%] min-[5637px]:left-[39%]
            max-2xl:h-[600px] h-[700px] w-64 py-4 z-20 overflow-y-auto flex flex-col eksi-text xl:block max-sm:hidden sm:hidden">
                {/* burasi kategoriye gore degisecek gündem, debe, sorunsallar vs gibi */}
                    <SideCategory />
                    <div className="flex flex-col">
                        <GetTitle />
                    </div>
            </div>
        </>
    )
}

export default SideBar