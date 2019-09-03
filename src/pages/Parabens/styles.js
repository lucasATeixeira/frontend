import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background: #0075c4;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Card = styled.div`
  width: 550px;
  margin: 0 25px;
  background: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 3px solid #00dbff;
  padding: 25px 80px;
  font-size: 15px;

  .blue {
    color: #00dbff;
    font-weight: bold;
  }

  .footer {
    padding: 0;
    margin-top: 30px;
  }

  h1 {
    font-weight: bold;
    color: #00dbff;
    font-size: 33px;
    margin-bottom: 30px;
  }

  p {
    text-align: center;
  }
`;
