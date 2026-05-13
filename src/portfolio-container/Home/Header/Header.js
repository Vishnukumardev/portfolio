import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { TOTAL_SCREENS, GET_SCREEN_INDEX } from '../../../utilities/commonUtils';
import ScrollService from '../../../utilities/ScrollService';
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Header.css';

const Header = () => {

    /* STATES TO BE USED */
    const [selectedScreen, setSelectedScreen] = useState(0);
    const [showHeaderOptions, setShowHeaderOptions] = useState(false);

    const updateCurrentScreen = useCallback((currentScreen) => {
        if (!currentScreen || !currentScreen.screenInView)
            return;

        let screenIndex = GET_SCREEN_INDEX(currentScreen.screenInView);
        if (screenIndex < 0)
            return;

        setSelectedScreen(screenIndex);
    }, []);

    /* SUBSCRIPTIONS */
    const currentScreenSubscription = useMemo(
        () => ScrollService.currentScreenBroadcaster.subscribe(updateCurrentScreen),
        [updateCurrentScreen]
    );

    const getHeaderOptionsClasses = useCallback((index) => {
        let classes = "header-option ";
        if (index < TOTAL_SCREENS.length - 1)
            classes += "header-option-seperator ";

        if (selectedScreen === index)
            classes += "selected-header-option ";

        return classes;
    }, [selectedScreen]);

    const switchScreen = useCallback((index, screen) => {
        let screenComponent = document.getElementById(screen.screen_name);
        if (!screenComponent)
            return;

        screenComponent.scrollIntoView({ behavior: 'smooth' });
        setSelectedScreen(index);
        setShowHeaderOptions(false);
    }, []);

    const getHeaderOptions = useCallback(() => {
        return (
            TOTAL_SCREENS.map((Screen, i) => (
                <div key={Screen.screen_name} className={getHeaderOptionsClasses(i)}
                    onClick={() => switchScreen(i, Screen)}
                >
                    <span>{Screen.screen_name}</span>
                </div>
            ))
        )
    }, [getHeaderOptionsClasses, switchScreen]);

    const toggleHeaderOptions = useCallback(() => {
        setShowHeaderOptions(prev => !prev);
    }, []);

    useEffect(() => {
        return () => {
            /* UNSUBSCRIBE THE SUBSCRIPTIONS */
            currentScreenSubscription.unsubscribe();
        }
    }, [currentScreenSubscription]);

    return (
        <div className="header-container" onClick={toggleHeaderOptions}>
            <div className="header-parent">
                <div className="header-hamburger" onClick={toggleHeaderOptions}>
                    <FontAwesomeIcon className="header-hamburger-bars" icon={faBars} />
                </div>
                <div className="header-logo">
                    <span>VK.</span>
                </div>
                <div className={(showHeaderOptions) ? "header-options show-hamburger-options" : "header-options"}>
                    {getHeaderOptions()}
                </div>
            </div>
        </div>
    )
}

export default memo(Header);
