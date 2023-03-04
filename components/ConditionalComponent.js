import { DevicePhoneMobileIcon, UserIcon } from "@heroicons/react/24/outline";

import { Placeholder } from "@/components/placeholder";
import PropTypes from "prop-types";
import { UserFormWrapper } from "@/components/directory/UserFormWrapper";

//
export const ConditionalComponent = ({ currentLink }) => {
  switch (currentLink) {
    case "messages":
      return (
        <Placeholder
          icon={
            <DevicePhoneMobileIcon className="h-24 w-24 mx-auto text-slate-400" />
          }
          title="Lista de Mensajes"
          message=" Selecione un usuario de la lista para ver los mensajes enviados y
          recibidos."
        />
      );
    case "directory":
      return (
        <Placeholder
          icon={<UserIcon className="h-24 w-24 mx-auto text-slate-400" />}
          title="Perfil de Usuario"
          message=" Selecione un usuario de la lista para editar, o borrar un usuario."
        />
      );
    case "new_user":
      return <UserFormWrapper />;
    case "new_company":
      return <div>I will be the NEW COMPANY component</div>;
    default:
      return null;
  }
};

ConditionalComponent.propTypes = {
  currentLink: PropTypes.string.isRequired,
};
