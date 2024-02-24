import styled from 'styled-components';

import { MEDIAQUERY } from '@/constants/constant';

const WhiteWrapElement = styled.div`
  display: flex;
  flex-direction: ${(props) => props.style.flexDirection};
  justify-content: ${(props) => props.style.justifyContent};
  align-items: ${(props) => props.style.alignItems};
  width: ${MEDIAQUERY.WIDTH_420};
  background-color: white;
  text-align: ${(props) => props.style.textAlign};

  @media (max-width: ${MEDIAQUERY.WIDTH_375}) {
    width: ${MEDIAQUERY.WIDTH_375};
  }
`;

export function WhiteWrapWithFlex({ style, children }) {
  return <WhiteWrapElement style={style}>{children}</WhiteWrapElement>;
}
