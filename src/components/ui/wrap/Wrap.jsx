import styled from 'styled-components';

import { MEDIAQUERY } from '@/constants/constant';

export const Wrap_mediaquery = styled.div`
  display: flex;
  background-color: white;
  width: ${MEDIAQUERY.WIDTH_420};
  flex-direction: ${(props) => (props.flexDirection ? props.flexDirection : '')};
  justify-content: ${(props) => (props.justifyContent ? props.justifyContent : '')};
  align-items: ${(props) => (props.alignitems ? props.alignitems : '')};
  padding: ${(props) => (props.padding ? props.padding : '')};
  position: ${(props) => (props.position ? props.position : '')};
  text-align: ${(props) => (props.textAlign ? props.textAlign : '')};

  @media (max-width: ${MEDIAQUERY.WIDTH_375}) {
    width: ${MEDIAQUERY.WIDTH_375};
  }
`;

export const Div_animation = styled.div`
  width: ${MEDIAQUERY.WIDTH_420};
`;

export const DivElement = styled.div``;
