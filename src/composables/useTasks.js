import { ref } from "vue";
import http from "@/helpers/http";

export default function useTasks() {
  const loading = ref(false);
  let tasks = ref([]);
  const error = ref(null);

  const fetchTasks = async (
    page = 1,
    status = "New",
    sortBy = "created_at"
  ) => {
    loading.value = true;
    try {
      const response = await http().get(
        `/api/tasks?page=${page}&status=${status}&sort_by=${sortBy}`,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );

      tasks.value = response.data;
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  return {
    tasks,
    loading,
    error,
    fetchTasks,
  };
}
