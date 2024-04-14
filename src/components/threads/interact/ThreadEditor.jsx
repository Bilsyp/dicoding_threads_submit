import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import PropTypes from "prop-types";
const ThreadEditor = ({ value, setValue, type }) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "code"],
      ["clean"],
    ],
  };
  return (
    <ReactQuill
      className=" break-words  "
      formats={[
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "code",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "color",
      ]}
      modules={type == "title" ? {} : modules}
      value={value}
      onChange={setValue}
    />
  );
};
ThreadEditor.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func,
  type: PropTypes.string,
};
export default ThreadEditor;
