import styled from "styled-components";
import { Link } from "react-router-dom";
const StyledLogo = styled.div`
  text-align: center;
  object-fit: cover;
`;

const Img = styled.img`
  height: 9.6rem;
  border-radius: 50%;
  transition: all 0.1s ease-in-out;
  box-shadow: var(--shadow-md);

  &:hover {
    outline: 4px solid var(--color-brand-600);
  }
`;

const Logo = () => {
  const src = "../data/img/logo.png";
  return (
    <StyledLogo>
      <Link to="/">
        <Img src={src} alt="logo" />
      </Link>
    </StyledLogo>
  );
};

export default Logo;
