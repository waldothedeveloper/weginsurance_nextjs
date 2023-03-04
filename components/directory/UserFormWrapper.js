import { Divider } from "@/components/Divider";
import { PersonalUserInfo } from "@/components/directory/PersonalUserInfo";
import { UserNotes } from "@/components/directory/UserNotes";
import { useNewUserForm } from "@/hooks/useNewUserForm";
//
export const UserFormWrapper = () => {
  const { register, handleSubmit, errors, onSubmit } = useNewUserForm();

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
            <div className="max-w-7xl mx-auto">
              <form onSubmit={handleSubmit(onSubmit)}>
                <Divider />
                <PersonalUserInfo register={register} errors={errors} />
                <Divider />
                <UserNotes register={register} />

                <div className="pt-12 px-2">
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-700 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
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
