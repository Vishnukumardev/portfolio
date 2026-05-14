export default class Animations {

  /* SINGLETON CLASS INSTANCE */
  static animations: Animations = new Animations();

  // 1. Explicitly type the argument as a string
  fadeInScreen = (screen_name: string): void => {
    if (!screen_name) return;

    // 2. Extract and assert the element type specifically as an HTMLElement
    const screen = document.getElementById(screen_name) as HTMLElement | null;
    if (!screen) return;

    // 3. Modifying DOM styles is now fully safe
    screen.style.opacity = "1";
    screen.style.transform = "translateY(0px)";
  };
}
