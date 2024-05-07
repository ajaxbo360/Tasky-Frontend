import { ref } from "vue";
import http from "@/helpers/http";

export default function useTaskEdit() {
  const loading = ref(false);
  const error = ref(null);
  const sortedTasks = ref([]);

  const sortBy = async (dueDate) => {
    loading.value = true;

    try {
      const response = await http().get(`/api/tasks?sort_by=${dueDate}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });

      sortedTasks.value = response.data;
    } catch (err) {
      error.value = err.response.data.message;
    } finally {
      loading.value = false;
    }
  };

  return {
    sortedTasks,
    loading,
    error,
    sortBy,
  };
}
