import { BackToDashboard } from "@/components/BackToDashboard";

export const Container = ({ children }) => {
  return (
    <div className="grid place-items-center">
      <BackToDashboard />
      {children}
    </div>
  );
};
