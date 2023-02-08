import Link from "next/link";
import { useRouter } from "next/router";
import { NAVIGATION_ROUTES } from "../../constants/navigation";

export default function FourOhFour() {
  const router = useRouter();
  return (
    <div className="hero bg-base-200">
      <div className="hero-content py-32 text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">404</h1>
          <p className="py-6">Page is not exist!</p>
          <button
            className="btn-primary btn"
            onClick={() => router.push(NAVIGATION_ROUTES.stats)}
          >
            Go back home
          </button>
        </div>
      </div>
    </div>
  );
}
