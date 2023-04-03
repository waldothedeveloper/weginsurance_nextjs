import Image from "next/image";
import { SignIn } from "@clerk/nextjs";
import office2 from "@/public/office_2.avif";

export const SignInComponent = () => {
  return (
    <div className="grid overflow-hidden">
      <div aria-hidden="true" className="relative">
        <Image
          src={office2}
          alt="office white walls and green plants"
          priority
          placeholder="blur"
          className="h-96 w-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-white" />
      </div>

      <div className="relative mx-auto -mt-24 max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
          <SignIn
            appearance={{
              elements: {
                logoImage: "rounded-full h-20",
                footer: "hidden",
                formButtonPrimary: "bg-sky-700 hover:bg-sky-500 py-4",
              },
            }}
            path="/sign-in"
            routing="path"
            signUpUrl="/sign-up"
          />
        </div>
      </div>
    </div>
  );
};
