import { FakeUser, RealUser } from "@/interfaces/index";
import { forwardRef, useEffect } from "react";

import { CustomHits } from "@/components/algolia/CustomHits"
import { CustomSearchBox } from "@/components/algolia/CustomSearchBox"
import { EmptyQueryBoundary } from "@/components/algolia/EmptyQueryBoundary"
// import { SearchBox } from 'react-instantsearch-hooks-web';
import { Spinning } from "@/components/Spinning";
import { UserList } from "@/components/directory/UserList"
import { Virtuoso } from "react-virtuoso";
import { selectedUserAtom } from "@/lib/state/atoms";
import { useAtomValue } from "jotai"
import { useFakeUserList } from "@/hooks/test/useFakeUserList";
import { useFirebaseUsers } from "@/hooks/user_directory/useFirebaseUsers";
import { useRouter } from "next/router";

//
const Footer = () => (
  <div className="flex justify-center px-6 py-5 text-xs text-slate-400">
    Ha llegado al final de la lista.
  </div>
);

// eslint-disable-next-line react/display-name
const List = forwardRef((props, ref) => {
  return <ul {...props} ref={ref} className="z-0 w-full px-6" />;
});

// eslint-disable-next-line no-unused-vars
export const VirtualizedUserList = ({ getMessages }: { getMessages: (userId: string) => Promise<void> }) => {
  const selectedUser = useAtomValue(selectedUserAtom);
  const router = useRouter();

  useEffect(() => {
    if (selectedUser) {
      router.push(`/admin/messages?userId=${selectedUser?.id}`, undefined, {
        shallow: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUser]);

  //! make sure to change this test = false when you're done testing
  const test = false;
  const { firebaseUsers, firebaseError } = useFirebaseUsers();
  const fakeUserList: FakeUser[] = useFakeUserList();


  if (firebaseError) {
    return (
      <div>
        ERROR of the application {JSON.stringify(firebaseError, null, 2)}
      </div>
    );
  }



  if (test ? fakeUserList?.length === 0 : firebaseUsers?.length === 0) {
    return <Spinning message="Cargando Usuarios" />;
  }

  return (
    <>
      <div className="px-6 pb-6 pt-6">
        <h2 className="text-lg font-medium text-slate-900">Directorio</h2>
        <p className="mt-1 text-sm text-slate-600">
          Directorio de búsqueda de{" "}
          {test ? fakeUserList?.length : firebaseUsers.length} usuarios
        </p>
        {/* <div
          className="mt-6 flex space-x-4"
        >
          <div className="min-w-0 flex-1">
            <SearchBox classNames={{
              root: 'w-full rounded-md',
              form: 'w-full mt-6 flex gap-x-4 relative',
              input: 'shadow-sm block w-full rounded-md border-0 py-1.5 pl-10 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6',
              submit: 'absolute inset-y-0 left-0 flex items-center pl-3',
            }} />
          </div>
        </div> */}
        <CustomSearchBox />
      </div>
      {/* Directory list */}
      <nav
        className="bg-secondary max-h-[80vh] flex-1 overflow-y-auto"
        aria-label="Directory"
      >

        <EmptyQueryBoundary fallback={<Virtuoso
          components={{ List, Footer }}
          data={test ? fakeUserList : firebaseUsers}
          itemContent={(index, user: RealUser) => (
            <UserList user={user} getMessages={getMessages} />
          )}
        />}>
          <CustomHits getMessages={getMessages} />
        </EmptyQueryBoundary>
      </nav>
    </>
  );
};
