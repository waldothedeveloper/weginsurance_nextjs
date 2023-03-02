import PropTypes from "prop-types";
import { classNames } from "@/utils/classNames";

//
export const NavigationLinks = ({ handleChange, navigation }) => {
  return (
    <nav className="mt-5 flex-1" aria-label="Sidebar">
      <div className="space-y-1 px-2">
        {navigation.map((item) => (
          <button
            key={item.name}
            onClick={() => handleChange(item.href)}
            className={classNames(
              item.current
                ? "bg-gray-200 text-gray-900"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
              "group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full"
            )}
          >
            <item.icon
              className={classNames(
                item.current
                  ? "text-gray-500"
                  : "text-gray-400 group-hover:text-gray-500",
                "mr-3 h-6 w-6"
              )}
              aria-hidden="true"
            />
            {item.name}
          </button>
        ))}
      </div>
    </nav>
  );
};

NavigationLinks.propTypes = {
  handleChange: PropTypes.func.isRequired,
  navigation: PropTypes.arrayOf(
    PropTypes.shape({
      current: PropTypes.bool.isRequired,
      href: PropTypes.string.isRequired,
      icon: PropTypes.object.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};
