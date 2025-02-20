import Searchbar from '../searchBar/SearchBar';
import Button from '../button/Button';
import useAuth from '../hooks/useAuth';
import Filters from '../filters/filters';
import './nav.css'
function Navbar() {
    const userLogged = localStorage.getItem('user');
    const { logout } = useAuth();

    return (
        <div className="navbar-container">
            {/* Filtros alineados a la izquierda */}
            <div className="filters-container">
                <Filters />
            </div>

            {/* Barra de búsqueda centrada */}
            <div className="searchbar-container">
                <Searchbar />
            </div>

            {/* Botón de Log in / Log out alineado a la derecha */}
            <div className="auth-container">
                {userLogged ? (
                    <Button link={'/login'} text={'Log out'} onClick={logout} className="button-auth" />
                ) : (
                    <Button link={'/login'} text={'Log in'} className="button-auth" />
                )}
            </div>
        </div>
    );
}

export default Navbar;