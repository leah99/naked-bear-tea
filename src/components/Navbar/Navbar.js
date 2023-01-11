import React, { useState, useRef, useEffect, useCallback } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import {ReactComponent as Logo} from '../../assets/naked-bear-tea-logo.svg';
import './Navbar.scss';

const Navbar = () => {
    /* If side menu is opened or closed */
    const [open, setOpen] = useState(false);

    /* If hamburger menu icon is visible */
    const [hamburger, setHamburger] = useState(true);

    const handleClick = () => setOpen(!open);
    const closeMobileMenu = () => setOpen(false);

    /* Show hamburger menu icon if screen is small */
    const showHamburger = () => {
        if(window.innerWidth <= 960) {
            setHamburger(true);
        } else {
            setHamburger(false)
        }
    };

    /* Hides hamburger menu icon even after refresh */
    useEffect(() => {
        showHamburger()
    }, []);

    window.addEventListener('resize', showHamburger);

    /* Disable scrolling when side menu is opened */
    useEffect(() => {
        if(open === true) {
            document.documentElement.style.overflow = 'hidden';
            document.body.scroll = "no";
        }
        else {
            document.documentElement.style.overflow = 'scroll';
            document.body.scroll = "yes";
        }
    }, [open]);

    /* Close menu when click is detected outside */
    const menuRef = useRef(null);
    const hamburgerRef = useRef(null);

    const handleClickOutside = useCallback(
        (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target) && !hamburgerRef.current.contains(event.target)) {
                setOpen(false);
            }
        }, [setOpen]
    );

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, [handleClickOutside]);

    /* Disappearing header on scroll */
    function useScrollDirection() {
        const [scrollDirection, setScrollDirection] = useState(null);
      
        useEffect(() => {
            let lastScrollY = window.pageYOffset;
      
            const updateScrollDirection = () => {
                const scrollY = window.pageYOffset;
                const direction = scrollY > lastScrollY ? "down" : "up";
                if (direction !== scrollDirection && (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)) {
                    setScrollDirection(direction);
                }
                lastScrollY = scrollY > 0 ? scrollY : 0;
            };
            window.addEventListener("scroll", updateScrollDirection); // add event listener
            return () => {
                window.removeEventListener("scroll", updateScrollDirection); // clean up
            }
        }, [scrollDirection]);
      
        return scrollDirection;
    };

    const scrollDirection = useScrollDirection();

    /* Redirect to home page */
    const navigate = useNavigate();

    const handleRedirectToHome = () => {
        closeMobileMenu();
        navigate("/");
    };

    return (
        <div className={`${scrollDirection === "down" ? "navbar--hide" : "navbar--show"}`}>
            {/* -- Hamburger Icon -- */}
            {hamburger && <div ref={hamburgerRef} className={`${open ? "navbar__hamburger--open" : "navbar__hamburger--close"}`} onClick={handleClick}>
                <span className="navbar__hamburger__bar" />
                <span className="navbar__hamburger__bar" />
                <span className="navbar__hamburger__bar" />
            </div>}

            {/* -- Menu -- */}
            <div className={`${open ? "navbar__menu--open" : "navbar__menu--close"}`}>
                {/* -- Logo -- */}
                <Logo className={`${open ? "navbar__menu--open__logo" : "navbar__menu--close__logo"}`} onClick={handleRedirectToHome} />
                <nav ref={menuRef} className={`${open ? "navbar__menu--open__links" : "navbar__menu--close__links"}`}>
                    <NavLink to="/" onClick={closeMobileMenu}>HOME</NavLink>
                    <NavLink to="/Tea" onClick={closeMobileMenu}>TEA</NavLink>
                    <NavLink to="/Explore" onClick={closeMobileMenu}>EXPLORE</NavLink>
                    <NavLink to="/Blog" onClick={closeMobileMenu}>BLOG</NavLink>
                </nav>
            </div>
        </div>
    )
};

export default Navbar;