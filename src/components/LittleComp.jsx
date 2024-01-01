
//! userNickName
export let nickName = null;

export function setNickName(newNickName){
    nickName = newNickName;
}

export function getNickName(){
    return nickName;
}
//! userNickName

//! ActiveUser
export let activeUser = [];

export function setActiveUser(newActiveUser){
    activeUser = newActiveUser;
}

//! ActiveUser

//! sideCategory
export let category = 'gündem';

export function setCategory(newCategory){
    category = newCategory;
}

export function getCategory(){
    return category;
}
//! sideCategory

//! getDetail
export let detailEntry = null;

export function setDetail(newDetail){
    detailEntry = newDetail;
}

export function getDetail(){
    console.log(detailEntry);
}

// export function ReadDetail(){
//     if(detailEntry !== ''){

//         return(
//             detailEntry.map((entry => <div key={entry.id} className="flex flex-col">
//                 <h1>{detailEntry.title}</h1> <p>{detailEntry.entry}</p>
//             </div>))
//         )
//     }
// }
//! getDetail
function LittleComp(){
}

export default LittleComp