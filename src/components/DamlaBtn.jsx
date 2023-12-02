function DamlaBtn(){

    const [count, setCount] = useState(0);
    function fav(){
        if(count === 1){
            setCount(count => count - 1);
        }
        else{
            setCount(count => count + 1);

        }
    }
    return(
        <>
        <div title='yaz bunu güzel laf!' className='flex gap-1'>
            <svg onClick={fav} width="20px" className='eksi-damla cursor-pointer' height="20px" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg" fill="none">
                <path className='active:stroke-[#81C14B]'  stroke="#494949" stroke-linejoin="round" stroke-width="12" d="M148 120c0 28.719-23.281 52-52 52s-52-23.281-52-52c0-32 52-98 52-98s52 66 52 98Z"/>
            </svg>
            <h1 className='eksi-damla-text cursor-pointer hover:underline'>{count}</h1>
        </div>
        </>
    )
}

export default DamlaBtn