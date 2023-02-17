import React from "react";
import SpacedRepetition from "../../components/SpacedRepetition";
import { api } from "../../utils/api";
import Loader from "../../components/Loader";

const TableRow = ({
  imgUrl,
  name,
}: {
  imgUrl: string | null;
  name: string | null;
}) => {
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
              <img src={imgUrl ? imgUrl : "./anon_avatar.webp"} alt="Avatar" />
            </div>
          </div>
          <div>
            <div className="font-bold">{name}</div>
            <div className="text-sm opacity-50">United States</div>
          </div>
        </div>
      </td>
      <td>
        Zemlak, Daniel and Leannon
        <br />
        <span className="badge-ghost badge badge-sm">
          Desktop Support Technician
        </span>
      </td>
      <td>Purple</td>
      <th>
        <button className="btn-ghost btn-xs btn">details</button>
      </th>
    </tr>
  );
};

const RatingPage = () => {
  const { data, isLoading } = api.users.getUsersByRating.useQuery();

  if (isLoading) return <Loader />;
  return (
    <div className="w-full overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>Name</th>
            <th>Job</th>
            <th>Favorite Color</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data?.map((el) => (
            <TableRow imgUrl={el.image} name={el.name} />
          ))}
        </tbody>

        <tfoot>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Job</th>
            <th>Favorite Color</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
export default RatingPage;
