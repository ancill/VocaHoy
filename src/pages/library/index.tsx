import SessionsCarousel from "../../components/Library/SessionsCarousel";
import { api } from "../../utils/api";
import Loader from "../../components/Loader";
import CardCollectionGrid from "../../components/Library/CardCollectionGrid";

const CollectionTitle = ({ label }: { label: string }) => {
  const handleCreateCollection = () => {
    console.log("create collection");
  };
  return (
    <div className="flex py-4">
      <h1 className="mr-6 pt-1 text-4xl font-bold">{label}</h1>
      <div className="dropdown-hover dropdown">
        <label tabIndex={0} className="btn">
          EDIT
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow"
        >
          <li>
            <a onClick={handleCreateCollection}>Create collection</a>
          </li>
          <li>
            <a onClick={handleCreateCollection}>Edit collection</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

const SessionTitle = ({ label }: { label: string }) => (
  <h1 className="mr-6 py-4 text-4xl font-bold">{label}</h1>
);

function LibraryPage() {
  const { data, error, isLoading } =
    api.cardsCollection.getCardsCollection.useQuery();

  if (isLoading || error) return <Loader />;

  return (
    <>
      <SessionTitle label="Current Sessions" />
      <SessionsCarousel />
      <CollectionTitle label="Development" />
      <CardCollectionGrid
        collections={data.filter((el) => el.category === "DEV")}
      />
      <CollectionTitle label="PERSONAL" />
      <CardCollectionGrid
        collections={data.filter((el) => el.category === "PERSONAL")}
      />
      <CollectionTitle label="TOP_5000" />
      <CardCollectionGrid
        collections={data.filter((el) => el.category === "TOP_5000")}
      />
    </>
  );
}

export default LibraryPage;
