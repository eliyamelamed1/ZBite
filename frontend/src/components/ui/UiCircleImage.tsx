import Image from 'next/image';
import React from 'react';
import styles from '../../styles/ui/UiCircleImage.module.scss';

const UiCircleImage = ({ src }) => {
    return <Image className={styles.circle_image} src={src} height={100} width={100} alt='circle image' />;
};

export default UiCircleImage;
