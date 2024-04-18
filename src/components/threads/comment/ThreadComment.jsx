import { FaRegCommentDots } from "react-icons/fa6";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useCreateThreadCommentMutation } from "../../api/threadApi";
import { useRef } from "react";
import CardComment from "./CardComment";
const ThreadComment = ({ comments, id }) => {
  const { userData, userToken, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const contentRef = useRef(null);
  const [createThreadComment] = useCreateThreadCommentMutation();
  const handleSubmit = () => {
    const data = {
      token: userToken,
      threadId: id,
      content: contentRef.current.textContent,
    };
    createThreadComment(data);
  };
  const handleCancel = () => {
    contentRef.current.textContent = "";
  };
  return (
    <section className=" prose-sm">
      {isAuthenticated ? (
        <>
          <div className="comment ">
            <div className="user_comment  px-3 border mt-10 mb-8">
              <div className="user_avatar flex gap-5 items-center ">
                <img
                  src={userData.avatar}
                  className="rounded-full w-10 h-10 lg:w-16 lg:h-16"
                  alt=""
                />
                <div className="user_name">
                  <p className="block text-sm text-gray-500">{userData.name}</p>
                </div>
              </div>
              <div
                contentEditable
                ref={contentRef}
                className="user_comment_content border min-h-16 rounded-md p-3"
              ></div>
              <div className="btn_group flex gap-4 text-sm my-2">
                <button
                  onClick={handleCancel}
                  className="flex gap-3 items-center shadow border rounded-md p-3"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex gap-3 items-center bg-slate-900 text-white rounded-md p-3"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <section className="border rounded-md text-center py-1 shadow-md my-3">
            <span className="text-sm text-gray-500">
              Please Login to create or like comment{" "}
              <FaRegCommentDots className="inline" />
            </span>
          </section>
        </>
      )}
      <div className="flex flex-col gap-5">
        <CardComment id={id} comments={comments} />
      </div>
    </section>
  );
};
ThreadComment.propTypes = {
  comments: PropTypes.array,
  id: PropTypes.string,
};
export default ThreadComment;
