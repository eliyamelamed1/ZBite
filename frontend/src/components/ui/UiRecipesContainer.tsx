import React from 'react';
import styles from '../../styles/ui/UiRecipesContainer.module.scss';

const UiRecipesContainer = ({ children }) => {
    return <div className={styles.recipes_container}>{children}</div>;
};

export default UiRecipesContainer;
