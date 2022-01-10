import React, { useState } from 'react';

import Image from 'next/image';
import imageLoader from '../../../utils/imageLoader';
import lyingOptionsDots from '../../../assets/icons/lyingOptionsDots.svg';
import styles from '../../../styles/ui/UiOptionsDots.module.scss';

// import standingOptionsDots from '../../assets/icons/optionsDots.svg';

const UiOptionsDots = ({ children, lying = true, formSide = 'left' }) => {
    const [showOptions, setShowOptions] = useState(false);
    console.log(123);

    return (
        <section className={styles.optionsDots}>
            <button
                data-testid='optionsDots'
                className={styles.button}
                type='button'
                onClick={() => setShowOptions(!showOptions)}
            >
                {lyingOptionsDots.src && (
                    <Image
                        loader={imageLoader}
                        src={lyingOptionsDots.src}
                        width={100}
                        height={100}
                        alt='options dots'
                    />
                )}
            </button>
            {showOptions && <section className={styles.optionsForm}>{children}</section>}
        </section>
    );
};

export default UiOptionsDots;
