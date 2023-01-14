import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Button.scss';

const Button = ({ btnValue, onBtnClick, onBtnSubmit, isDisabled, isSecondary, isOutline, isAnimate, customClass }) => {
    
    /** Button is of primary solid style by default */
    const classes = classNames ({
        "button": true,
        "button--secondary": isSecondary,
        "button--outline": isOutline,
        "button--slide-in-animation": isAnimate,
        "button--disabled": isDisabled,
    });

    return (
        <button
            className={`${classes} ${customClass}`}
            onClick={onBtnClick}
            onSubmit={onBtnSubmit}
            disabled={isDisabled}
        >
            {btnValue}
        </button>
    )
};

Button.propTypes = {
    /* Button label string */
    btnValue: PropTypes.string,

    /* Prop for on click function */
    onBtnClick: PropTypes.func,

    /* Prop for submit function */
    onBtnSubmit: PropTypes.func,

    /* Flag for disabled button */
    isDisabled: PropTypes.bool,
  
    /* Flag for button with secondary colour style */
    isSecondary: PropTypes.bool,
  
    /* Flag for outline button style */
    isOutline: PropTypes.bool,
  
    /* Flag for button with slide-in animation */
    isAnimate: PropTypes.bool,

    /* Custom button class */
    customClass: PropTypes.string,
};

Button.defaultProps = {
    btnValue: "Get Sippin'",
    onBtnClick: () => {},
    onBtnSubmit: () => {},
    isDisabled: false,
    isSecondary: false,
    isOutline: false,
    isAnimate: false,
    customClass: "",
};

export default Button;