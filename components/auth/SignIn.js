import Image from "next/image";
import { SignIn } from "@clerk/nextjs";
import logo from "@/public/weg_logo.jpg";
//
export const SignInComponent = () => {
  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <Image
            className="mx-auto h-18 w-auto rounded-lg"
            src={logo}
            alt="weginsurance logo"
            priority
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Entrar a la cuenta
          </h2>
        </div>
        <div className="mt-8 space-y-6" action="#" method="POST">
          <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
        </div>
      </div>
    </div>
  );
};
