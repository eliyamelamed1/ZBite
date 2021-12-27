import React from 'react';
import styles from '../../styles/ui/UiButton.module.scss';

const UiButton: React.FC<{ children: string; reverse: boolean }> = ({ children, reverse }) => {
    const button = (reverse) => {
        if (reverse)
            return (
                <div className={styles.buttonContainerReversed}>
                    <button className={styles.buttonReversed}>{children}</button>
                </div>
            );
        else {
            return (
                <div className={styles.buttonContainer}>
                    <button className={styles.button}>{children}</button>
                </div>
            );
        }
    };

    return <>{button(reverse)}</>;
};

export default UiButton;
