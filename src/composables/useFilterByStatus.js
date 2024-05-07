import { ref } from "vue";
import http from "@/helpers/http";

export default function useTaskEdit() {
  const loading = ref(false);
  const error = ref(null);
  const filterdedTasks = ref([]);

  const filter = async (statusName) => {
    loading.value = true;

    try {
      const response = await http().get(`/api/tasks?status=${statusName}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });

      filterdedTasks.value = response.data;
    } catch (err) {
      error.value = err.response.data.message;
    } finally {
      loading.value = false;
    }
  };

  return {
    filterdedTasks,
    loading,
    error,
    filter,
  };
}
