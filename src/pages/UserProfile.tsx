import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

// --- Les composants ---
import Account from '../components/Account/Account';

// --- Les données ---
import userAccountsData from '../data/userAccounts.json';

const UserProfile = () => {

  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);
    if (!isAuthenticated) {                                                           // --- Redirection vers la page de connection ---
    return <Navigate to="/sign-in" replace />;
  }

  return (
    <div className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          Tony Jarvis!
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