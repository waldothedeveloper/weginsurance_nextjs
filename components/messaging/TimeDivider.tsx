import PropTypes from "prop-types";

export const TimeDivider = ({ time }: { time: string }) => {
  return (
    <div className="relative mx-auto my-6 max-w-lg">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-300" />
      </div>
      <div className="relative flex justify-center">
        <span className="bg-white px-2 text-xs text-gray-500">
          {new Date(time).toLocaleDateString("es", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      </div>
    </div>
  );
};

TimeDivider.propTypes = {
  time: PropTypes.string.isRequired,
};
