import { PlusIcon, UserPlusIcon } from "@heroicons/react/20/solid";
import React, { useEffect } from "react";
import { selectedUserAtom, uploadedFilesAtom } from "@/lib/state/atoms";

import { AlgoliaProvider } from "@/components/algolia/config";
import { CustomHits } from "@/components/algolia/CustomHits"
import { CustomSearchBox } from "@/components/algolia/CustomSearchBox"
import { EmptyQueryBoundary } from "@/components/algolia/EmptyQueryBoundary"
import { EmptyUserState } from "@/components/directory/EmptyUserState";
import { FakeUser } from "@/interfaces/index";
import { Spinning } from "@/components/Spinning";
import { TanStackVirtualizer } from "@/components/directory/TanStackVirtualizer";
import { useAtomValue } from "jotai"
import { useDeleteAllUploadedFiles } from "@/hooks/fileUploader/useDeleteAllUploadedFiles";
import { useFakeUserList } from "@/hooks/test/useFakeUserList";
import { useFirebaseUsers } from "@/hooks/user_directory/useFirebaseUsers";
import { useRouter } from "next/router";

export type Ref = HTMLUListElement


// eslint-disable-next-line no-unused-vars
export const VirtualizedUserList = () => {
  const selectedUser = useAtomValue(selectedUserAtom);
  const router = useRouter();
  const handleDeleteAllFiles = useDeleteAllUploadedFiles();
  const uploadedResources = useAtomValue(uploadedFilesAtom);

  useEffect(() => {
    if (selectedUser) {
      router.push(`/admin/messages?userId=${selectedUser?.id}`, undefined, {
        shallow: true,
      });
      // if selectedUser changes, and there are files (images or documents) uploaded, then we need to clean the files
      if (uploadedResources.length > 0) handleDeleteAllFiles()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUser]);

  //! make sure to change this test = false when you're done testing
  const test = false;
  const { firebaseUsers, firebaseError, isLoadingFirebaseUsers } = useFirebaseUsers();
  const fakeUserList: FakeUser[] = useFakeUserList();



  if (firebaseError) {
    return (
      <div>
        ERROR of the application {JSON.stringify(firebaseError, null, 2)}
      </div>
    );
  }


  if (test ? !fakeUserList : !firebaseUsers || isLoadingFirebaseUsers) {
    return <Spinning message="Cargando Usuarios" />;
  }

  if (test ? fakeUserList.length === 0 : firebaseUsers?.length === 0) {
    return <EmptyUserState>
      <div>
        {/* Create user button */}
        <button
          disabled
          type="button"
          className="hidden items-center gap-x-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 md:inline-flex lg:ml-4"
        >
          <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
          Crear usuario
        </button>
        <span className="inline-flex md:hidden">
          <button
            disabled
            type="button"
            className="ml-4 inline-flex items-center gap-x-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <UserPlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
          </button>
        </span>
      </div>
    </EmptyUserState>
  }

  return (
    <>
      <AlgoliaProvider>
        <div className="p-6">
          <h2 className="text-lg font-medium text-slate-900">Directorio</h2>
          <p className="mt-1 text-sm text-slate-600">
            Directorio de búsqueda de{" "}
            {test ? fakeUserList?.length : firebaseUsers?.length} usuarios
          </p>
          <CustomSearchBox />
        </div>
        {/* Directory list */}
        <nav
          className="bg-secondary max-h-[80vh] flex-1 overflow-y-auto"
          aria-label="Directory"
        >

          <EmptyQueryBoundary fallback={<TanStackVirtualizer users={test ? fakeUserList : firebaseUsers} />}>
            <CustomHits />
          </EmptyQueryBoundary>


        </nav>
      </AlgoliaProvider>
    </>
  );
};
