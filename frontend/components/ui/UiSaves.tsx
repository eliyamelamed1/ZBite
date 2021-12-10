import Image from 'next/image';
import SavedIcon from '../../styles/icons/saved.svg';
import styles from '../../styles/ui/UiSaves.module.scss';

const UiSaves: React.FC<{ savesCount: number }> = ({ savesCount }) => {
    return (
        <section className={styles.saves_count_and_icon}>
            <div className={styles.saves_count}>
                <span data-testid='savesCount'>{savesCount}</span>
            </div>
            <div className={styles.saves_icon}>
                <i>{SavedIcon.src && <Image src={SavedIcon.src} alt='saved icon' height={100} width={100} />}</i>
            </div>
        </section>
    );
};
export default UiSaves;
