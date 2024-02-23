import styled from 'styled-components';

const Title = styled.p`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.3rem;
`;

const Content = styled.p`
  color: #8f8f8f;
  font-size: 0.9rem;
`;

export function TitleText({ text }) {
  return <Title>{text}</Title>;
}

export function ContentText({ text }) {
  return <Content>{text}</Content>;
}
