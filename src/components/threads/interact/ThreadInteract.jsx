import {
  FaRegThumbsUp,
  FaRegThumbsDown,
  FaThumbsUp,
  FaThumbsDown,
} from "react-icons/fa6";
import PropTypes from "prop-types";
import { BiMessageRoundedDots } from "react-icons/bi";
import { toast } from "react-toastify";
import {
  useDownVoteThreadMutation,
  useUpVoteThreadMutation,
  useNeutralVoteThreadMutation,
  useUpVoteCommentThreadMutation,
  useDownVoteCommentThreadMutation,
  useNeutralVoteCommentThreadMutation,
} from "../../api/threadApi";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const ThreadInteract = ({
  className,
  upVotesBy,
  downVotesBy,
  id,
  comments,
  commentsId,
  totalComments,
  types,
}) => {
  const [upVoteThread, { error: isErrorUpVote }] = useUpVoteThreadMutation();
  const [downVoteThread, { error: isErrorDownVote }] =
    useDownVoteThreadMutation();
  const [neutralVoteThread] = useNeutralVoteThreadMutation();
  const [upVoteCommentThread, { error: isErrorUpVoteComment }] =
    useUpVoteCommentThreadMutation();
  const [downVoteCommentThread, { error: isErrorDownVoteComment }] =
    useDownVoteCommentThreadMutation();
  const [neutralVoteCommentThread] = useNeutralVoteCommentThreadMutation();
  const { userId, userToken } = useSelector((state) => state.auth);

  const isUserVoted = (votes, userId) => votes.includes(userId);
  const isUserVoteUp = isUserVoted(upVotesBy, userId);
  const isUserVoteDown = isUserVoted(downVotesBy, userId);
  const isUserVoteUpComments = comments
    ? isUserVoted(
        comments.map((item) => item.upVotesBy),
        userId
      )
    : [];
  const isUserVoteDownComments = comments
    ? isUserVoted(
        comments.map((item) => item.downVotesBy),
        userId
      )
    : [];
  const commentLength = comments ? comments.map((item) => item.upVotesBy) : [];
  const handleVote = (isUpVote, isUserVoted) => {
    const datax = { token: userToken, id };
    const test = {
      commentId: commentsId ? commentsId : "",
      id,
      token: userToken,
    };
    switch (types) {
      case "commentsVote":
        if (isUpVote) {
          if (isUserVoted) {
            neutralVoteCommentThread(test);
          } else {
            upVoteCommentThread(test);
          }
        } else {
          if (isUserVoted) {
            neutralVoteCommentThread(test);
          } else {
            downVoteCommentThread(test);
          }
        }
        break;
      case "threadsVote":
        if (isUpVote) {
          if (isUserVoted) {
            neutralVoteThread(datax);
          } else {
            upVoteThread(datax);
          }
        } else {
          if (isUserVoted) {
            neutralVoteThread(datax);
          } else {
            downVoteThread(datax);
          }
        }
        break;
    }
  };

  const handleUpVote = () => {
    const votes = types == "commentsVote" ? isUserVoteUpComments : isUserVoteUp;
    handleVote(true, votes);
    console.log(commentLength);
  };

  const handleDownVote = () => {
    const votes =
      types == "commentsVote" ? isUserVoteDownComments : isUserVoteDown;
    handleVote(false, votes);
  };

  useEffect(() => {
    if (
      isErrorUpVote ||
      isErrorDownVote ||
      isErrorDownVoteComment ||
      isErrorUpVoteComment
    ) {
      toast.error(
        `Unauthorized tolong login terlebih dahulu untuk melanjutkan`
      );
    }
  }, [
    isErrorUpVote,
    isErrorDownVote,
    isErrorDownVoteComment,
    isErrorUpVoteComment,
  ]);

  return (
    <div className={`interact my-3 flex justify-between ${className}`}>
      <div className="flex justify-start items-center gap-5">
        <button
          data-test={"voteUp"}
          className="flex gap-4 items-center"
          onClick={handleUpVote}
        >
          {isUserVoteUp ? (
            <FaThumbsUp data-test={"ThumbsUp"} size={25} />
          ) : (
            <FaRegThumbsUp data-test={"RegThumbsUp"} size={25} />
          )}
          <span>{upVotesBy?.length}</span>
        </button>
        <button
          data-test={"voteDown"}
          className="flex gap-4 items-center"
          onClick={handleDownVote}
        >
          {isUserVoteDown ? (
            <FaThumbsDown size={25} />
          ) : (
            <FaRegThumbsDown size={25} />
          )}
          <span>{downVotesBy?.length}</span>
        </button>
      </div>
      <div className={`comment ${types == "commentsVote" ? "hidden" : ""}`}>
        <button className="flex gap-4 items-center">
          <BiMessageRoundedDots size={25} />{" "}
          <span>{comments ? comments.length : totalComments}</span>
        </button>
      </div>
    </div>
  );
};

ThreadInteract.propTypes = {
  comments: PropTypes.array,
  types: PropTypes.string,
  downVotesBy: PropTypes.array,
  upVotesBy: PropTypes.array,
  id: PropTypes.string,
  className: PropTypes.string,
  commentsId: PropTypes.string,
  totalComments: PropTypes.number,
};

export default ThreadInteract;
