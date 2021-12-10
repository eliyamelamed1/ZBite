import Image from 'next/image';
import SavedIcon from '../../styles/icons/saved.svg';
import styles from '../../styles/ui/UiSaves.module.scss';

const UiSaves = ({ savesCount }) => {
    return (
        <ul className={styles.saves_count_and_icon}>
            <li className={styles.saves_count}>
                <span>{savesCount}</span>
            </li>
            <li className={styles.saves_icon}>
                <i>{SavedIcon.src && <Image src={SavedIcon.src} alt='saved icon' height={100} width={100} />}</i>
            </li>
        </ul>
    );
};
export default UiSaves;
