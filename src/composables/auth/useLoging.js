import { ref } from "vue";
import http from "@/helpers/http";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { toast } from "vue3-toastify";
export default function useLoging() {
  const loading = ref(false);
  const router = useRouter();
  const auth = useAuthStore();
  const error = ref(null);

  const signIn = async (credentials) => {
    loading.value = true;
    http()
      .post("/api/login", credentials)
      .then((response) => {
        console.log(response.data);
        auth.setUser(response.data.data.user);
        localStorage.setItem("token", JSON.stringify(response.data.data.token));
        toast(response.data.data.message, {
          theme: "auto",
          type: "success",
          autoClose: 4000,
        });
        setTimeout(() => {
          router.push({ name: "dashboard" });
        }, 5000);
      })

      .catch((error) => {
        console.error(error);
        loading.value = false;
        alert(error.response.data.message);
      });
  };
  return {
    signIn,
    loading,
    error,
  };
}
