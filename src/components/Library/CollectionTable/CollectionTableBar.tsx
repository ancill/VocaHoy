import router from "next/router";
import React from "react";
import { NAVIGATION_ROUTES } from "../../../constants/navigation";
import { api } from "../../../utils/api";
import CreateCardModal from "../CreateCardModal";

const CollectionTableBar = ({ label }: { label: string }) => {
  return  <div className="navbar rounded-t-lg bg-base-200 px-6">
      <div className="navbar-start flex">
        <button
          className="btn-outline btn-square btn mr-4"
          onClick={() => router.push(NAVIGATION_ROUTES.lib)}
          title="back"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
            />
          </svg>
        </button>
        <div>
          <h3 className="text-xl normal-case">{label}</h3>
        </div>
      </div>
      <div className="navbar-end">
       <CreateCardModal />
      </div>
    </div>
  );
};

export default CollectionTableBar;
