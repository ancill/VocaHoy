import SessionsCarousel from "../../components/Library/SessionsCarousel";
import { api } from "../../utils/api";
import Loader from "../../components/Loader";
import CardCollectionGrid from "../../components/Library/CardCollectionGrid";
import { useRouter } from "next/router";
import { NAVIGATION_ROUTES } from "../../constants/navigation";
import { CardCollectionCategory } from "@prisma/client";
import CreateCollectionModal from "../../components/Library/CreateCollectionModal";
import { LABEL_COLLECTION } from "../../constants/common";

const CollectionTitle = ({
  category,
}: {
  category: CardCollectionCategory;
}) => {
  const collectionLabel = LABEL_COLLECTION[category];
  return (
    <div className="flex py-4">
      <h1 className="mr-6 pt-1 text-4xl font-bold">{collectionLabel}</h1>
      <CreateCollectionModal label={collectionLabel} category={category} />
    </div>
  );
};

const SessionTitle = ({ label }: { label: string }) => (
  <h1 className="mr-6 py-4 text-4xl font-bold">{label}</h1>
);

function LibraryPage() {
  const { data, error, isLoading, refetch } =
    api.cardsCollection.getCardsCollection.useQuery();

  if (isLoading || error) return <Loader />;

  return (
    <>
      <SessionTitle label="Current Sessions" />
      <SessionsCarousel />
      <CollectionTitle category="DEV" />
      <CardCollectionGrid
        collections={data.filter((el) => el.category === "DEV")}
      />
      <CollectionTitle category="PERSONAL" />
      <CardCollectionGrid
        collections={data.filter((el) => el.category === "PERSONAL")}
      />
      <CollectionTitle category="TOP_5000" />
      <CardCollectionGrid
        collections={data.filter((el) => el.category === "TOP_5000")}
      />
    </>
  );
}

export default LibraryPage;
