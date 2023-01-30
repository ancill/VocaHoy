import { DeckCollection } from "../types/Library";

const Card = ({ title, description, buttonInfo, image }: DeckCollection) => {
  return (
    <div className="card card-compact w-64 bg-base-100 text-white shadow-xl">
      <figure>
        <img
          src={image}
          alt="car!"
          className="bg-gradient-to-r from-primary to-accent"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <button className="btn-primary btn">{buttonInfo}</button>
        </div>
      </div>
    </div>
  );
};
export default Card;
