import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px 70px;

  span.red {
    color: red;
    font-weight: bold;
  }

  span.mmd {
    font-size: 36px;
    margin-bottom: 40px;
  }

  p {
    text-indent: 5%;
    font-size: 16px;
    line-height: 2;
  }

  span.information {
    text-transform: uppercase;
    font-weight: bold;
  }
`;
