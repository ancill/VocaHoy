import { api } from "../utils/api";

export const useRemoveCardCollection = () => {
  const removeCollection = api.cardsCollection.removeCollection.useMutation();

  return { removeCollection: removeCollection.mutate };
};
