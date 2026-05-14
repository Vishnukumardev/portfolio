import React, { useState, useEffect, useCallback, memo } from 'react';
import { TOTAL_SCREENS, GET_SCREEN_INDEX } from '../../../utilities/commonUtils';
import ScrollService from '../../../utilities/ScrollService';
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Header.css';

// 1. Define strict type interfaces for the screen properties
interface ScreenItem {
  screen_name: string;
  component: React.ComponentType<any> | null;
}


const Header: React.FC = () => {
    /* STATES TO BE USED */
    const [selectedScreen, setSelectedScreen] = useState<number>(0);
    const [showHeaderOptions, setShowHeaderOptions] = useState<boolean>(false);

    // 2. Map screen event parameter safely to handle potential unknown type queries
    const updateCurrentScreen = useCallback((currentScreen: any) => {
        if (!currentScreen || !currentScreen.screenInView)
            return;

        let screenIndex = GET_SCREEN_INDEX(currentScreen.screenInView);
        if (screenIndex < 0)
            return;

        setSelectedScreen(screenIndex);
    }, []);

    // 3. Merged subscription allocation and cleanup pipelines natively into useEffect
    useEffect(() => {
        const currentScreenSubscription = ScrollService.currentScreenBroadcaster.subscribe(updateCurrentScreen);

        return () => {
            /* CLEANUP: Securely destroy current event subscriptions on component teardown */
            currentScreenSubscription.unsubscribe();
        }
    }, [updateCurrentScreen]);

    const getHeaderOptionsClasses = useCallback((index: number) => {
        let classes = "header-option ";
        if (index < TOTAL_SCREENS.length - 1)
            classes += "header-option-seperator ";

        if (selectedScreen === index)
            classes += "selected-header-option ";

        return classes;
    }, [selectedScreen]);

    const switchScreen = useCallback((index: number, screen: ScreenItem) => {
        let screenComponent = document.getElementById(screen.screen_name);
        if (!screenComponent)
            return;

        screenComponent.scrollIntoView({ behavior: 'smooth' });
        setSelectedScreen(index);
        setShowHeaderOptions(false);
    }, []);

    const getHeaderOptions = useCallback(() => {
        return (
            (TOTAL_SCREENS as ScreenItem[]).map((Screen, i) => (
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
