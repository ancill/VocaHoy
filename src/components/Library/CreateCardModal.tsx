import { useRouter } from "next/router";
import React, { useState } from "react";
import { api } from "../../utils/api";
import { Card } from "@prisma/client";
import { NAVIGATION_ROUTES } from "../../constants/navigation";

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

const CreateCardModal = ({
  cardCollectionId,
}: {
  cardCollectionId: string;
}) => {
  const router = useRouter();
  const { mutateAsync } = api.cards.createCard.useMutation();
  const [formData, setFormData] = useState<FormCollectionInput>({
    description: "",
    imgUrl: "",
    label: "",
  });
  const handleCreateCollection = async () => {
    const createdCollection = await mutateAsync({
      category: category,
      description: formData.description,
      imgUrl: formData.imgUrl,
      label: formData.label,
    });
    // Redirect to dynamic page for each session
    router.push(NAVIGATION_ROUTES.collection + `/${createdCollection.id}`);
  };

  return (
    <>
      <label htmlFor="my-modal-6" className="btn">
        Create
      </label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal-6" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="text-lg font-bold">
            Create new collection for {label}
          </h3>
          <div className="form-control w-full max-w-xs">
            <Input
              question="Name of new collection?"
              stateProperty="label"
              key={"label"}
              formData={formData}
              setFormData={setFormData}
            />
            <Input
              question="Provide meaningful description"
              stateProperty="description"
              key={"description"}
              formData={formData}
              setFormData={setFormData}
            />
            <Input
              question="Set unique emoji for this collection"
              stateProperty="imgUrl"
              key={"imgUrl"}
              formData={formData}
              setFormData={setFormData}
            />
          </div>
          <div className="modal-action">
            <label
              htmlFor="my-modal-6"
              className="btn"
              onClick={handleCreateCollection}
            >
              Create
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCardModal;
