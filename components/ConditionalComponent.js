import { DevicePhoneMobileIcon, UserIcon } from "@heroicons/react/24/outline";

import { Placeholder } from "@/components/placeholder";
import PropTypes from "prop-types";
import { SelectedInsuranceCompany } from "@/components/companies/SelectedInsuranceCompany";
import { UserFormWrapper } from "@/components/directory/UserFormWrapper";

//
export const ConditionalComponent = ({
  currentLink,
  selectedInsuranceCompany,
}) => {
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
    case "insurance_company":
      return (
        <SelectedInsuranceCompany selectedCompany={selectedInsuranceCompany} />
      );
    default:
      return null;
  }
};

ConditionalComponent.propTypes = {
  currentLink: PropTypes.string.isRequired,
  selectedInsuranceCompany: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    logo_url: PropTypes.string,
  }),
};
