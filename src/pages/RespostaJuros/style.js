import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  font-weight: 400;
  padding: calc(60px + 80px) 240px 0 240px;

  div.resolution {
    p {
      font-size: 18px;
      line-height: 1.5;
      color: rgb(118, 118, 118);
      max-width: 950px;
    }
  }

  @media (max-width: 1750px) {
    padding: calc(60px + 80px) 190px 0 190px;
  }

  @media (max-width: 1650px) {
    padding: calc(60px + 80px) 130px 0 130px;
  }

  @media (max-width: 1550px) {
    padding: calc(60px + 80px) 80px 0 80px;
  }

  @media (max-width: 1450px) {
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: 600px) {
    padding: calc(60px + 80px) 35px 0 35px;
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
  max-width: 500px;
  background: #fff;
  border-radius: 7px;
  box-shadow: 0 1px 4px 0 rgba(192, 208, 230, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.3);
  padding: 35px;

  h2 {
    font-weight: bold;
    color: #777;
    margin: 0;
  }

  table {
    width: 50%;
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
      color: red;
    }

    td.blue {
      color: blue;
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

    footer.red {
      background: red;
    }

    footer.blue {
      background: blue;
    }
  }
`;
