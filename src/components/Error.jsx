import PropTypes from "prop-types";

const Error = ({ message }) => {
  return (
    <div
      data-test={"error-test"}
      data-testid={"error-test"}
      className="mx-auto flex justify-center items-center"
    >
      <img width={500} src="/404 Error with a cute animal-rafiki.png" alt="" />
      <h1 className="text-2xl">Oops! Terjadi Kesalahan</h1>
      <p>{message}</p>
    </div>
  );
};
Error.propTypes = {
  message: PropTypes.string,
};
export default Error;
