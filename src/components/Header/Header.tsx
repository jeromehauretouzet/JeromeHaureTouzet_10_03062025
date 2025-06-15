import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// --- Les images ---
import Logo from '../../assets/img/argentBankLogo.png';

// --- Les hooks ---
import { useSelector, useDispatch } from 'react-redux';

// --- Les slices ---
import { logout } from '../../store/features/auth/authSlice';

const Header = () => {

  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated); // --- L'utilisateur est authentifié ? ---
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());                                                           // --- Déconnecter l'utilisateur ---
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={Logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {isAuthenticated ? (                                                     // --- Afficher le lien de connection ou déconnection ---
          <Link className="main-nav-item" to="#" onClick={handleLogout}>
            <i className="fa fa-sign-out"></i>
            Sign Out
          </Link>
        ) : (
          <Link className="main-nav-item" to="/sign-in">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;