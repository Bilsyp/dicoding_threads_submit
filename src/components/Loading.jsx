// src/components/Loading.jsx
import PropTypes from "prop-types";
import PulseLoader from "react-spinners/PulseLoader";
const Loading = () => {
  return (
    <div
      data-test={"loading-test"}
      data-testid="isFetching"
      className=" h-[90vh] justify-center  items-center flex"
    >
      <PulseLoader size={30} />
      {/* loading... */}
    </div>
  );
};
Loading.propTypes = {
  message: PropTypes.string,
};
export default Loading;
