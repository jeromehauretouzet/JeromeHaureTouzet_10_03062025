import './Error404.scss';

const Error404 = () => {
  return (
    <div className="main error404-page">
      <h1 className="error404-page__title">404</h1>
      <p className="error404-page__message">
        Oups! La page que vous demandez n'existe pas.
      </p>
      <a>
        Retourner sur la page d’accueil
      </a>
    </div>
  );
};

export default Error404;