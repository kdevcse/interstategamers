import { useNavBar } from "@/composables/NavBar";

describe("NavBar unit tests", () => {
  describe("useNavBar composable", () => {
    test("toggleMobileMenu", () => {
      const { mobileMenuOpened, toggleMobileMenu } = useNavBar();

      expect(mobileMenuOpened.value).toBe(false);

      toggleMobileMenu();

      expect(mobileMenuOpened.value).toBe(true);
    });
  });
});