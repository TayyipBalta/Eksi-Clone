import { Link, NavLink } from 'react-router-dom'
import eksiLogo from '../assets/img/logo/Eksi_ikon.svg'
import eksiSearch from '../assets/img/logo/eksi-search.svg'

function Navbar() {

    return(
    <>
        <div className="h-1 eksi-color mb-4"></div>
    <div className="flex flex-col">
        <div className="flex xl:justify-around sm:justify-center place-items-center xl:gap-24 min-[300px]:gap-5">
            <div className='flex place-items-center xl:gap-28 min-[300px]:gap-5'>
                <div className="px-2 flex place-items-center font-bold text-2xl">
                    <img className='w-5 h-5' src={eksiLogo} alt="" />
                    <h1 className='text-gray-800 min-[320px]:hidden xl:block'>tatlış</h1>
                    <h1 className='eksi-logo min-[320px]:hidden xl:block'>sözlük</h1>
                </div>
                <div className="mb-2 flex">
                    <input className='focus-visible:outline-none w-96 px-3 py-1 rounded-md eksi-search' type="search" name="search" placeholder='ne ararsan ara' id="" />
                    <button><img className='relative eksi-search-box rounded-e-md p-2' src={eksiSearch} alt="" /></button>
                </div>
            </div>

            <div className="flex gap-4">
                <div className="eksi-text">
                    <Link to='/giris' className='hover:underline decoration-1 min-[300px]:hidden xl:block' >giriş</Link>
                </div>
                <div className="eksi-text">
                    <Link to='/kayitOl' className='hover:underline decoration-1 min-[300px]:hidden xl:block'>kayıt ol</Link>
                </div>
            </div>
        </div>

    <div className="flex xl:gap-8 justify-around items-center text-sm font-bold">
        <div className="eksi-nav">
            <NavLink to='/' className='px-8 py-4' >gündem</NavLink>
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
            <NavLink className='px-8 py-4 min-[300px]:hidden xl:block' to='/ilişkiler'>#ilişkiler</NavLink>
        </div>

        <div className="eksi-nav">
            <NavLink className='px-8 py-4 min-[300px]:hidden xl:block' to='/siyaset'>#siyaset</NavLink>
        </div>

        <div className="eksi-nav">
            <NavLink to='/giris' className='px-8 py-4 lg:hidden min-[300px]:block'>giriş</NavLink>
        </div>

        <div className="eksi-nav">
            <NavLink to='/kayitOl' className='px-8 py-4 lg:hidden'>kayıt ol</NavLink>
        </div>

    </div>
        <div className="w-full h-px eksi-stack mb-5"></div>

    </div>
    </>)
}

export default Navbar