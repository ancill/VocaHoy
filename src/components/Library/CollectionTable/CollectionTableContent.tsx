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
      {cards.map((el) => {
        const { front, back, imgUrl, interval, nextReview, id } = el;
        return (
          <tr key={id}>
            <th>
              <label className="flex items-center justify-start">
                <input
                  type="checkbox"
                  className="checkbox"
                  name="checkbox"
                  placeholder="checkbox"
                />
                <button type="button" className="btn ml-4">
                  Edit
                </button>
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
            <td>
              <div>
                <div className="font-bold"> Interval: {interval}</div>
                <div className="text-sm opacity-50">
                  Next review: {nextReview.toLocaleString()}
                </div>
              </div>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default CollectionTableContent;
