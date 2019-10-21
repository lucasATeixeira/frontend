import styled from 'styled-components';

export const ContainerAtuar = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;

  div.appointment {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: #00b4db;
    color: #fff;
    font-weight: bold;
    padding: 13px;
    border-radius: 10px;
    width: 200px;
    margin-bottom: 25px;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.3);

    cursor: pointer;

    &:hover {
      background: rgb(29, 233, 182);
    }

    h2 {
      font-size: 25px;
      max-width: 30ch;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    i {
      margin-bottom: 10px;
    }
  }
`;

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
