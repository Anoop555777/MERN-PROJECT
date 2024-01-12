import styled from "styled-components";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 600;
  font-size: 1.6rem;
  color: var(--color-grey-600);
`;

const Avatar = styled.img`
  display: block;
  width: 4rem;
  height: 4rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

const UserAvatar = () => {
  return (
    <StyledUserAvatar>
      <Avatar src="img/default-user.jpg"></Avatar>
      <span>Anoop</span>
    </StyledUserAvatar>
  );
};

export default UserAvatar;
