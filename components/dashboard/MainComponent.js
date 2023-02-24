export const MainComponent = ({ children }) => {
  return (
    <main className="relative z-0 flex-1 overflow-y-auto focus:outline-none xl:order-last">
      {children}
    </main>
  );
};
