import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPortfolio } from '../../actions/profile';

const AddPortfolio = ({ addPortfolio }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title:'',
    link:''
  });

  const { title,link } =
    formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <section className="container">
      <h1 className="large text-primary">Add Your Portfolio</h1>
      <p className="lead">
        <i className="fas fa-code-branch" /> Add your portfolio website
      </p>
      <small>* = required field</small>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          addPortfolio(formData).then(() => navigate('/dashboard'));
        }}
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="* Title"
            name="title"
            value={title}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* URL"
            name="link"
            value={link}
            onChange={onChange}
            required
          />
        </div>
       
       
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </section>
  );
};

AddPortfolio.propTypes = {
  addPortfolio: PropTypes.func.isRequired
};

export default connect(null, { addPortfolio })(AddPortfolio);
