import { Dialog } from "@headlessui/react";
import { DragAndDrop } from "@/components/companies/DragAndDrop";
import { Input } from "@/components/directory/Input";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";
import { UploadProgressBar } from "@/components/companies/UploadProgressBar";
import { companyFormLabels } from "@/utils/companyFormLabels";
// import { useCreateNewCompany } from "@/hooks/insurance_company/useCreateNewCompany";
import { useDragNDrop } from "@/hooks/insurance_company/useDragNDrop";
//
export const CreateCompany = ({
  isSubmitting,
  register,
  handleSubmit,
  errors,
  onSubmit,
  progress,
  closeModal,
}) => {
  // drap n drop hook
  const {
    files,
    handleSetFiles,
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragActive,
    isDragReject,
  } = useDragNDrop();

  return (
    <>
      <div className="px-4 py-5 sm:px-6">
        {progress > 0 && <UploadProgressBar progress={progress} />}

        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <PencilSquareIcon
              className="h-8 w-8 rounded-full text-cyan-600"
              aria-hidden="true"
            />
          </div>
          <div className="min-w-0 flex-1">
            <Dialog.Title
              as="h3"
              className="text-base font-semibold leading-6 text-gray-900"
            >
              Crear Compañia
            </Dialog.Title>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit((data) => onSubmit(data, files))}
        className="mt-2 mb-6"
      >
        <div className="m-6 grid grid-cols-2 items-start gap-6">
          {companyFormLabels.map((input) => (
            <div key={input.name} className="col-span-1 col-start-1">
              <Input
                errors={errors}
                errorMessage={input.errorMessage}
                htmlFor={input.htmlFor}
                register={register}
                name={input.name}
                isRequired={input.isRequired}
                label={input.label}
                autoComplete={input.autoComplete}
                type={input.type}
              />
            </div>
          ))}

          <DragAndDrop
            files={files}
            getRootProps={getRootProps}
            getInputProps={getInputProps}
            handleSetFiles={handleSetFiles}
            isDragActive={isDragActive}
            isDragReject={isDragReject}
            isDragAccept={isDragAccept}
          />

          {/* notes about the user */}
          <div className="col-span-2">
            <div className="rounded-md">
              <div className="sm:col-span-6">
                <label
                  htmlFor="notes"
                  className="block text-sm font-medium text-gray-700"
                >
                  Notas
                </label>
                <div className="mt-1">
                  <textarea
                    id="notes"
                    {...register("notes")}
                    placeholder="ejemplo: La poliza de Ambetter tiene que ser renovada en 6 meses."
                    name="notes"
                    rows={3}
                    className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm"
                    defaultValue={""}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className={
              isSubmitting
                ? "inline-flex w-full justify-center rounded-md bg-gray-300 px-3 py-2 text-sm font-semibold text-gray-400 shadow-sm sm:ml-3 sm:w-auto"
                : "inline-flex w-full justify-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 sm:ml-3 sm:w-auto"
            }
          >
            Crear
          </button>
          <button
            type="button"
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            onClick={closeModal}
          >
            Cancelar
          </button>
        </div>
      </form>
    </>
  );
};

CreateCompany.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  register: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  progress: PropTypes.number.isRequired,
  closeModal: PropTypes.func.isRequired,
};
