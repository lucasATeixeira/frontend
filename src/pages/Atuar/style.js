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
    width: 1000px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    padding: 30px;

    table {
      width: 100%;
      margin-top: 20px;

      tr {
        border-top: 1px solid rgba(0, 0, 0, 0.1);
      }

      td {
        padding: 15px;

        &:first-child {
          width: 20%;
        }
      }

      td + td {
        text-align: center;
      }

      input {
        width: 100%;
        background: none;
        outline: none;
        border: none;

        ::placeholder {
          color: #9999;
        }
      }
    }

    button.btn {
      margin-top: 30px;
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
