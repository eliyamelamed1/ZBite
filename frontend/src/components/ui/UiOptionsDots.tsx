import React, { useState } from 'react';

import Image from 'next/image';
import imageLoader from '../../utils/imageLoader';
import lyingOptionsDots from '../../assets/icons/lyingOptionsDots.svg';
import standingOptionsDots from '../../assets/icons/optionsDots.svg';
import styles from '../../styles/ui/UiOptionsDots.module.scss';

const UiOptionsDots = ({ children, lying = true }) => {
    const icon = () => {
        if (lying) return lyingOptionsDots;
        return standingOptionsDots;
    };
    const [showOptions, setShowOptions] = useState(false);

    return (
        <section className={styles.optionsDots}>
            <button
                data-testid='optionsDots'
                className={styles.button}
                type='button'
                onClick={() => setShowOptions(!showOptions)}
            >
                {icon().src && (
                    <Image loader={imageLoader} src={icon().src} width={100} height={100} alt='options dots' />
                )}
            </button>
            {showOptions && <div className={styles.options}>{children}</div>}
        </section>
    );
};

export default UiOptionsDots;
