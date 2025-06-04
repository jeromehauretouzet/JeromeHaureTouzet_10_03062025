import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importer les composants de page d'Argent Bank
import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import UserProfile from '../pages/UserProfile';
import Error404 from '../pages/Error404';
import MainContainer from '../components/Main-container/Main-container';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
      {/* --- Route parent --- */}
      <Route element={<MainContainer />}>
          {/* --- Route enfants--- */}
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/user" element={<UserProfile />} />
          <Route path="*" element={<Error404 />} />
      </Route>
      </Routes>
    </Router>
  );
}

export default AppRouter;