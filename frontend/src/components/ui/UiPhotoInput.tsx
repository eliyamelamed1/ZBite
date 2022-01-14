import Image from 'next/image';
import React from 'react';
import styles from '../../styles/ui/UiPhotoInput.module.scss';
import uploadImageIcon from '../../assets/icons/upload_image.svg';

const UiPhotoInput = ({ onChangeImage, photoMainBlob }) => {
    return (
        <>
            <input
                id='photoMainBlob'
                type='file'
                placeholder='image'
                name='photoMainBlob'
                onChange={onChangeImage}
                className={styles.image_input}
                accept='image/*'
            />
            <label htmlFor='photoMainBlob' className={styles.image_label}>
                {photoMainBlob ? (
                    <img src={photoMainBlob} />
                ) : (
                    <div className={styles.image_label}>
                        {uploadImageIcon.src && (
                            <Image src={uploadImageIcon.src} width={100} height={100} alt='recipe photo' />
                        )}
                        <span className={styles.image_text}>Add recipe image</span>
                    </div>
                )}
            </label>
        </>
    );
};
export default UiPhotoInput;
