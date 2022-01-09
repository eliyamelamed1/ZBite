import React from 'react';
import styles from '../../../styles/ui/UiOptionsDots.module.scss';

const UiOptionsButton = ({ children }) => {
    return <button className={styles.formButton}>{children}</button>;
};

export default UiOptionsButton;
