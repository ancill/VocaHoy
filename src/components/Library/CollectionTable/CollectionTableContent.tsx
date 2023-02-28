import { Card, CardsCollection } from "@prisma/client";
import React from "react";

const CollectionTableContent = ({
  cards,
  collectionLabel,
}: {
  cards: Card[];
  collectionLabel: string;
}) => {
  return (
    <tbody>
      {cards.map((el, i) => {
        const { front, back, imgUrl, interval, nextReview } = el;
        return (
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <td>
              <div className="flex items-center space-x-3">
                <div className="avatar">
                  <div className="mask mask-squircle h-12 w-12">
                    <img src={imgUrl} alt="Card Img" />
                  </div>
                </div>
                <div>
                  <div className="font-bold">{front}</div>
                  <div className="text-sm opacity-50">{back}</div>
                </div>
              </div>
            </td>
            <td>{collectionLabel}</td>
            <td></td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default CollectionTableContent;
