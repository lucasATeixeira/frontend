import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding-top: 60px;

  @media (max-width: 1280px) {
    flex-direction: column-reverse;
    align-items: center;
  }
`;

export const ResultadoContainer = styled.div`
  width: 600px;
  margin: 0 30px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 1px 4px 0 rgba(192, 208, 230, 0.8);
  padding: 10px 50px;
  color: rgb(118, 118, 118);

  @media (max-width: 1280px) {
    margin-bottom: 70px;
  }

  @media (max-width: 650px) {
    width: 450px;
  }

  @media (max-width: 500px) {
    width: 350px;
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
    margin: 40px 0;
  }
`;

export const DividasContainer = styled.div`
  flex: 1;
  max-width: 1000px;
  margin: 0 30px;

  h2 {
    margin-bottom: 50px;
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

  td {
    position: relative;
    border-top: 1px solid rgba(118, 118, 118, 0.2);
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
    }
  }
`;
