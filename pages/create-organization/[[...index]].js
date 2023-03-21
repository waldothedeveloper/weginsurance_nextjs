import { Container } from "@/components/Container";
import { CreateOrganization } from "@clerk/nextjs";

export default function CreateOrganizationPage() {
  return (
    <Container>
      <CreateOrganization />
    </Container>
  );
}
