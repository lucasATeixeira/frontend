import styled from 'styled-components';

export const Footer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40px;
  background: ${({ red }) => (red ? '#FF87B2' : '#66E9FF')};
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;

  span {
    color: #fff;
    font-weight: bold;
    font-size: 20px;
  }

  span.left {
    margin-left: 20px;
  }

  span.right {
    margin-right: 20px;
  }
`;
