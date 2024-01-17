import styled, { css } from "styled-components";

const StyledCabinHeader = styled.header`
  height: 90vh;
  background-image: linear-gradient(
      to right bottom,
      var(--color-brand-img-gradient1),
      var(--color-brand-img-gradient2)
    ),
    url(${(props) => props.img});
  background-size: cover;
  background-position: center;
  clip-path: polygon(0 0, 100% 0, 100% 75dvh, 0 100%);
  object-fit: cover;
  position: relative;
`;

const Heading = styled.h1`
  font-size: 3.8rem;
  font-weight: 300;
  text-transform: uppercase;
  color: var(--color-grey-50);
  font-family: "Lato";

  display: flex;
  flex-direction: column;

  & span {
    padding: 1.2rem 1.6rem;
    background-image: linear-gradient(
      to right bottom,
      var(--color-brand-gradient1),
      var(--color-brand-gradient2)
    );

    &:last-child {
      transform: translateX(3rem);
    }
  }

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const CabinHeader = ({ cabin }) => {
  const { imageCover, name } = cabin;
  const img = "../" + imageCover;
  const [firstName, lastName = ""] = name.split(" ");
  return (
    <StyledCabinHeader img={img}>
      <Heading>
        <span>{firstName}</span>
        <span>{lastName}</span>
      </Heading>
    </StyledCabinHeader>
  );
};

export default CabinHeader;
