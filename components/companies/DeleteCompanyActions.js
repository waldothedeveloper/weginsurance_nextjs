import { DialogTitle } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";
//
export const DeleteCompanyActions = ({
  company,
  isSubmitting,
  handleDeleteCompany,
  handleCloseModal,
}) => {
  return (
    <>
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <ExclamationTriangleIcon
              className="h-6 w-6 text-red-600"
              aria-hidden="true"
            />
          </div>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <DialogTitle
              as="h3"
              className="text-base font-semibold leading-6 text-slate-900"
            >
              Eliminar Compañia de Seguros
            </DialogTitle>
            <div className="mt-2">
              <p className="text-sm text-slate-500">
                Usted esta a punto de eliminar la compañia{" "}
                <span className="font-semibold text-red-500">
                  {company?.name}
                </span>
                . Esta seguro que desea eliminarla? Esta accion es irreversible.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-slate-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          type="button"
          disabled={isSubmitting}
          className={
            isSubmitting
              ? "inline-flex w-full justify-center rounded-md bg-slate-300 px-3 py-2 text-sm font-semibold text-slate-400 shadow-xs sm:ml-3 sm:w-auto"
              : "inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
          }
          onClick={handleDeleteCompany}
        >
          Si, eliminar
        </button>
        <button
          disabled={isSubmitting}
          type="button"
          className={
            isSubmitting
              ? "mt-3 inline-flex w-full justify-center rounded-md bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-400 shadow-xs ring-1 ring-inset ring-slate-300 sm:mt-0 sm:w-auto"
              : "mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-xs ring-1 ring-inset ring-slate-300 hover:bg-slate-50 sm:mt-0 sm:w-auto"
          }
          onClick={handleCloseModal}
        >
          Cancelar
        </button>
      </div>
    </>
  );
};

DeleteCompanyActions.propTypes = {
  company: PropTypes.shape({
    id: PropTypes.string.isRequired,
    logo_url: PropTypes.string,
    name: PropTypes.string.isRequired,
    notes: PropTypes.string,
  }),
  isSubmitting: PropTypes.bool.isRequired,
  handleDeleteCompany: PropTypes.func.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
};
