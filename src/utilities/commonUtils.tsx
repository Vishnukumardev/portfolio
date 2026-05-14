import React, { useRef, useEffect, lazy } from 'react';
// Ensure you are importing LoadingBarRef explicitly as a type
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar';
// Ensure your loader-service has a corresponding .d.ts file or is written in TS
import loaderService from '../services/loader-service/loader-service';
import './commonUtils.css';

/* LAZY LOAD COMPONENTS FOR BETTER CODE SPLITTING */
const Home = lazy(() => import('../portfolio-container/Home/Home'));
const AboutMe = lazy(() => import('../portfolio-container/AboutMe/AboutMe'));
const Resume = lazy(() => import('../portfolio-container/Resume/Resume'));
const ContactMe = lazy(() => import('../portfolio-container/ContactMe/ContactMe'));

/* TOTAL NUMBER OF SCREENS */
export const TOTAL_SCREENS = [
  {
    screen_name: "Home",
    component: Home
  },
  {
    screen_name: "About Me",
    component: AboutMe
  },
  { screen_name: "Resume", component: Resume },
  // { screen_name: "Portfolio", component: null },
  { screen_name: "Contact Me", component: ContactMe }
];

/* GET SCREEN INDEX */
export const GET_SCREEN_INDEX = (screen_name : string) => {
  if (!screen_name)
    return -1;

  for (let i = 0; i < TOTAL_SCREENS.length; i++) {
    if (TOTAL_SCREENS[i].screen_name === screen_name)
      return i;
  }

  return -1;
}


/* 4. TYPED LOADING BAR COMPONENT */
export const LoaderBar: React.FC = () => {
  // Use LoadingBarRef type provided by the library
  const loaderReference = useRef<LoadingBarRef>(null);

  const loadingBarOptions = {
    shadow: true,
    height: 4,
    ref: loaderReference,
    transitionTime: 1000,
    className: 'loading-bar'
  };

  const invokeLoadingBar = () => {
    loaderReference.current?.continuousStart(0, 800);
  };

  const completeLoadingBarProgress = () => {
    loaderReference.current?.complete();
  };

  useEffect(() => {
    // 1. Change the parameter type to unknown to match the emitter's signature
    const loaderChangeHandler = (changeType: unknown) => {
      // 2. Type-guard to ensure the value is a string before checking cases
      if (typeof changeType !== 'string') return;

      switch (changeType) {
        case "start":
          invokeLoadingBar();
          break;
        case "complete":
          completeLoadingBarProgress();
          break;
        default:
          break;
      }
    };

    // 3. Subscription now compiles perfectly
    const loaderChangeSubscription = loaderService.loaderChangeEmitter.subscribe(loaderChangeHandler);

    return () => {
      /* UNSUBSCRIBE THE SUBSCRIPTIONS */
      loaderChangeSubscription.unsubscribe();
    };
  }, []); // Empty dependency array ensures subscription happens once on mount

  return (
    <div>
      <LoadingBar {...loadingBarOptions} />
    </div>
  );
};
