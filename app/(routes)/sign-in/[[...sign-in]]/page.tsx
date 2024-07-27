import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <SignIn
          signUpUrl="/sign-up-not-allowed"
          appearance={{
            elements: {
              footerAction: "hidden",
            },
          }}
        />
      </div>
    </div>
  );
}
