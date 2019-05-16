import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Title = ({ title, pencil }) => {
  const [editTitle, setEditTitle] = useState(false);
  const [valueEditTitle, setValueEditTitle] = useState(title);

  return (
    <>
      {editTitle && (
        <>
          <form>
            <input
              type="text"
              value={valueEditTitle}
              onChange={e => setValueEditTitle(e.target.value)}
              style={{ width: '20%' }}
              className="form-control"
            />
            <br />
          </form>
        </>
      )}

      {!editTitle && (
        <>
          <h4 className="card-title">
            <b>
              {title}
              {' '}
            </b>
            {pencil && (
              <button
                type="button"
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                onClick={() => setEditTitle(true)}
              >
                <i className="fa fa-pencil small" />
              </button>
            )}
          </h4>
          <br />
        </>
      )}
    </>
  );
};

Title.propTypes = {
  title: PropTypes.string,
  pencil: PropTypes.bool,
};

Title.defaultProps = {
  title: 'Parcelados',
  pencil: true,
};

export default Title;
