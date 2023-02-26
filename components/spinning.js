export const Spinning = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div
        className="text-gray-300 inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      />
      <p className="ml-3 text-gray-400">Cargando usuarios...</p>
    </div>
  );
};
