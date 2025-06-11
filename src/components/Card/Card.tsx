type CardProps = {
  imageUrl: string;
  title: string;
  description: string;
};

const Card = ({ imageUrl, title, description }: CardProps) => {
  return (
    <div className="feature-item">
      <img src={imageUrl} alt="image" className="feature-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default Card;