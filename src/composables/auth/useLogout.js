import { ref } from "vue";
import http from "@/helpers/http";

export default function useLogout() {
  const loading = ref(false);

  const error = ref(null);

  const logout = async () => {
    loading.value = true;
    console.log(JSON.parse(localStorage.getItem("token")));
    try {
      await http().delete("/api/logout", {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };
  return {
    loading,
    error,
    logout,
  };
}
