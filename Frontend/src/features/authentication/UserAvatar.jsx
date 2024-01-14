import styled from "styled-components";
import { useUser } from "../../store/UserContext";

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
  const { user } = useUser();
  if (!user?.name) return null;
  return (
    <StyledUserAvatar>
      <Avatar src={`data/img/users/${user.photo}`}></Avatar>
      <span>{user.name}</span>
    </StyledUserAvatar>
  );
};

export default UserAvatar;
