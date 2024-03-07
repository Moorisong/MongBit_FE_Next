import styled from 'styled-components';

import { MEDIAQUERY } from '@/constants/constant';

const Div_mediaquery = styled.div`
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

export const Div_animation = styled.div`
  width: ${MEDIAQUERY.WIDTH_420};
`;

export function Wrap_mediaquery({ style = {}, children }) {
  return <Div_mediaquery style={style}>{children}</Div_mediaquery>;
}
