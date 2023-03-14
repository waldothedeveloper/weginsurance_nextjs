import Image from "next/image";
import PropTypes from "prop-types";

//
const UpdateInsuranceCompanyForm = () => {
  return <div>Form to update the insurance COmpany</div>;
};
//
export const SelectedInsuranceCompany = ({ selectedCompany }) => {
  return (
    <div className="relative isolate bg-white py-24 px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-xl lg:max-w-4xl">
        <h2 className="text-4xl font-bold tracking-tight text-gray-900">
          Detalles de Compañia de Seguros
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Aqui puede ver los detalles
        </p>
        <div className="mt-16 flex flex-col gap-16 sm:gap-y-20 lg:flex-row">
          <div className="lg:flex-auto">
            <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">
                  Nombre de la compañia de seguros
                </dt>
                <dd className="mt-1 text-base font-medium text-gray-900">
                  {selectedCompany?.name}
                </dd>
              </div>

              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Notas</dt>
                <dd className="mt-1 text-base font-medium text-gray-900">
                  {selectedCompany?.notes}
                </dd>
              </div>
            </div>
          </div>
          <div className="lg:w-80 lg:flex-none">
            <figure className="">
              <figcaption className="flex gap-x-6">
                <div className="relative aspect-[3/2] w-full rounded-2x">
                  <Image
                    src={selectedCompany?.logo_url}
                    className="object-contain"
                    alt="insurance company image"
                    fill
                  />
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
};

SelectedInsuranceCompany.propTypes = {
  selectedCompany: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    logo_url: PropTypes.string,
  }),
};
