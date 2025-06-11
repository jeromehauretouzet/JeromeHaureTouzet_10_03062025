// --- Les composants ---
import Card from '../components/Card/Card';

// --- Les données ---
import homeCardsData from '../data/homeCards.json';

const Home = () => {
  return (
    <>
      <div className="hero">
        <section className="hero-content">
          <h2 className="sr-only">Promoted Content</h2>
          <p className="subtitle">No fees.</p>
          <p className="subtitle">No minimum deposit.</p>
          <p className="subtitle">High interest rates.</p>
          <p className="text">Open a savings account with Argent Bank today!</p>
        </section>
      </div>
      <section className="features">
        <h2 className="sr-only">Features</h2>
       {homeCardsData.map(card => (
          <Card
            key={card.id}
            imageUrl={card.imageUrl}
            title={card.title}
            description={card.description}
          />
        ))}
      </section>
    </>
  );
};

export default Home;