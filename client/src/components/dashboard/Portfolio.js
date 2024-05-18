import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deletePortfolio } from '../../actions/profile';
import formatDate from '../../utils/formatDate';

const Portfolio = ({ education, deletePortfolio }) => {
  const educations = education.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.title}</td>
      <td>{edu.link}</td>
      
      <td>
        <button
          onClick={() => deletePortfolio(edu._id)}
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">Portfolio</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  );
};

Portfolio.propTypes = {
  education: PropTypes.array.isRequired,
  deletePortfolio: PropTypes.func.isRequired
};

export default connect(null, { deletePortfolio })(Portfolio);
