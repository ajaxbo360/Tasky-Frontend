// http()
//   .post("api/register", credentials)
//   .then((response) => {
//     console.log(response.data);
//     localStorage.setItem("token", response.data);
//     toast(response.data.data.message, {
//       theme: "auto",
//       type: "success",
//       autoClose: 4000,
//     });
//     setTimeout(() => {
//       router.push({ name: "login" });
//     }, 5000);
//   })
//   .catch((error) => {
//     console.error(error);
//     alert(error.response.data.message);
//   });
import { ref } from "vue";
import http from "@/helpers/http";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { toast } from "vue3-toastify";
export default function useLoging() {
  const loading = ref(false);
  const router = useRouter();

  const error = ref(null);

  const signUp = async (credentials) => {
    loading.value = true;
    http()
      .post("api/register", credentials)
      .then((response) => {
        localStorage.setItem("token", response.data);
        toast(response.data.data.message, {
          theme: "auto",
          type: "success",
          autoClose: 4000,
        });
        setTimeout(() => {
          router.push({ name: "login" });
        }, 5000);
      })
      .catch((error) => {
        console.error(error);
        alert(error.response.data.message);
      });
  };
  return {
    signUp,
    loading,
    error,
  };
}
