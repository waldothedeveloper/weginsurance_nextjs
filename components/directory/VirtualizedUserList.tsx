import React, { useEffect } from "react";
import { selectedUserAtom, uploadedFilesAtom } from "@/lib/state/atoms";

import { CustomHits } from "@/components/algolia/CustomHits"
import { CustomSearchBox } from "@/components/algolia/CustomSearchBox"
import { EmptyQueryBoundary } from "@/components/algolia/EmptyQueryBoundary"
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
export const VirtualizedUserList = ({ getMessages }: { getMessages: (userId: string) => Promise<void> }) => {
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
      <div className="p-6">
        <h2 className="text-lg font-medium text-slate-900">Directorio</h2>
        <p className="mt-1 text-sm text-slate-600">
          Directorio de búsqueda de{" "}
          {test ? fakeUserList?.length : firebaseUsers.length} usuarios
        </p>
        <CustomSearchBox />
      </div>
      {/* Directory list */}
      <nav
        className="bg-secondary max-h-[80vh] flex-1 overflow-y-auto"
        aria-label="Directory"
      >

        <EmptyQueryBoundary fallback={<TanStackVirtualizer users={test ? fakeUserList : firebaseUsers} getMessages={getMessages} />}>
          <CustomHits getMessages={getMessages} />
        </EmptyQueryBoundary>


      </nav>
    </>
  );
};
