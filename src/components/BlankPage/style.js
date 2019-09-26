import styled from 'styled-components';

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

  div.card-made {
    background: #fff;
    border-radius: 10px;
    width: 700px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    padding: 30px;

    input {
      margin: 30px 0 40px 0;
    }

    div.times {
      display: flex;
      flex-wrap: wrap;
      width: 80%;
      justify-content: center;
      align-items: center;
      margin: 15px 0 30px 0;

      button.time {
        background: #fff;
        border: 1px solid #d2d2d2;
        color: #999;
        padding: 15px 30px;
        margin: 10px;
        border-radius: 5px;
        outline: none;
        cursor: pointer;
      }

      button.active {
        background: #d2d2d2;
        color: #fff;
        font-weight: bold;
      }
    }

    button.fechar {
      position: absolute;
      top: 0;
      right: 0;
      border: none;
      outline: none;
      background: none;
      padding: 10px;
      color: #999;
      cursor: pointer;
    }
  }
`;
