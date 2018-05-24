import {withRouter} from 'react-router-dom';
import * as css from './style.scss';
import React from 'react';
import category from '../../assets/category.svg'
import location from '../../assets/location.svg'

import LinkButton from "../../components/LinkButton";
import Icons from "../../components/Icons/Icons";


const Footer = (props) => {
    return (
        <div className={css["footer-comp"]}>
            <div className={css["pages-links"]}>
                <div className={css["grid-container"]}>
                    <div className={css["grid-1"]}>
                        <div className={css["fm-circle-out"]}>
                            <LinkButton to="/categories" outline color="info" onClick={props.activate}>
                                <Icons className={css["svg-icon"]} icon={category}/>
                            </LinkButton>
                        </div>
                    </div>
                    <div className={css["grid-1"]}>
                        <div className={css["fm-circle-out"]}>
                            <LinkButton to="/locations" outline color="info" onClick={props.activate}>
                                <Icons  className={css["svg-icon"]} icon={location}/>
                            </LinkButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default withRouter(Footer);
