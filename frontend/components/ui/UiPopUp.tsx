import React, { ReactChildren } from 'react';

import Image from 'next/image';
import closeIcon from '../../styles/icons/x.svg';
import styles from '../../styles/ui/UiPopUp.module.scss';

interface DataTypes {
    onSubmit: () => void;
    children: ReactChildren;
    className: any;
}

const UiPopUp = ({ onSubmit, children, className = null, setDisplayForm }) => {
    return (
        <form className={`${styles.form} ${className}`} onSubmit={(e) => onSubmit(e)}>
            <i onClick={() => setDisplayForm(false)}>
                {closeIcon.src && <Image src={closeIcon.src} alt='logo icon' height={100} width={100} />}
            </i>
            {children}
        </form>
    );
};

export default UiPopUp;
