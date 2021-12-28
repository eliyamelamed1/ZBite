import React from 'react';
import styles from '../../styles/ui/UiButton.module.scss';

const UiButton: React.FC<{ children: string; reverse: boolean }> = ({ children, reverse }) => {
    const button = (reverse) => {
        if (reverse)
            return (
                <button className={styles.buttonContainerReversed}>
                    <span className={styles.buttonReversed}>{children}</span>
                </button>
            );
        else {
            return (
                <button className={styles.buttonContainer}>
                    <span className={styles.button}>{children}</span>
                </button>
            );
        }
    };

    return <>{button(reverse)}</>;
};

export default UiButton;
