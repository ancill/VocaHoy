interface DeckCollection {
  title: string;
  image: string;
  description: string;
  buttonInfo: string;
  id: string;
}
interface Deck {
  title: string;
  collection: DeckCollection[];
}
export { CardProps, DeckCollection, Deck };
