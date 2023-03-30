import PropTypes from "prop-types";

export const UploadProgressBar = ({ progress }) => {
  return (
    <div className="my-6">
      <p className="p-0.5 text-xs text-gray-700">
        {progress < 100
          ? `Subiendo el archivo...`
          : `El archivo subio con exito!`}
      </p>
      <div className="w-full rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className={
            progress < 100
              ? "rounded-full bg-blue-600 py-px text-center text-xs font-medium leading-none text-blue-100"
              : "rounded-full bg-green-600 py-px text-center text-xs font-medium leading-none text-green-100"
          }
          style={{ width: `${progress}%` }}
        >
          {progress}%
        </div>
      </div>
    </div>
  );
};

UploadProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
};
