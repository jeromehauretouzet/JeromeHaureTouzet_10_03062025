import React, { useState, type FormEvent, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess, loginFailure } from '../store/features/auth/authSlice';

const SignIn = () => {

  // --- States ---
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // --- Utilisation des Hooks ---
  const dispatch        = useDispatch();
  const authError       = useSelector((state:any) => state.auth.error);
  const navigate        = useNavigate();
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);

  // --- Redirection après une connexion réussie ---
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/user');
    }
  }, [isAuthenticated]);

  // --- Gestionnaire de soumission du formulaire ---
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

  try {
      const response = await axios.post(
        'http://localhost:3001/api/v1/user/login',                                  // --- Faire l'appel POST à l'API de login
        {
          email,
          password
        }
      );
                                                 
      const token = response.data.body.token;                                       // --- On récupère le token
      dispatch(loginSuccess({ token, rememberMe }));                                // MAJ du store  (token et l'option "Remember me")

    } catch (error:any) {
      console.error('Erreur de connexion :', error.message);
      dispatch(loginFailure({ error: error.message }));
    }
  };

  return (
    <div className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text" 
              id="username" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-remember">
            <input 
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button type="submit" className="sign-in-button">
            Sign In
          </button>
          {authError && (
            <p className="error-message">
              {authError}
            </p>
          )}
        </form>
      </section>
    </div>
  );
};

export default SignIn;