import Loading from "../Loading";
import Error from "../Error";
import { useParams } from "react-router-dom";
import ThreadComment from "./comment/ThreadComment";
import { useGetDetailThreadQuery } from "../api/threadApi";
import parse from "html-react-parser";
import ThreadInteract from "./interact/ThreadInteract";
import { formatTanggal } from "../utils";
const DetailThread = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetDetailThreadQuery(id);
  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }
  return (
    <section className="detail_thread px-5">
      <div className=" max-w-3xl mx-auto prose-xl prose-h1:font-bold prose-headings:font-semibold">
        <article className="content prose-sm break-all break-words  lg:prose-xl ">
          <div className="avatar flex items-center gap-4 ">
            <img
              src={data?.owner.avatar}
              className=" w-16 h-16 rounded-full"
              alt=""
            />
            <article>
              <p className="text-[0.91rem] text-md  text-gray-500">
                {data?.owner.name}
                <span className="block text-sm text-gray-500">
                  {formatTanggal(data?.createdAt)}
                </span>
              </p>
            </article>
          </div>
          <div className="content font-semibold py-4">{parse(data?.title)}</div>
          <div className="body_content">{parse(data.body)}</div>
        </article>
        <ThreadInteract types={"threadsVote"} {...data} className={"my-3"} />
        <ThreadComment {...data} />
      </div>
    </section>
  );
};

export default DetailThread;
