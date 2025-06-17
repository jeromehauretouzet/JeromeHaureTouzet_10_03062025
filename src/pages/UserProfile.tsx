import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';

import { getProfileSuccess, getProfileFailure } from '../store/features/user/userSlice';
import { logout } from '../store/features/auth/authSlice';

// --- Les composants ---
import Account from '../components/Account/Account';

// --- Les données ---
import userAccountsData from '../data/userAccounts.json';

const UserProfile = () => {

  const isAuthenticated  = useSelector((state: any) => state.auth.isAuthenticated);
  const token            = useSelector((state: any) => state.auth.token);             // --- Récupération du token ---
  const userProfile      = useSelector((state: any) => state.userProfile.profile);    // --- Profil de l'utilisateur ---

  const dispatch = useDispatch();

  useEffect(() => {                                                                   // --- Récupération des données du profil ---
    const getUserProfileData = async () => {        
      try {
        const response = await axios.get(
          'http://localhost:3001/api/v1/user/profile',
          {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
          }
        );

        dispatch(getProfileSuccess(response.data.body));                              // --- MAJ du store  (profil) ---
      }
      catch (error: any) {

        // 1. Signaler que la récupération du profil a échoué
        const statusCode = error.response ? error.response.status : undefined;
        dispatch(getProfileFailure({ error: "Failed to load profile" }));

        // 2. Déconnecter l'utilisateur
        const messageForSignInPage = `Failed to load profile with status code ${statusCode}`;
        dispatch(logout({ errorMessage: messageForSignInPage }));
      }
    };

    if (isAuthenticated && !userProfile) {                                           // --- user authentifié + profil inexistant ---
      getUserProfileData();                                                          // --- Appel API ---                      
    }
  }, []);

  if (!isAuthenticated) {                                                           // --- Redirection vers la page de connection ---
    return <Navigate to="/sign-in" replace />;
  }

  return (
    <div className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {userProfile ? `${userProfile.firstName} ${userProfile.lastName}` + '!' : ''}
        </h1>
        <button className="edit-button">Edit Name</button>
      </div>
      <h2 className="sr-only">Accounts</h2>
      {userAccountsData.map(account => (
        <Account
          key={account.id}
          title={account.title}
          amount={account.amount}
          description={account.description}
        />
      ))}
    </div>
  );
};

export default UserProfile;