import ControlButtons from "./ControlButtons";

const CardBody = ({ items }) => {
  return items.map((el) => (
    <div className="card w-96 bg-primary shadow-xl">
      <figure>
        <img src={image} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          Shoes!
          <div className="badge badge-secondary">NEW</div>
        </h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">Food</div>
          <div className="badge badge-outline">Top 5000</div>
        </div>
      </div>
    </div>
  ));
};

const Card = ({}) => {
  const image =
    "https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg";

  return (
    <div className="mt-5 flex flex-col space-y-5 px-24">
      <div className="stack">ca</div>
      <ControlButtons />
    </div>
  );
};

export default Card;
