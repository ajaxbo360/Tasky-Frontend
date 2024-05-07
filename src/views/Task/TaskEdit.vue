<template>
  <Layout>
    <div>
      <h1 class="mb-8 text-3xl font-bold">
        <RouterLink class="text-orange-400 hover:text-orange-600" to="/tasks"
          >Tasks List</RouterLink
        >
        <span class="text-orange-400 font-normal">/</span> Edit
      </h1>
      <div class="max-w-3xl bg-white rounded-md shadow overflow-hidden">
        <flash-messages :error="error" />
        <form @submit.prevent="update(taskId, task)">
          <div class="flex flex-wrap -mb-8 -mr-6 p-8">
            <text-input
              class="pb-8 pr-6 w-full"
              label="Name"
              v-model="task.name"
            />
            <textarea-input
              class="pb-8 pr-6 w-full"
              label="Description"
              v-model="task.description"
            />

            <text-input
              class="pb-8 pr-6 w-full"
              type="date"
              label="Due Date"
              v-model="task.due_date"
            />
            <div class="w-full mr-5">
              <label>Status:</label>
              <select
                v-model="task.status"
                @change="updateTaskStatus(task.status)"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full mb-2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500 mr-5"
              >
                <option
                  v-for="statusOption in statusOptions"
                  :key="statusOption"
                >
                  {{ statusOption }}
                </option>
              </select>
            </div>
          </div>
          <div
            class="flex items-center justify-end px-8 py-4 bg-gray-50 border-t border-gray-100"
          >
            <loading-button
              :loading="loading"
              class="px-6 py-3 rounded bg-orange-600 text-white text-sm leading-4 font-bold whitespace-nowrap hover:bg-orange-400 focus:bg-orange-400"
              type="submit"
              >Edit Task</loading-button
            >
          </div>
        </form>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import TextInput from "../Shared/TextInput.vue";
import TextareaInput from "../Shared/TextareaInput.vue";
import Layout from "../Shared/Layout.vue";
import FlashMessages from "../Shared/FlashMessages.vue";
import LoadingButton from "../Shared/LoadingButton.vue";
import useTaskById from "@/composables/useTaskById";
import useTaskEdit from "@/composables/useTaskEdit";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";

// Initialize router
const router = useRouter();

const statusOptions = ["New", "In Progress", "Completed"];

// Function to fetch task data based on ID
const taskId = router.currentRoute.value.params.id;
const { task, fetchTaskById } = useTaskById();
const { update, error } = useTaskEdit();

// Fetch task data on component mount
onMounted(() => fetchTaskById(taskId));
</script>
