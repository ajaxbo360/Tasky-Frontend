import { ref } from "vue";
import http from "@/helpers/http";

export default function useTaskById() {
  const loading = ref(false);
  const task = ref({
    name: null,
    description: null,
    due_date: null,
    status: null,
  });
  const error = ref(null);

  const fetchTaskById = async (taskId) => {
    loading.value = true;
    try {
      const response = await http().get(`/api/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });

      task.value = response.data.data.attributes;
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  return {
    task,
    loading,
    error,
    fetchTaskById,
  };
}
