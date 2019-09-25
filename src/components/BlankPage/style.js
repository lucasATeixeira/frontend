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
    }

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
        background: #eee;
        color: #999;
        padding: 15px 30px;
        margin: 10px;
        border-radius: 10px;
        border: none;
        outline: none;
        cursor: pointer;
        box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.3);
      }

      button.active {
        background: #1DE9B6;
        color: #FFF;
        transform: scale(1.15);
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
