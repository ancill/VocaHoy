import { useSession, signOut, signIn } from "next-auth/react";
import { api } from "../../utils/api";

const Auth: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  if (!sessionData) {
    return (
      <button className="btn" onClick={() => void signIn()}>
        Sign in
      </button>
    );
  }

  return (
    <div className="dropdown-end dropdown">
      <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
        <div className="w-10 rounded-full">
          <img src={sessionData.user?.image} />
        </div>
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
      >
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">{sessionData.user?.name}</span>
          </a>
        </li>
        <li>
          <a>Settings</a>
        </li>
        <li>
          <a onClick={() => void signOut()}>Sign out</a>
        </li>
      </ul>
    </div>
  );
};

export default Auth;
