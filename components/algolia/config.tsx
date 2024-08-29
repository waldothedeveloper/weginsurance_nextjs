import { ReactNode, useEffect } from "react";

import { InstantSearch } from "react-instantsearch";
import algoliasearch from "algoliasearch/lite";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || '',
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY || ''
);

export const AlgoliaProvider = ({
  children,
}: { children: ReactNode }) => {

  useEffect(() => {
    searchClient.clearCache()
  }, [])
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={process.env.NODE_ENV === "production" ? "new_production_algolia_index" : "new_development_algolia_index"}

    >{children}</InstantSearch>
  );
};
