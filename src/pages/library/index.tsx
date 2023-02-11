import Carousel from "../../components/Library/Carousel";
import { useRouter } from "next/router";
import { api } from "../../utils/api";
import Loader from "../../components/Loader";

function LibraryPage() {
  const { query } = useRouter();
  const { data, error, isLoading } = api.deck.getDeckCollection.useQuery();

  if (isLoading || error) return <Loader />;
  return (
    <>
      <h1 className="p-6 text-4xl font-bold">Collections</h1>
      <Carousel collections={data} />
    </>
  );
}

export default LibraryPage;
