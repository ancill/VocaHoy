import Card from "../components/Session/Card";
import ControlButtons from "../components/Session/ControlButtons";
import ProgressBar from "../components/Session/ProgressBar";

const SessionPage = ({}) => {
  return (
    <div className="container glass mx-auto mt-4 flex min-h-screen flex-col rounded-lg">
      <ProgressBar />
      <Card />
    </div>
  );
};

export default SessionPage;
