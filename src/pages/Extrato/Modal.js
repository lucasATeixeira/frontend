import React from 'react';
import PropTypes from 'prop-types';
import Content from './Content';

const Modal = ({ l }) => (
  <>
    <div className="modal fade" id="edit" tabIndex={-1}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="card card-signup card-plain">
            <div className="modal-header">
              <div className="card-header card-header-grafit text-center">
                <button type="button" className="close" data-dismiss="modal" aria-hidden>
                  <i className="material-icons">clear</i>
                </button>
                <h4 className="card-title">
                  <strong>Edição</strong>
                </h4>
                <br />
                <br />
              </div>
            </div>
            <Content l={l} />
          </div>
        </div>
      </div>
    </div>
  </>
);

Modal.propTypes = {
  l: PropTypes.shape().isRequired,
};

export default Modal;
