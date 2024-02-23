import styled from 'styled-components';

const WhiteWrapElement = styled.div`
  display: flex;
  flex-direction: ${(props) => props.style.flexDirection};
  justify-content: ${(props) => props.style.justifyContent};
  align-items: ${(props) => props.style.alignItems};
  width: 420px;
  background-color: white;
  text-align: ${(props) => props.style.textAlign};

  @media (max-width: 375px) {
    width: 375px;
  }
`;

export function WhiteWrapWithFlex({ style, children }) {
  return <WhiteWrapElement style={style}>{children}</WhiteWrapElement>;
}
