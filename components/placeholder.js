import PropTypes from "prop-types";

export const Placeholder = ({ title, message, icon }) => {
  return (
    <div className="h-full grid items-center py-24 px-6 sm:py-32 lg:px-8">
      {icon}
      <div className="mt-6 mx-auto max-w-2xl text-center">
        <h2 className="text-4xl tracking-tight text-slate-500 sm:text-5xl">
          {title}
        </h2>
        <p className="mt-6 text-lg leading-8 text-slate-600">{message}</p>
      </div>
    </div>
  );
};

Placeholder.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
};
