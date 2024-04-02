/* eslint-disable react/no-unescaped-entities */
import Anvil from "@anvilco/anvil";
import Link from "next/link";
import { NextPageButton } from "./nextPage";
import { PreviousPageButton } from "./prevPage";
import { RefreshBtn } from "./refreshBtn";
import { UserIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import locale_es from "dayjs/locale/es";
import { refreshSignedDocuments } from "./actions";

interface signedDocumentsParams {
  eid: string;
  name: string;
  completedAt: string;
  documentGroup: {
    files: [
      {
        name: string;
        type: string;
        filename: string;
        downloadURL: string;
      },
    ];
    downloadZipURL: string;
    signers: { name: string }[];
  };
}

dayjs.locale(locale_es);

export const metadata = {
  title: "Documents",
  description: "Documents Page",
};

const client = new Anvil({
  apiKey: process.env.ANVIL_PRODUCTION,
});

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {

  const page = typeof searchParams.page === "string" ? +searchParams.page : 1;
  const signedDocuments = await client.requestGraphQL({
    query: `
          query Organization (
            $organizationSlug: String!,
            $status: [String],
            $isArchived: Boolean,
            $limit: Int,
            $offset: Int,
         
          ) {
            organization (organizationSlug: $organizationSlug) {
              eid
              etchPackets (
                status: $status,
                isArchived: $isArchived,
                limit: $limit,
                offset: $offset,
                
              ) {
                items {
                  eid,
                  status
                  name
                  completedAt
                  documentGroup {
                  signers {
                    name
                  }
                    eid
                    files
                    downloadZipURL
                  }
                }
              }
            }
          }
        `,
    variables: {
      organizationSlug: "w-e-g-insurance-corp",
      status: ["completed"],
      limit: 25,
      offset: page,
    },
  });

  // const statusCode = signedDocuments.statusCode;
  // const httpErrors = signedDocuments.errors;
  // const graphqlErrors = signedDocuments.data?.errors;
  // const resultObject = signedDocuments.data?.data?.organization;
  // resultObject.etchPackets.items.map(
  //   (item: { documentGroup: { eid: string } }) => item
  // );

  // console.log(`Clients from the Anvil query`, JSON.stringify(signedDocuments.data?.data?.organization.etchPackets.items, null, 2))

  const totalItems = signedDocuments.data?.data?.organization.etchPackets.items.length;


  return (
    <div className="mx-auto w-full py-12 px-32 overflow-y-scroll">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Documentos
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Aquí encontrarás los documentos firmados por los clientes. <br />Puedes descargar los PDF en el botón de la derecha.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <div className="flex w-full justify-end space-x-3 items-center">
            <RefreshBtn fn={refreshSignedDocuments} />
            <PreviousPageButton page={page} />
            <NextPageButton page={page} items={totalItems} />
          </div>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">

            <table className="w-full overflow-scroll divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Nombre y Apellidos
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Firmado el
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 py-3.5 pl-3 pr-4 sm:pr-0"
                  >
                    <span className="sr-only">Descargar</span>
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 bg-white">
                {signedDocuments.data?.data?.organization.etchPackets.items
                  .length > 0 ? (
                  signedDocuments.data?.data?.organization.etchPackets.items.map(
                    (item: signedDocumentsParams) => (
                      <tr key={item.eid}>
                        <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                          <div className="flex items-center">
                            <div className="h-11 w-11 flex-shrink-0">
                              <UserIcon className="h-11 w-11 flex-none rounded-full text-gray-400 bg-gray-100 p-2" />
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">
                                {item.documentGroup.signers
                                  .map((signer) => signer.name)
                                  .join(", ")}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-400">
                          <div className="text-gray-400">
                            {dayjs(item.completedAt)
                              .locale("es")
                              .format("dddd, MMMM D, YYYY h:mm A")}
                          </div>
                        </td>

                        <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm sm:pr-0">
                          <Link
                            target="_blank"
                            rel="noopener noreferrer"
                            href={`/api/documents?url=${item.documentGroup.files[0].downloadURL}`}
                            className="text-gray-400 hover:text-blue-500"
                          >
                            Descargar<span className="sr-only">Descargar</span>
                          </Link>
                        </td>
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                      <p className="text-gray-400">
                        Ha llegado al fin de la lista
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </div>
  );
}
