import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className="navbar">
            <div className="nav-links">
                <Link to='/'>Home </Link>
            </div>
        </nav>
    )
}

export default NavBar;