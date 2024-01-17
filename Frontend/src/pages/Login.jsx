import styled from "styled-components";

import Heading from "../ui/Heading";
import LoginForm from "../features/authentication/LoginForm";
import { HiXMark } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
const LoginBackground = styled.main`
  min-height: 100dvh;
  width: 100%;
  position: relative;
  background: url("./../data/img/cabin/cabin-photo1.jpg");
  background-size: cover;
  background-position: bottom;
  opacity: 0.9;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-300);
  }
`;

const LoginLayout = styled.div`
  padding: 2.4rem 4.8rem;
  width: 40%;
  min-height: 70dvh;
  background: transparent;
  backdrop-filter: blur(200px);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--color-grey-300);
  border: 2px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 0 30px rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3.2rem;
`;

const Login = () => {
  const navigate = useNavigate();
  return (
    <LoginBackground>
      <LoginLayout>
        <Button onClick={() => navigate("/dashboard")}>
          <HiXMark />
        </Button>

        <Heading as="h4">Login to your account</Heading>
        <LoginForm />
      </LoginLayout>
    </LoginBackground>
  );
};

export default Login;
