import React, { ReactChildren } from 'react';

import styles from '../../styles/ui/UiPopUp.module.scss';

interface DataTypes {
    onSubmit: () => void;
    children: ReactChildren;
    className: any;
}

const UiPopUp = ({ onSubmit, children, className = null }) => {
    return (
        <form className={`${styles.form} ${className}`} onSubmit={(e) => onSubmit(e)}>
            {children}
        </form>
    );
};

export default UiPopUp;
