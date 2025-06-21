import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// --- Les images ---
import Logo from '../../assets/img/argentBankLogo.png';

// --- Les hooks ---
import { useSelector, useDispatch } from 'react-redux';

// --- Les slices ---
import { logout } from '../../store/features/auth/authSlice';
import { clearUserProfile } from '../../store/features/user/userSlice';

const Header = () => {

  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated); // --- L'utilisateur est authentifié ? ---
  const userProfile = useSelector((state: any) => state.userProfile.profile);      // --- profil utilisateur depuis le store ---

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearUserProfile());                                                 // --- On efface le profil utilisateur ---
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
        {isAuthenticated ? (
          <>
            {userProfile && userProfile.userName && (
              <span>
                <i className="fa fa-user-circle"></i>
                <span className="main-nav-userName">
                  {userProfile.userName}                                           {/* --- Afficher le userName comme du texte simple --- */}
                </span>
              </span>
            )}
            {/* Lien Sign Out */}
            <Link className="main-nav-item" to="#" onClick={handleLogout}>
              <i className="fa fa-sign-out"></i>
              Sign Out
            </Link>
          </>
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