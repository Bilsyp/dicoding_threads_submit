// src/components/Loading.jsx
import PropTypes from "prop-types";
import PulseLoader from "react-spinners/PulseLoader";
const Loading = () => {
  return (
    <div className=" h-[90vh] justify-center  items-center flex">
      <PulseLoader size={30} />
    </div>
  );
};
Loading.propTypes = {
  message: PropTypes.string,
};
export default Loading;
