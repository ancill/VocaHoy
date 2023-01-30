import { Deck } from "../types/Library";
import Carousel from "../components/Library/Carousel";

const deckCollection: {
  [key: string]: Deck;
} = {
  popular: {
    title: "Popular Vocabulary",
    collection: [
      {
        title: "Snacks",
        image:
          "https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg",
        description: "Good snack card deck",
        buttonInfo: "pressMe",
        id: "1",
      },
      {
        title: "Golf",
        image:
          "https://daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg",
        description: "Good snack card deck",
        buttonInfo: "pressMe",
        id: "2",
      },
      {
        title: "Home",
        image:
          "https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg",
        description: "Good snack card deck",
        buttonInfo: "pressMe",
        id: "3",
      },
      {
        title: "Home",
        image:
          "https://daisyui.com/images/stock/photo-1494253109108-2e30c049369b.jpg",
        description: "Good snack card deck",
        buttonInfo: "pressMe",
        id: "4",
      },
      {
        title: "Home",
        image:
          "https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg",
        description: "Good snack card deck",
        buttonInfo: "pressMe",
        id: "5",
      },
      {
        title: "Home",
        image:
          "https://daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg",
        description: "Good snack card deck",
        buttonInfo: "pressMe",
        id: "6",
      },
      {
        title: "Home",
        image:
          "https://daisyui.com/images/stock/photo-1559181567-c3190ca9959b.jpg",
        description: "Good snack card deck",
        buttonInfo: "pressMe",
        id: "7",
      },
      {
        title: "Home",
        image:
          "https://daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg",
        description: "Good snack card deck",
        buttonInfo: "pressMe",
        id: "8",
      },
    ],
  },
  user: {
    title: "Personal Collection",
    collection: [
      {
        title: "From Netflix",
        image:
          "https://images.ctfassets.net/4cd45et68cgf/Rx83JoRDMkYNlMC9MKzcB/2b14d5a59fc3937afd3f03191e19502d/Netflix-Symbol.png?w=684&h=456",
        description: "Good snack card deck",
        buttonInfo: "Learn",
        id: "1",
      },
      {
        title: "From Web",
        image: "assets/cards/web.png",
        description: "Words that comes from extension",
        buttonInfo: "Learn",
        id: "2",
      },
    ],
  },
};

function Decks() {
  return (
    <div className="glass my-4 rounded-lg">
      <Carousel deck={deckCollection.popular} />
      <Carousel deck={deckCollection.user} />
    </div>
  );
}

export default Decks;
