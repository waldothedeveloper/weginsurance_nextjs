import React from 'react'
import { useInstantSearch } from 'react-instantsearch-hooks-web';

type EmptyQueryBoundaryProps = { children: React.ReactNode; fallback: React.ReactNode | null }

export const EmptyQueryBoundary = ({ children, fallback }: EmptyQueryBoundaryProps) => {
  const { indexUiState, results } = useInstantSearch();

  if (!results.__isArtificial && results.nbHits === 0) {
    return <div className="flex justify-center px-6 py-5 text-sm text-slate-400">
      No se han encontrado resultados de esta busqueda. Revise la ortografia o intente con otro termino.
    </div>
  }

  if (!indexUiState.query) {
    return <>{fallback}</>
  }

  return <>{children}</>;
}
