import PropTypes from "prop-types";
//
export const Spinning = ({ message }: { message: string }) => {
  return (
    <div
      data-testid="spinning"
      className="flex h-full items-center justify-center"
    >
      <div
        className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-slate-300 motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      />
      <p className="ml-3 text-slate-400">{message}...</p>
    </div>
  );
};

Spinning.propTypes = {
  message: PropTypes.string.isRequired,
};
