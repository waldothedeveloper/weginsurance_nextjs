import { BankInfo } from "./_components/bank-info";
import { Divider } from "./_components/divider";
import { InsuranceInfo } from "./_components/insurance-info";
import { Notes } from "./_components/notes";
import { PersonalInfo } from "./_components/personal-info";
import { WorkInfo } from "./_components/work-info";

export default function Directory() {
  return (
    <>
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
    </>
  );
}
