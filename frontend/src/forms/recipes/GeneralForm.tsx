import Image from 'next/image';
import React from 'react';
import styles from '../../styles/pages/recipeCreate.module.scss';
import uploadImageIcon from '../../styles/icons/upload_image.svg';

const GeneralForm = ({ onChangeImage, photoMainBlob, onChangeText, title, description, cookTime, serving }) => (
    <section className={styles.general_section}>
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
        <input
            type='text'
            placeholder='Title'
            name='title'
            value={title}
            onChange={onChangeText}
            className={styles.title_input}
            required
        />
        <input
            type='text'
            placeholder='Description'
            name='description'
            value={description}
            onChange={onChangeText}
            className={styles.description_input}
        />
        <div className={styles.cook_time_container}>
            <span className={styles.cook_time_text}>Cook time</span>
            <input
                type='text'
                placeholder='1hr 30min'
                name='cookTime'
                value={cookTime}
                onChange={onChangeText}
                className={styles.cook_time_input}
                required
            />
        </div>
        <div className={styles.serving_container}>
            <span className={styles.serving_text}>Serves</span>
            <input
                type='text'
                placeholder='2 people'
                name='serving'
                value={serving}
                onChange={onChangeText}
                className={styles.serving_input}
                required
            />
        </div>
    </section>
);

export default GeneralForm;
