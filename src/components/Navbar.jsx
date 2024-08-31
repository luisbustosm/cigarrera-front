import { NavLink } from 'react-router-dom';
import './Navbar.css';

export const Navbar = () => {
    return <footer className="footer">
    <ul className="nav nav-pills nav-fill">
      <li className="nav-item">
        <NavLink to="/" className="nav-link p-sm-4 border-end border-top rounded-0"><i className="bi bi-house-door fs-1"></i></NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/records" className="nav-link p-sm-4 border-end border-top rounded-0"><i className="bi bi-journal fs-1"></i></NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/smoke" className="nav-link p-sm-4 border-end border-top rounded-0"><i className="bi bi-plus-circle fs-1"></i></NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/charts" className="nav-link p-sm-4 border-start border-top rounded-0"><i className="bi bi-graph-down fs-1"></i></NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/settings" className="nav-link p-sm-4 border-start border-top rounded-0 disabled"><i className="bi bi-gear fs-1"></i></NavLink>
      </li>
  </ul>
  </footer>
};