import { ReactElement, ReactFragment } from "react";

interface CardProps {
  title: string;
  description: string;
  buttonInfo: string;
  image: string;
  id: string;
}
const Card = ({ title, description, buttonInfo, image }: CardProps) => {
  return (
    <div className="card card-compact w-64 bg-base-100 text-white shadow-xl">
      <figure>
        <img src={image} alt="car!" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Life hack</h2>
        <p>How to park your car at your garage?</p>
        <div className="card-actions justify-end">
          <button className="btn-primary btn">Learn now!</button>
        </div>
      </div>
    </div>
  );
};

const Carousel = ({ carouselItems }) => {
  return (
    <div className="mx-4 pb-4">
      <h1 className="font-title py-4 text-4xl font-extrabold sm:text-5xl lg:text-6xl">
        Popular Vocabulary
      </h1>
      <div className="carousel rounded-box space-x-4">
        {carouselItems.map((el: CardProps) => (
          <div className="carousel-item" key={el.id}>
            <Card {...el} />
          </div>
        ))}
      </div>
    </div>
  );
};

const deckCollection = {
  popular: [
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
};
function Decks() {
  return (
    <div className="glass my-4 rounded-lg">
      <Carousel carouselItems={deckCollection.popular} />
      <Carousel carouselItems={deckCollection.popular} />
    </div>
  );
}

export default Decks;
