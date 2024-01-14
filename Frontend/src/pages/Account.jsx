import Heading from "../ui/Heading";
import Row from "../ui/Row";
import UpdateAccount from "../features/account/updateAccount";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./../store/UserContext";

function Account() {
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) return null;

  return (
    <Row>
      <Heading as="h1">Update your account</Heading>
      <UpdateAccount />
    </Row>
  );
}

export default Account;
