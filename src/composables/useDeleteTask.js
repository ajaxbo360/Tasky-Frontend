import { ref } from "vue";
import http from "@/helpers/http";
import { toast } from "vue3-toastify";

export default function useDeleteTask() {
  const error = ref(null);

  const destroy = async (taskId) => {
    try {
      const response = await http().delete(`/api/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      toast(response.data.data.message, {
        theme: "auto",
        type: "warning",
        autoClose: 5000,
      });
    } catch (err) {
      error.value = err.response.data.message;
    } finally {
    }
  };

  return {
    error,
    destroy,
  };
}
