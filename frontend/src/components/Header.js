import React from 'react'
import headeLogoImg from '../images/header__logo/Vector.svg'

function Header() {
 return (
    <header className="header">
    <img src={ headeLogoImg } alt="лого" className="header__logo" />
    </header>
 )
}

export default Header;