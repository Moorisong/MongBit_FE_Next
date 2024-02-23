import styled from 'styled-components';

const Square = styled.img`
  width: 370px;
  height: 240px;
  border-radius: 1rem;
  margin: 0.5rem 0;

  @media (max-width: 375px) {
    width: 345px;
  }
`;

export function TestVersionBig({ imageUrl }) {
  return <Square src={imageUrl} />;
}
