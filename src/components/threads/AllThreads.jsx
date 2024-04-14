import { useGetAllThreadsQuery } from "../api/threadApi";
import CardThread from "./CardThread";
import Loading from "../Loading";
import Error from "../Error";
import CategoryThreads from "./CategoryThreads";
import { useState } from "react";
import { useClickAway } from "@uidotdev/usehooks";

const AllThreads = () => {
  const { data, error, isLoading } = useGetAllThreadsQuery();
  const [category, setCategory] = useState("");
  const ref = useClickAway(() => {
    setCategory("");
  });
  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }
  const filterData = data.filter((item) =>
    category == "" ? item : item.category == category
  );
  return (
    <section className="all_threads px-1 lg:px-0">
      <CategoryThreads
        category={category}
        setCategory={setCategory}
        data={data}
      />
      <div
        ref={ref}
        className="grid   mx-auto my-10 gap-6 md:grid-cols-2 lg:grid-cols-3 md:gap-8 p-4"
      >
        {filterData?.map((item, idx) => (
          <CardThread key={idx} {...item} />
        ))}
      </div>
    </section>
  );
};

export default AllThreads;
