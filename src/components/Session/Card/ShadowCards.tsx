const ShadowCards = ({}) => {
  return (
    <>
      {new Array(3).fill(null).map((_, i) => (
        <div key={i} className="card w-96 bg-base-100 text-center shadow-xl">
          <div className="card-body h-80"></div>
          <div className="card-body h-80"></div>
        </div>
      ))}
    </>
  );
};

export default ShadowCards;
