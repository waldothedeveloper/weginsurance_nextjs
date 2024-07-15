import { BankInfo } from "./_components/bank-info";
import CreateUserHeader from "./_components/create-user-header";
import { Divider } from "./_components/divider";
import { InsuranceInfo } from "./_components/insurance-info";
import { LegalStatus } from "./_components/legal-status";
import Link from "next/link";
import { Notes } from "./_components/notes";
import { PersonalInfo } from "./_components/personal-info";
import { Stepper } from "./_components/stepper";
import { WorkInfo } from "./_components/work-info";

export default function CreateUser() {
  return (
    <>
      <CreateUserHeader />
      <div className="border-t border-gray-100 mt-6 flex flex-col justify-center items-start size-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 lg:py-12">
        <form>
          <PersonalInfo />
          <Divider />
          <LegalStatus />
          <Divider />
          <BankInfo />
          <Divider />
          <WorkInfo />
          <Divider />
          <InsuranceInfo />
          <Divider />
          <Notes />
          <Divider />
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Link href="/users" className="text-sm font-semibold leading-6 text-gray-900">
              Cancelar
            </Link>
            <button
              type="submit"
              className="inline-flex justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Guardar
            </button>
          </div>
          <Stepper />
        </form>
      </div>
    </>
  );
}
