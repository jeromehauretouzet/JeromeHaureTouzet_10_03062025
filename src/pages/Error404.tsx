import './Error404.scss';
import { Link } from 'react-router-dom';

const Error404 = () => {
  return (
    <div className="main error404-page">
      <h1 className="error404-page__title">404</h1>
      <p className="error404-page__message">
        Oops! The page you requested does not exist.
      </p>
      <Link to="/" className="error404-page__link">
        Go to Homepage
      </Link>
    </div>
  );
};

export default Error404;