import { Link } from "react-router-dom";
import ThreadInteract from "./interact/ThreadInteract";
import PropTypes from "prop-types";
import parse from "html-react-parser";
import { formatTimeAgo } from "../utils";
const CardThread = ({
  title,
  id,
  body,
  comments,
  createdAt,
  upVotesBy,
  category,
  downVotesBy,
  totalComments,
}) => {
  const interactProps = {
    upVotesBy,
    id,
    comments,
    totalComments,
    downVotesBy,
  };
  return (
    <div
      data-test="card"
      data-testid="card"
      className="card border rounded-md shadow-md relative overflow-clip     min-h-72 "
    >
      <div className="flex flex-col rounded-lg overflow-hidden">
        <div className="flex-1 p-6 grid gap-4 ">
          <Link
            data-test="title"
            data-testid="title"
            to={`/detail/${id}`}
            className="font-semibold text-xl line-clamp-2 hover:underline"
            href="#"
          >
            {title}
          </Link>
          <span className="text-sm block text-gray-600">#{category}</span>
          <p className="text-sm text-gray-400">{formatTimeAgo(createdAt)}</p>

          <article
            data-testid="body"
            className="text-sm pb-5  break-all break-words  text-gray-500 dark:text-gray-400 line-clamp-2"
          >
            {parse(body)}
          </article>
          <ThreadInteract
            types={"threadsVote"}
            {...interactProps}
            className={"w-full left-0 px-4  absolute bottom-0"}
          />
        </div>
      </div>
    </div>
  );
};
CardThread.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string,
  createdAt: PropTypes.string,
  ownerId: PropTypes.string,
  body: PropTypes.string,
  comments: PropTypes.array,
  upVotesBy: PropTypes.array,
  downVotesBy: PropTypes.array,
  category: PropTypes.string,
  totalComments: PropTypes.number,
};
export default CardThread;
