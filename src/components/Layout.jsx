import { Home } from './Home';
import { Navbar } from './Navbar';
import './Layout.css';
import { SmokeCigarrete } from './SmokeCigarrete';
import { Records } from './Records';
import { Outlet } from 'react-router-dom';

export const Layout = () => {

    return <>
        <div className="container mt-2 wrapper">
            <Outlet />
        </div>
        
        <Navbar />
    </>

};