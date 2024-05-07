import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
  // store  the user

  const user = ref(JSON.parse(localStorage.getItem("user")) || null);

  const isAuthenticated = computed(() => {
    return !!user.value;
  });

  const setUser = (userData) => {
    user.value = { ...userData };
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const login = (userData) => {
    user.value = { ...userData };
  };

  const logout = () => {
    user.value = null;
    localStorage.removeItem("token");

    localStorage.removeItem("user");
  };

  const register = (userData) => {
    user.value = { ...userData };
  };

  return { user, isAuthenticated, login, logout, register, setUser };
});
