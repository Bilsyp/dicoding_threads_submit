import { formatTimeAgo } from "../../utils";
import parse from "html-react-parser";
import ThreadInteract from "../interact/ThreadInteract";
import PropTypes from "prop-types";

const CardComment = ({ comments, id }) => {
  return (
    <div className="cardComment" data-testid="comment">
      {comments.map((item, idx) => {
        return (
          <div
            key={idx}
            className="users_comments break-all break-words my-3 border rounded-md p-3"
          >
            <div className="user flex items-center gap-3">
              <img
                className=" w-10 h-10 lg:w-16 lg:h-16 rounded-full"
                src={item.owner.avatar}
                alt=""
              />
              <span>
                <span data-testid="name">{item.owner.name}</span>
                <span className="block text-sm text-gray-500">
                  {formatTimeAgo(item.createdAt)}
                </span>
              </span>
            </div>
            <article>{parse(item.content)}</article>
            <ThreadInteract
              types={"commentsVote"}
              comments={comments}
              upVotesBy={item.upVotesBy}
              id={id}
              commentsId={item.id}
              downVotesBy={item.downVotesBy}
            />
          </div>
        );
      })}
      ;
    </div>
  );
};
CardComment.propTypes = {
  comments: PropTypes.array,
  id: PropTypes.string,
};
export default CardComment;
