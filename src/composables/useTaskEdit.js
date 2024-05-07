import { ref } from "vue";
import http from "@/helpers/http";
import { toast } from "vue3-toastify";

export default function useTaskEdit() {
  const loading = ref(false);
  const error = ref(null);

  const update = async (taskId, editTask) => {
    loading.value = true;

    try {
      const response = await http().patch(`/api/tasks/${taskId}`, editTask, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });

      toast(response.data.data.message, {
        theme: "auto",
        type: "success",
        autoClose: 4000,
      });
    } catch (err) {
      error.value = err.response.data.message;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    update,
  };
}
