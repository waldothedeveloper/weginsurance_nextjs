import { Divider } from "@/components/Divider";
import { PersonalUserInfo } from "@/components/directory/PersonalUserInfo";
import { UserNotes } from "@/components/directory/UserNotes";
import { useNewUserForm } from "@/hooks/user_directory/useNewUserForm";
//
export const UserFormWrapper = () => {
  const { register, handleSubmit, errors, onSubmit, isSubmitting } =
    useNewUserForm();

  return (
    <div className="py-16 px-12">
      <div className="space-y-8 divide-y sm:space-y-5">
        <div className="space-y-6 sm:space-y-5">
          <div>
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Crear Usuario Nuevo
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Llene este formulario para crear un usuario nuevo. Revise bien las
              instruciones.
            </p>
          </div>
          <div className="py-12 px-2 md:px-0">
            <div className="mx-auto max-w-7xl">
              <form onSubmit={handleSubmit(onSubmit)}>
                <Divider />
                <PersonalUserInfo register={register} errors={errors} />
                <Divider />
                <UserNotes register={register} />

                <div className="px-2 pt-12">
                  <div className="flex justify-end">
                    <button
                      disabled={isSubmitting ?? false}
                      type="submit"
                      className={
                        isSubmitting
                          ? "ml-3 inline-flex justify-center rounded-md border border-transparent bg-gray-300 py-2 px-4 text-sm font-medium text-gray-400 shadow-sm"
                          : "ml-3 inline-flex justify-center rounded-md border border-transparent bg-cyan-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                      }
                    >
                      Guardar
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
