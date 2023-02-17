import { Container } from "@/components/container";
import { CreateOrganization } from "@clerk/nextjs";

export default function CreateOrganizationPage() {
  return (
    <Container>
      <CreateOrganization />
    </Container>
  );
}
