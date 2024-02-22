import styled from 'styled-components';

const PlainButton = styled.button`
  width: ${(props) => props.style.width};
  height: ${(props) => props.style.height};
  border-style: none;
  background: none;
  background-image: url('${(props) => props.style.imgUrl}');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`;

export default function Button({ style }) {
  return <PlainButton style={style} />;
}
