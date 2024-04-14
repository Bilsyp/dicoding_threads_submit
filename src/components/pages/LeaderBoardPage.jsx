import { useGetLeaderboardsQuery } from "../api/threadApi";
import Loading from "../Loading";
import Error from "../Error";
import { FaCrown } from "react-icons/fa6";
const LeaderBoardPage = () => {
  const { data, error, isLoading } = useGetLeaderboardsQuery();

  const sortedData = data ? [...data].sort((a, b) => b.score - a.score) : [];

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  return (
    <section>
      <div className="max-w-2xl overflow-clip   px-4 lg:max-w-6xl mx-auto my-10">
        <div>
          <h2 className="text-xl py-3 text-center">Klasmen Pengguna Aktif</h2>
          <ul className=" h-[80vh] relative overflow-scroll scrollbar overflow-x-hidden">
            {sortedData?.map((item, idx) => {
              return (
                <li
                  className="odd:bg-gray-50 p-3 rounded-md even:bg-gray-100 flex justify-between items-center"
                  key={idx}
                >
                  <div className="user flex items-center gap-2">
                    <img
                      src={item.user.avatar}
                      className=" w-14 h-14 rounded-full"
                      alt=""
                    />
                    <div>
                      <h2>
                        {item.user.name}{" "}
                        {item.score === sortedData[0].score ? (
                          <FaCrown
                            className="inline"
                            size={20}
                            color="yellow"
                          />
                        ) : (
                          ""
                        )}
                      </h2>
                    </div>
                  </div>
                  <div className="text-center">
                    <h2>Score</h2>
                    <span
                      className={`block font-semibold ${
                        item.score === sortedData[0].score
                          ? "text-blue-600"
                          : ""
                      }`}
                    >
                      {item.score}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default LeaderBoardPage;
