import styled from 'styled-components';

const Text = styled.p``;

export function TextElement({ text, style }) {
  return <Text style={style}>{text}</Text>;
}
