
import { useRoute } from "vue-router";
import { watch, ref } from "vue";

export function useNavBar() {
  const route = useRoute();
  const mobileMenuOpened = ref(false);

  function toggleMobileMenu() {
    mobileMenuOpened.value = !mobileMenuOpened.value;
  }

  watch(route, () => {
    mobileMenuOpened.value = false;
  });

  return { mobileMenuOpened, toggleMobileMenu };
}