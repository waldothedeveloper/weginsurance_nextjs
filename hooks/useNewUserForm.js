import { createUser } from "@/lib/createUser";
import { getUser } from "@/lib/getUser";
import { normalizeString } from "@/utils/normalizeString";
import { updateUser } from "@/lib/updateUser";
import { useForm } from "react-hook-form";
//
export const useNewUserForm = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const tempNewUser = data;

    if (tempNewUser?.active_user === "Si") {
      tempNewUser.active_user = true;
    } else {
      tempNewUser.active_user = false;
    }

    tempNewUser.notes = data.notes.trim();
    tempNewUser.firstname = normalizeString(data.firstname);
    tempNewUser.second_name = normalizeString(data.second_name);
    tempNewUser.lastname = normalizeString(data.lastname);
    tempNewUser.second_lastname = normalizeString(data.second_lastname);
    tempNewUser.email = data.email.trim();
    tempNewUser.fullname = `${tempNewUser.firstname} ${tempNewUser.lastname}`;

    // first, make sure there is no existing user with the same phone number
    getUser(tempNewUser?.phone)
      .then((users) => {
        if (Array.isArray(users) && users.length === 1) {
          const { id } = users[0];
          // there is a user with the same phone number, just update it
          updateUser(tempNewUser, id)
            .then(() => reset())
            .catch((err) => {
              // console.log(`Error trying to UPDATE the new user`, err);
              return err;
            });
        } else if (Array.isArray(users) && users.length > 1) {
          //! there seems to be more than one user with the same phone number, show all of them on a list  and FEAT: merge them? keep one?
        } else {
          // just create the new user
          createUser(tempNewUser)
            .then(() => reset())
            .catch((err) => {
              // console.log(`Error trying to CREATE the new user`, err);
              return err;
            });
        }
      })
      .catch((err) => {
        // console.log(`cannot get existing user`, err);
        return err;
      });
  };

  return { register, handleSubmit, errors, onSubmit };
};
