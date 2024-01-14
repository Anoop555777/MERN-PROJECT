import styled from "styled-components";
import { Link } from "react-router-dom";
const StyledUserImage = styled.div`
  object-fit: cover;
`;

const Img = styled.img`
  height: 9.6rem;
  border-radius: 50%;
  transition: all 0.1s ease-in-out;
  box-shadow: var(--shadow-md);
`;

const UserImage = ({ src, alt }) => {
  return (
    <StyledUserImage>
      <Link to="/">
        <Img src={`data/img/users/${src}`} alt={alt} />
      </Link>
    </StyledUserImage>
  );
};

export default UserImage;
