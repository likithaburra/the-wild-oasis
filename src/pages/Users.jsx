import Heading from "../ui/Heading";
import SignUpform from "../features/authentication/SignupForm";

function NewUsers() {
  return (
    <>
      <Heading as="h1">Create a new user</Heading>
      <SignUpform />
    </>
  );
}

export default NewUsers;
