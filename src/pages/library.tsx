import Carousel from "../components/Library/Carousel";
import { useRouter } from "next/router";
import { api } from "../utils/api";
import Loader from "../components/Loader";

function LibraryPage() {
  const { query } = useRouter();
  const { data, error, isLoading } = api.deck.getDeckCollection.useQuery();

  if (isLoading || error) return <Loader />;
  return (
    <div className="glass my-4 rounded-lg">
      <div className="mx-4 pb-4">
        <h1 className="py-4 text-4xl font-bold text-primary-content">
          Collections
        </h1>
        <Carousel collections={data} />
      </div>
    </div>
  );
}

export default LibraryPage;
