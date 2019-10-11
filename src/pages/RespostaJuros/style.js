import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  font-weight: 400;
  padding: calc(60px + 80px) 240px 0 240px;

  @media (max-width: 1750px) {
    padding: calc(60px + 80px) 190px 0 190px;
  }

  @media (max-width: 1650px) {
    padding: calc(60px + 80px) 130px 0 130px;
  }

  @media (max-width: 1550px) {
    padding: calc(60px + 80px) 80px 0 80px;
  }

  @media (max-width: 600px) {
    padding: calc(60px + 80px) 35px 0 35px;
  }

  div.cards {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: flex-start;

    @media (max-width: 1450px) {
      justify-content: space-between;
      flex-direction: column;
      align-items: center;
    }
  }

  div.resolution {
    p {
      font-size: 18px;
      line-height: 1.5;
      color: rgb(118, 118, 118);
      max-width: 950px;
    }
  }

  a {
    display: flex;
    align-self: center;
    justify-content: center;
    align-items: center;
    width: 400px;
    height: 50px;
    margin: 100px 0;
    background: #00dbff;
    color: #fff;
    font-weight: bold;
    font-size: 20px;
    border-radius: 5px;
  }
`;

export const UpperContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  width: 100%;
  background: #fff;
  height: 80px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 2px;
  z-index: 1000;

  span {
    font-size: 18px;
    font-weight: bold;
  }

  img {
    width: 200px;
  }
`;

export const CardContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  max-width: 450px;
  height: 100%;
  background: #fff;
  border-radius: 7px;
  box-shadow: 0 1px 4px 0 rgba(192, 208, 230, 0.8);
  padding: 35px;
  margin-right: 50px;

  @media (max-width: 1450px) {
    margin: 0;
    margin-bottom: 50px;
  }

  h2 {
    font-weight: bold;
    color: #777;
    margin: 0;
    text-align: center;
    line-height: 40px;
  }

  table {
    width: 60%;
    margin: 40px 0;
    align-self: center;

    td {
      color: #bdbdbd;
      font-weight: bold;
      padding-top: 20px;
    }

    td + td {
      text-align: right;
    }

    td.red {
      color: #ff1468;
    }

    td.blue {
      color: #00dbff;
    }
  }

  span {
    margin: 50px 0;
    width: 70%;
    align-self: center;
    font-weight: bold;
    color: #bdbdbd;
    text-align: center;
    font-size: 18px;

    span.bold {
      color: #777;
    }
  }

  footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    color: #fff;
    background: grey;
    border-bottom-right-radius: 7px;
    border-bottom-left-radius: 7px;
    font-size: 25px;
  }

  footer.red {
    background: #ff1468;
  }

  footer.blue {
    background: #00dbff;
  }
`;
