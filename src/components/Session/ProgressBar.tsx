const ProgressBar = () => {
  const label = "Deck name";
  const progress = "25 words";
  return (
    <div className="navbar glass rounded-lg px-6">
      <div className="navbar-start flex">
        <button className="btn-outline btn btn-square mr-4 border-primary-content ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6 text-primary-content"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
            />
          </svg>
        </button>
        <div>
          <h3 className="text-xl normal-case">{label}</h3>
          <span className="mr-4 text-base">{progress}</span>
          <progress
            className="progress progress-primary w-20"
            value="40"
            max="100"
          ></progress>
        </div>
      </div>

      <div className="navbar-end flex space-x-2">
        <span className="badge badge-primary indicator-item"></span>
        <span className="badge badge-accent indicator-item"></span>
        <span className="badge badge-success indicator-item"></span>
      </div>
    </div>
  );
};

export default ProgressBar;
