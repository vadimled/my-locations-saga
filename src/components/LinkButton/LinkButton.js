import React from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
import {Button} from "reactstrap";

const LinkButton = (props) => {
    const {
        match, location, history, staticContext, to, onClick, ...rest
    } = props;

    return (
        <Button {...rest} onClick={(event) => {
            onClick && onClick(event);
            history.push(to)
        }}/>
    )
};

LinkButton.propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
};

export default withRouter(LinkButton)