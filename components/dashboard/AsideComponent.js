export const AsideComponent = ({ children }) => {
  return (
    <aside className="relative hidden w-96 flex-shrink-0 overflow-y-auto border-r border-slate-200 xl:order-first xl:flex xl:flex-col">
      {/* Secondary column (hidden on smaller screens) */}
      {children}
    </aside>
  );
};
