import React, { useState } from 'react';

import Image from 'next/image';
import NavBurgerIcon from '../../styles/icons/navBurger.svg';

const SideNav = () => {
    const [isActive, setIsActive] = useState(false);

    const openedNav = (
        <div>
            <button onClick={() => setIsActive(!isActive)}>
                {NavBurgerIcon.src && <Image src={NavBurgerIcon} alt='logo icon' height={50} width={50} />}
            </button>
        </div>
    );
    const closedNav = (
        <div>
            <button onClick={() => setIsActive(!isActive)}>
                {NavBurgerIcon.src && <Image src={NavBurgerIcon} alt='logo icon' height={100} width={100} />}
            </button>
        </div>
    );

    return <div>{isActive ? openedNav : closedNav}</div>;
};

export default SideNav;
