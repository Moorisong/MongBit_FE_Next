import styled from 'styled-components';

export const TitleText = styled.p`
  color: ${(props) => (props.color ? props.color : '')};
  font-size: ${(props) => (props.fontSize ? props.fontSize : '')};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : '')};
  padding-top: ${(props) => (props.paddingtop ? props.paddingtop : '')};
  margin: ${(props) => (props.margin ? props.margin : '')};
`;

export const Text = styled.p`
color: ${(props) => (props.color ? props.color : '')};
width: ${(props) => (props.width ? props.width : '')};
padding-left: ${(props) => (props.paddingleft ? props.paddingleft : '')};
font-size: ${(props) => (props.fontSize ? props.fontSize : '')};
white-space: ${(props) => (props.whitespace ? props.whitespace : '')};
overflow: ${(props) => (props.overflow ? props.overflow : '')};
text-overflow: ${(props) => (props.textoverflow ? props.textoverflow : '')};
cursor: ${(props) => (props.cursor ? props.cursor : '')};
display: ${(props) => (props.display ? props.display : '')};
margin-left: ${(props) => (props.marginleft ? props.marginleft : '')};
width: ${(props) => (props.width ? props.width : '')};
width: ${(props) => (props.width ? props.width : '')};
width: ${(props) => (props.width ? props.width : '')};
color
`;

export const Wrap = styled.div`
  width: ${(props) => (props.width ? props.width : '')};
  height: ${(props) => (props.height ? props.height : '')};
  margin: ${(props) => (props.margin ? props.margin : '')};
  overflow: ${(props) => (props.overflow ? props.overflow : '')};
  display: ${(props) => (props.display ? props.display : '')};
  flex-wrap: ${(props) => (props.flexwrap ? props.flexwrap : '')};
  position: ${(props) => (props.position ? props.position : '')};
  padding-top: ${(props) => (props.paddingtop ? props.paddingtop : '')};
  flex-direction: ${(props) => (props.flexDirection ? props.flexDirection : '')};
  justify-content: ${(props) => (props.justifycontent ? props.justifycontent : '')};
  align-items: ${(props) => (props.alignitems ? props.alignitems : '')};
  background-color: ${(props) => (props.backgroundcolor ? props.backgroundcolor : '')};
  border-radius: ${(props) => (props.borderradius ? props.borderradius : '')};
`;
