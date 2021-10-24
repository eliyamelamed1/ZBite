import Image from 'next/image';
import LogoIcon from '../styles/icons/logo.svg';
import styles from '../styles/layout/_footer.module.scss';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <ul>
                <li>
                    <i>{LogoIcon.src && <Image src={LogoIcon} alt='logo icon' height={100} width={100} />}</i>
                </li>
            </ul>
        </footer>
    );
};

export default Footer;
