import Carousel from "../components/Library/Carousel";
import { useRouter } from "next/router";
import { api } from "../utils/api";

function LibraryPage() {
  const { query } = useRouter();
  const { data, error, isLoading } = api.deck.getDeckCollection.useQuery();

  if (isLoading || error) return <div>No data</div>;

  return (
    <div className="glass my-4 rounded-lg">
      <Carousel collections={data} />
    </div>
  );
}

export default LibraryPage;
