import React from 'react';
import styles from '../../styles/ui/UiPopUp.module.scss';

const UiPopUp = ({ onSubmit, children, className }) => {
    return (
        <form className={`${styles.form} ${styles.className} `} onSubmit={(e) => onSubmit(e)}>
            {children}
        </form>
    );
};

export default UiPopUp;
