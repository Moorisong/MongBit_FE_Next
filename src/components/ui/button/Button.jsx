import styled from 'styled-components';

const HeaderBtn = styled.button`
  width: ${(props) => props.style.width};
  height: ${(props) => props.style.height};
  border-style: none;
  background: none;
  background-image: url('${(props) => props.style.imgUrl}');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  margin: 0 1rem;
`;

// export

export function HeaderButton({ style }) {
  return <HeaderBtn style={style} />;
}

export const YellowButton = styled.button`
  background-color: #ffc52f;
  transition: background-color 0.3s ease-in-out;
  color: white;
`;
