import { useContext, useState } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import { useNavigate } from "react-router-dom";

// const entryObj = {
//     title:'',
//     entry:'',
// } 

// export function eDetail(entry){
//     entryObj.title = title;
//     entryObj.entry = entry;
//     console.log(entry);
// }


function EntryDetail(){
    
    const { detailEntry } = useContext(GlobalContext);
    return(
        <>
            <div className="flex justify-center">
                {detailEntry}
            </div>
        </>
    )
}

export default EntryDetail