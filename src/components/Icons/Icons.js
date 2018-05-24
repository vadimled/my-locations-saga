import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ className, icon }) => (
    <img src={icon} className={className} alt="icon" />
);

Icon.propTypes = {
    className: PropTypes.string
};

export default Icon;
