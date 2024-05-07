import { ref } from "vue";
import http from "@/helpers/http";
import { toast } from "vue3-toastify";

export default function useTaskCreation() {
  const loading = ref(false);
  const error = ref(null);
  const success = ref(false);
  const message = ref(null);
  const taskCreation = ref(false);

  const store = async (task) => {
    loading.value = true;
    try {
      const response = await http().post(`/api/tasks`, task, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      toast(response.data.data.message, {
        theme: "auto",
        type: "success",
        autoClose: 5000,
      });

      taskCreation.value = true;
    } catch (err) {
      error.value = err.response.data.message;
      taskCreation.value = false;
    } finally {
      loading.value = false;
      taskCreation.value = true;
    }
  };

  return {
    loading,
    error,
    taskCreation,
    store,
  };
}
