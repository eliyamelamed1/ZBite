import Image from 'next/image';
import LogoIcon from '../styles/icons/logo.svg';

const Footer = () => {
    return (
        <footer>
            <ul>
                <li>
                    <i>{LogoIcon.src && <Image src={LogoIcon} alt='logo icon' height={100} width={100} />}</i>
                </li>
            </ul>
        </footer>
    );
};

export default Footer;
