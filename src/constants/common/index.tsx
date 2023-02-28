import { CardCollectionCategory } from "@prisma/client";

export const LABEL_COLLECTION = {
  [CardCollectionCategory.DEV]: "Development Collection",
  [CardCollectionCategory.PERSONAL]: "Personal Collection",
  [CardCollectionCategory.TOP_5000]: "Most popular 5000 words",
};
