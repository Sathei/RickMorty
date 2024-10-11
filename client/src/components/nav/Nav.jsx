import { Link, useLocation } from 'react-router-dom';
import Searchbar from '../searchBar/SearchBar';
import Button from '../button/Button'
import useAuth from '../hooks/useAuth';

function Navbar () {

    const userLogged = localStorage.getItem('user');
    console.log('data usuario navbar' , userLogged);
    

    const { logout } = useAuth();
    return(
        <div>
            <Searchbar/>
            { userLogged
             ? <Button link={'/login'} text={'Log out'} onClick={logout}/>
             : <Button link={'/login'} text={'Log in'}/>
            } 
        </div>
    )
}

export default Navbar