import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './Main-container.scss';

function MainContainer() {
  return (
    // --- Main-container ---
    <div className="main-container">
      {/* --- Header --- */}
      <Header />

      {/* --- Main-content --- */}
      <main className="main-content">
        {/* On insère ici les pages (Home, SignIn, UserProfile, Error404). */}
        <Outlet />
      </main>

      {/* --- Footer --- */}
      <Footer />
    </div>
  );
}

export default MainContainer;