import { TOTAL_SCREENS } from './commonUtils';
import { Subject } from 'rxjs';

// 1. Define internal telemetry data structures for your broadcasters
export interface ScreenInViewEvent {
  screenInView: string;
}

export interface ScreenFadeInEvent {
  fadeInScreen: string;
}

export default class ScrollService {
  /* SINGLETON CLASS INSTANCE */
  static scrollHandler: ScrollService = new ScrollService();

  /* BROADCASTERS - Typed explicitly with RxJS generics to ensure component contract validation */
  static currentScreenBroadcaster = new Subject<ScreenInViewEvent>();
  static currentScreenFadeIn = new Subject<ScreenFadeInEvent>();

  // 2. Class tracking property variables
  private scrollTimeout: NodeJS.Timeout | null = null;

  constructor() {
    /* ADD SCROLL EVENT TO WINDOW WITH DEBOUNCING FOR PERFORMANCE */
    window.addEventListener('scroll', this.debouncedScroll, { passive: true });
  }

  /* DEBOUNCED SCROLL HANDLER - IMPROVES PERFORMANCE */
  debouncedScroll = (): void => {
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
    this.scrollTimeout = setTimeout(() => {
      this.checkCurrentScreenUnderViewport();
    }, 50);
  };

  /* SCROLL TO HIRE ME / CONTACT ME SCREEN */
  scrollToHireMe = (): void => {
    const contactMeScreen = document.getElementById("Contact Me");
    if (!contactMeScreen) return;

    contactMeScreen.scrollIntoView({ behavior: "smooth" });
  };

  /* CHECK IF ELEMENT IS IN VIEW */
  isElementInView = (elem: HTMLElement, type: "partial" | "complete"): boolean => {
    const rec = elem.getBoundingClientRect();
    const elementTop = rec.top;
    const elemBottom = rec.bottom;

    /* Partially Visible */
    const partiallyVisible = elementTop < window.innerHeight && elemBottom >= 0;

    /* Completely Visible */
    const completelyVisible = elementTop >= 0 && elemBottom <= window.innerHeight;

    switch (type) {
      case "partial":
        return partiallyVisible;
      case "complete":
        return completelyVisible;
      default:
        return false;
    }
  };
  
  /* CHECK THE SCREEN THATS CURRENTLY UNDER VIEWPORT */
  checkCurrentScreenUnderViewport = (): void => {
    for (const screen of TOTAL_SCREENS) {
      const screenFromDOM = document.getElementById(screen.screen_name);
      if (!screenFromDOM) continue;

      const fullyVisible = this.isElementInView(screenFromDOM, "complete");
      const partiallyVisible = this.isElementInView(screenFromDOM, "partial");

      if (fullyVisible || partiallyVisible) {
        // Cast screen to 'any' or safely access dynamic key tracking properties
        const screenObj = screen as any;

        if (partiallyVisible && !screenObj.alreadyRendered) {
          // BROADCAST FADE IN EFFECT - Matches interface contracts cleanly
          ScrollService.currentScreenFadeIn.next({
            fadeInScreen: screen.screen_name
          });
          screenObj['alreadyRendered'] = true;
          break;
        }

        if (fullyVisible) {
          // BROADCAST SCREEN NAME - Matches interface contracts cleanly
          ScrollService.currentScreenBroadcaster.next({
            screenInView: screen.screen_name
          });
          break;
        }
      }
    }
  }
}
