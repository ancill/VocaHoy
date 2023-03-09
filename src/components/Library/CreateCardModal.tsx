import React, { useState } from "react";
import { api, getToday } from "../../utils/api";
import { Card } from "@prisma/client";

import Alert from "../Alert";

type FormCollectionInput = Omit<
  Card,
  "interval" | "nextReview" | "cardsCollectionId" | "studySessionId" | "id"
>;

const Input = ({
  question,
  stateProperty,
  formData,
  setFormData,
}: {
  question: string;
  stateProperty: keyof FormCollectionInput;
  formData: FormCollectionInput;
  setFormData: (data: FormCollectionInput) => void;
}) => (
  <>
    <label className="label">
      <span className="label-text">{question}</span>
    </label>
    <input
      type="text"
      placeholder="Type here"
      className="input-bordered input w-full max-w-xs"
      value={formData[stateProperty]}
      onChange={(e) => {
        e.preventDefault();
        setFormData({
          ...formData,
          [stateProperty]: e.target.value,
        });
      }}
    />
  </>
);
const initialState = {
  audioUrl: "",
  imgUrl: "",
  back: "",
  front: "",
};
const CreateCardModal = ({
  cardCollectionId,
}: {
  cardCollectionId: string;
}) => {
  const { mutateAsync, isSuccess } = api.cards.createCard.useMutation();
  api.cardsCollection.getCardCollection.useQuery(
    {
      id: cardCollectionId,
    },
    { enabled: isSuccess }
  );
  const [formData, setFormData] = useState<FormCollectionInput>(initialState);
  const handleCreateCard = async () => {
    const createdCard = await mutateAsync({
      cardsCollectionId: cardCollectionId,
      nextReview: getToday(),
      ...formData,
    });
    if (createdCard) {
      setFormData(initialState);
    }
  };

  return (
    <>
      {isSuccess && <Alert message="Created new card!" status="success" />}
      <label htmlFor="my-modal-6" className="btn-outline btn">
        Create
      </label>

      <input type="checkbox" id="my-modal-6" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Create new card</h3>
          <div className="form-control w-full max-w-xs">
            <Input
              question="Provide question for front side of card"
              stateProperty="front"
              key={"front"}
              formData={formData}
              setFormData={setFormData}
            />
            <Input
              question="Provide answer for back side card"
              stateProperty="back"
              key={"back"}
              formData={formData}
              setFormData={setFormData}
            />
            <Input
              question="Add img url"
              stateProperty="imgUrl"
              key={"imgUrl"}
              formData={formData}
              setFormData={setFormData}
            />
            <Input
              question="Add audio url"
              stateProperty="audioUrl"
              key={"audioUrl"}
              formData={formData}
              setFormData={setFormData}
            />
          </div>
          <div className="modal-action">
            <label
              htmlFor="my-modal-6"
              className="btn"
              onClick={handleCreateCard}
            >
              Create
            </label>
            <label htmlFor="my-modal-6" className="btn">
              Close
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCardModal;
