import Image from 'next/image';
import SavedIcon from '../../assets/icons/saved.svg';
import styles from '../../styles/ui/UiSaves.module.scss';

const UiSaves: React.FC<{ savesCount: number; textToRight?: boolean }> = ({ savesCount, textToRight }) => {
    if (textToRight)
        return (
            <section className={styles.saves_count_and_icon}>
                <div className={styles.saves_icon}>
                    <i>{SavedIcon.src && <Image src={SavedIcon.src} alt='saved icon' height={100} width={100} />}</i>
                </div>
                <div className={styles.saves_count}>
                    <span data-testid='savesCount'>{savesCount}</span>
                </div>
            </section>
        );
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
