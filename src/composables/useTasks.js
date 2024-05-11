import { ref } from "vue";
import http from "@/helpers/http";

export default function useTasks() {
  const loading = ref(false);
  let tasks = ref([]);
  const error = ref(null);

  const fetchTasks = async (page = 1, status = "", sortBy = "created_at") => {
    loading.value = true;
    try {
      let url = `/api/tasks?page=${page}&sort_by=${sortBy}`;
      if (status !== "") {
        url += `&status=${status}`;
      }

      const response = await http().get(url, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });

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
