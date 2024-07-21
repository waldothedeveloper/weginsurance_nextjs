import { SignIn } from "@clerk/nextjs";

export const SignInComponent = () => {
  return (
    <div className="flex h-screen min-h-full flex-1 flex-col items-center justify-center overflow-hidden bg-slate-200 px-6 py-12 lg:px-8">
      <SignIn
        appearance={{
          elements: {
            logoImage: "rounded-full size-12",
            footer: "hidden",
          },
        }}
        path="/sign-in"
      />
    </div>
  );
};
