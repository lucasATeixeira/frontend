import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
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
`;

export const ResultadoContainer = styled.div`
  width: 600px;
  max-height: 600px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 1px 4px 0 rgba(192, 208, 230, 0.8);
  padding: 10px 50px;
  margin-left: 100px;
  color: rgb(118, 118, 118);

  @media (max-width: 1450px) {
    margin-top: 50px;
    margin-bottom: 70px;
  }

  @media (max-width: 650px) {
    width: 450px;
  }

  @media (max-width: 500px) {
    width: 350px;
  }

  div.grafico {
    margin-top: 50px;
  }

  div.pmt {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    font-size: 15px;

    span {
      margin-top: 15px;
      color: red;
      font-size: 40px;
      font-weight: normal;
    }
  }

  div.tempo {
    display: flex;
    flex-direction: column;
    margin: 40px 0;

    span.result-tempo {
      margin-top: 15px;
      font-size: 30px;
      font-weight: normal;
    }
  }

  button {
    margin-bottom: 20px;
  }
`;

export const DividasContainer = styled.div`
  flex: 1;
  max-width: 1000px;

  h3 {
    margin-top: 80px;
    margin-bottom: 30px;
  }

  table {
    width: 100%;
    margin-bottom: 30px;
  }

  th {
    text-align: left;
    font-size: 20px;
    font-weight: normal;
    color: #767676;
    padding-bottom: 40px;
  }

  tbody tr + tr {
    border-top: 1px solid rgba(118, 118, 118, 0.2);
  }

  td {
    position: relative;
    padding: 20px 0;
    font-weight: bold;
  }

  td button {
    outline: none;
    border: none;
    background: none;
    cursor: pointer;
    color: red;
    position: absolute;
    right: 0;
    top: 30%;

    i {
      font-size: 20px;
    }
  }

  tr.inputs {
    td {
      padding-right: 40px;
      font-weight: bold;
      font-size: 15.5px;
    }
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
