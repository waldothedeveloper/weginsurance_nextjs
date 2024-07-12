import { BankInfo } from "./_components/bank-info";
import { Divider } from "./_components/divider";
import { InsuranceInfo } from "./_components/insurance-info";
import { Notes } from "./_components/notes";
import { PersonalInfo } from "./_components/personal-info";
import { WorkInfo } from "./_components/work-info";

export default function CreateUser() {
  return (
    <div className="flex flex-col justify-center items-start size-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 lg:py-12">
      <form>
        <PersonalInfo />
        <Divider />
        <BankInfo />
        <Divider />
        <WorkInfo />
        <Divider />
        <InsuranceInfo />
        <Divider />
        <Notes />
      </form>
    </div>
  );
}
