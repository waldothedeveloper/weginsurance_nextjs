import { FieldErrors, FieldValues, UseFormHandleSubmit, UseFormRegister } from "react-hook-form"

import { Dialog } from "@headlessui/react";
import { DragAndDrop } from "@/components/companies/DragAndDrop";
import { Input } from "@/components/directory/Input";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { UploadProgressBar } from "@/components/companies/UploadProgressBar";
import { companyFormLabels } from "@/utils/companyFormLabels";
import { progressPercentageAtom } from "@/lib/state/atoms";
import { useAtomValue } from "jotai";

type CreateCompanyProps = {
  isSubmitting: boolean,
  register: UseFormRegister<FieldValues>,
  errors: FieldErrors<FieldValues>,
  // eslint-disable-next-line no-unused-vars
  onSubmit: (data: FieldValues) => (data: FieldValues) => void,
  handleSubmit: UseFormHandleSubmit<FieldValues>,
  closeModal: () => void,
}

export const UpdateCompany = ({
  isSubmitting,
  register,
  errors,
  onSubmit,
  handleSubmit,
  closeModal,
}: CreateCompanyProps) => {

  const progress = useAtomValue(progressPercentageAtom);
  return (
    <>
      <div className="px-4 py-5 sm:px-6">
        {progress > 0 && <UploadProgressBar progress={progress} />}

        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <PencilSquareIcon
              className="h-8 w-8 rounded-full text-blue-600"
              aria-hidden="true"
            />
          </div>
          <div className="min-w-0 flex-1">
            <Dialog.Title
              as="h3"
              className="text-base font-semibold leading-6 text-slate-900"
            >
              Actualizar Compañia
            </Dialog.Title>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit((data) => onSubmit(data))}
        className="mb-6 mt-2"
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

          <DragAndDrop />

          {/* notes about the user */}
          <div className="col-span-2">
            <div className="rounded-md">
              <div className="sm:col-span-6">
                <label
                  htmlFor="notes"
                  className="block text-sm font-medium text-slate-700"
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
                    className="block w-full rounded-md border border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
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
                ? "inline-flex w-full justify-center rounded-md bg-slate-300 px-3 py-2 text-sm font-semibold text-slate-400 shadow-sm sm:ml-3 sm:w-auto"
                : "inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
            }
          >
            Actualizar
          </button>
          <button
            type="button"
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 sm:mt-0 sm:w-auto"
            onClick={closeModal}
          >
            Cancelar
          </button>
        </div>
      </form>
    </>
  );
};

