import Searchbar from '../searchBar/SearchBar';
import Button from '../button/Button'
import useAuth from '../hooks/useAuth';
import Filters from '../filters/filters';

function Navbar () {

    const userLogged = localStorage.getItem('user');
    
    

    const { logout } = useAuth();
    return (
        <div className='flex items-center justify-between w-full px-6 py-3 bg-gradient-to-r from-blue-700 to-purple-950'>
            <div className='flex-1 flex justify-start m-2'>
                <Filters />
            </div>

            <div className='flex-1 flex justify-center'>
                <div className='w-full max-w-md'>
                    <Searchbar />
                </div>
            </div>

            <div className='flex-1 flex justify-end'>
                { userLogged
                    ? <Button link={'/login'} text={'Log out'} onClick={logout}/>
                    : <Button link={'/login'} text={'Log in'}/>
                } 
            </div>
        </div>
    );
}

export default Navbar