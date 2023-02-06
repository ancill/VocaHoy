import { useRouter } from "next/router";
import {
  NAVIGATION_CONFIGURATION,
  NAVIGATION_ROUTES,
} from "../../constants/navigation";
import { DeckSession } from "@prisma/client";

const ProgressBar = ({
  deckLabel,
  sessionInfo: { masteredCount, newCount, reviewCount, progressCount },
}: {
  sessionInfo: DeckSession;
  deckLabel: string;
}) => {
  const router = useRouter();

  const label = "Deck name";

  return (
    <div className="navbar rounded-lg bg-base-100 px-6">
      <div className="navbar-start flex">
        <button
          className="btn-outline btn-square btn mr-4"
          onClick={() => router.push(NAVIGATION_ROUTES.lib)}
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
          <h3 className="text-xl normal-case">{deckLabel}</h3>
          <span className="mr-4 text-base">{progressCount}</span>
          <progress
            className="progress progress-primary w-20"
            value="40"
            max="100"
          ></progress>
        </div>
      </div>

      <div className="navbar-end flex space-x-2">
        {[
          { count: newCount, badge: "badge-primary" },
          { count: reviewCount, badge: "badge-accent" },
          { count: masteredCount, badge: "badge-success" },
        ].map((el) => (
          <span
            className={`${el.badge} badge indicator-item py-3 px-2 font-mono text-lg`}
          >
            {el.count}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
