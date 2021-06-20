import React from 'react';
import { ReactComponent as MenuIcon }  from '../../assets/svg/menu.svg'

const Header = () => {
    return (
        <div className="p-fixed z-10 w-100p px-4 flex flex-middle c-white ta-left bg-vilot">
            <MenuIcon/>
            <p className="px-3 fw-500">Messages</p>
        </div>
    );
};

export default Header;