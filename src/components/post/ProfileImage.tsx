import styled from "styled-components";

export default function ProfileImage({ imageName }: { imageName: string }) {
  return (
    <StyledProfileImage
      src={`${process.env.REACT_APP_IMAGE_URL}/${imageName}`}
      alt={imageName}
    />
  );
}

const StyledProfileImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 4px;
`;
