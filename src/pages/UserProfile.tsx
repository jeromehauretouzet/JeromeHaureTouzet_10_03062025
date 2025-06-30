import React, { useEffect, useState, type FormEvent } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';

// --- Les slices ---
import { getProfileSuccess, getProfileFailure, updateUsernameSuccess, updateUsernameFailure, clearProfileError } from '../store/features/user/userSlice';
import { logout } from '../store/features/auth/authSlice';

// --- Les composants ---
import Account from '../components/Account/Account';

// --- Les données ---
import userAccountsData from '../data/userAccounts.json';

const UserProfile = () => {

  // --- Hook useDispatch : Déclancher des changements d'état dans le store via des actions
  const dispatch = useDispatch();

  // --- Hook useSelector : Lire des données depuis le store (S'abonner aux changements et déclencher des re-rendus)
  const isAuthenticated  = useSelector((state: any) => state.auth.isAuthenticated);
  const token            = useSelector((state: any) => state.auth.token);             // --- Récupération du token ---
  const userProfile      = useSelector((state: any) => state.userProfile.profile);    // --- Profil de l'utilisateur ---
  const profileError     = useSelector((state: any) => state.userProfile.error);      // --- Erreur du profil utilisateur ---

  // --- Hook useState : Gérer l'état en local
  const [isEditing, setIsEditing]       = useState(false);                            // --- Afficher formulaire d'édition par défaut (non) ---
  const [editUserName, setEditUserName] = useState('');                               // --- Edition du userName ---
  const [editError, setEditError] = useState('');                                     // --- État pour l'erreur de validation ---

  // --- Hook useEffect : Lancer des actions après le rendu
  useEffect(() => {
    const fetchUserProfileData = async () => {                                        // --- Récupération des données du profil ---     
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

    // --- On récupère le profil utilisateur ---
    fetchUserProfileData();                                                           // --- Appel API ---                      

  }, []);

  if (!isAuthenticated) {                                                             // --- Redirection vers la page de connection ---
    return <Navigate to="/sign-in" replace />;
  }

  // --- Gestionnaire d'évènement : Edit Name ---
  const handleEditForm = () => {
    if (userProfile) {
      setEditUserName(userProfile.userName);                                          // --- Pré-remplir avec le pseudo actuel ---
    } else {
      setEditUserName('');
    }

    setIsEditing(true);                                                               // --- Afficher le formulaire d'édition ---
  };

  // --- Gestionnaire d'évènement : Cancel ---
  const handleCancel = () => {
    setIsEditing(false);                                                              // --- On ferme le formulaire ---
    dispatch(clearProfileError());                                                    // --- On efface l'erreur ---
  };

  // --- Gestionnaire d'évènement : Save ---
  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();                                                           // --- Empêcher le rechargement de la page ---

    // --- AJOUT DE LA VALIDATION ---
    if (!editUserName.trim()) {                                                       // --- .trim() enlève les espaces avant et après ---
      setEditError('username cannot be empty');
      return;
    }

    setEditError('');                                                                  // --- On efface l'erreur si la validation passe ---
    try {
      const response = await axios.put(                                               // --- Appel API PUT pour mettre à jour le userName ---
        'http://localhost:3001/api/v1/user/profile',
        { userName: editUserName },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      dispatch(updateUsernameSuccess({ userName: response.data.body.userName || editUserName }));      

      setIsEditing(false);                                                           // --- On ferme le formulaire ---                                                            
    }
    catch (error:any) {                                                              // --- Afficher l'erreur du profil utilisateur ---
      console.error('Erreur de connexion :', error.message);
      const statusCode = error.response ? error.response.status : undefined;
      dispatch(updateUsernameFailure({error: `Failed to update username (${statusCode})`}));
    }
  };

  return (
    <div className="main bg-dark">

    {/* --- 1. Formulaire d'édition --- */}

    {isEditing ? (
      <section className="section-edit-user-info">
        <h2>Edit user info</h2>

        {/* Message d'erreur  */}
        {editError && (
          <p className="error-message">
            {editError}
          </p>
        )}

        {profileError && (
          <p className="error-message">
            {profileError}
          </p>
        )}

        <form className="edit-form" onSubmit={handleSave}>
          <div className="edit-form-input-wrapper">
            <label htmlFor="username-edit">User name:</label>
            <input 
             type="text"
             id="username-edit"
             value={editUserName}
             onChange={(e) => setEditUserName(e.target.value)} />
          </div>
          <div className="edit-form-input-wrapper">
            <label htmlFor="firstname">First name:</label>
            <input type="text" id="firstname" disabled value={userProfile?.firstName || ''} />
          </div>
          <div className="edit-form-input-wrapper">
            <label htmlFor="lastname">Last name:</label>
            <input type="text" id="lastname" disabled value={userProfile?.lastName || ''} />
          </div>
          <div className="edit-form-buttons">
            <button type="submit" className="edit-form-button" >Save</button>
            <button type="button" onClick={handleCancel} className="edit-form-button">Cancel</button>
          </div>
        </form>
      </section>
    ) : (

    // --- 2. Message de bienvenue ---

      <div className="header">
        <h1>
          Welcome back
          <br />
          {userProfile ? `${userProfile.firstName} ${userProfile.lastName}!` : ''}
        </h1>
        <button className="edit-button" onClick={handleEditForm}>
          Edit Name
        </button>
      </div>
    )}  

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