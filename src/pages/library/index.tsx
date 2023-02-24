import SessionsCarousel from "../../components/Library/SessionsCarousel";
import { api } from "../../utils/api";
import Loader from "../../components/Loader";
import CardCollectionGrid from "../../components/Library/CardCollectionGrid";

const CollectionTitle = ({ label }: { label: string }) => (
  <h1 className="p-6 text-4xl font-bold">{label}</h1>
);

function LibraryPage() {
  const { data, error, isLoading } =
    api.cardsCollection.getCardsCollection.useQuery();

  if (isLoading || error) return <Loader />;

  return (
    <>
      <CollectionTitle label="Current Sessions" />
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
