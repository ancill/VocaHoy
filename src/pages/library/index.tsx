import SessionsCarousel from "../../components/Library/SessionsCarousel";
import { api } from "../../utils/api";
import Loader from "../../components/Loader";
import CardCollectionGrid from "../../components/Library/CardCollectionGrid";
import { useRouter } from "next/router";
import { NAVIGATION_ROUTES } from "../../constants/navigation";

const CollectionTitle = ({ label }: { label: string }) => {
  const router = useRouter();

  const handleCreateCollection = () => {
    // Redirect to dynamic page for each session
    //router.push(NAVIGATION_ROUTES.collection + `/${sessionIdForRouter}`);
  };

  return (
    <div className="flex py-4">
      <h1 className="mr-6 pt-1 text-4xl font-bold">{label}</h1>
      <button className="btn" onClick={handleCreateCollection}>
        Add new
      </button>
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
