/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import CurrencyInput from 'react-currency-input';

const Input = ({
  label, currency, onChange, value,
}) => (
  <>
    <div className="row">
      <div className="col-md-12">
        <div className="row">
          <label className="col-md-3 col-form-label">
            <strong>{label}</strong>
          </label>
          <div className="col-md-8">
            <div className="form-group bmd-form-group">
              {currency ? (
                <CurrencyInput
                  value={value}
                  className="form-control"
                  decimalSeparator=","
                  thousandSeparator="."
                  precision="2"
                  prefix="R$"
                  onChangeEvent={onChange}
                  // onChangeEvent={(e, mv, fv) => setValor(fv)}
                />
              ) : (
                <input className="form-control" type="text" />
              )}
              <span className="bmd-help" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

Input.propTypes = {
  label: PropTypes.string.isRequired,
  currency: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
};

Input.defaultProps = {
  currency: false,
};

export default Input;
