import PropTypes from "prop-types";

const CategoryThreads = ({ data, setCategory, category }) => {
  const uniqueData = [...new Set(data.map((item) => item.category))];
  return (
    <div
      className="rounded-lg   mx-auto border bg-card text-card-foreground shadow-sm w-full max-w-xl"
      data-v0-t="card"
    >
      <div className="p-6">
        <div className="grid gap-1">
          <h3 className="text-lg font-semibold py-3">Threads Categories</h3>
        </div>
        <div className="flex items-start gap-4 flex-wrap">
          {uniqueData.map((item, idx) => {
            return (
              <button
                onClick={() => setCategory(item)}
                key={idx}
                className={`${
                  item === category
                    ? "bg-slate-800 text-white"
                    : "bg-gray-50 hover:bg-gray-100"
                } rounded-lg px-3 py-1 border text-sm border-gray-200    transition-colors`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
CategoryThreads.propTypes = {
  data: PropTypes.array.isRequired,
  setCategory: PropTypes.func,
  category: PropTypes.string,
};
export default CategoryThreads;
