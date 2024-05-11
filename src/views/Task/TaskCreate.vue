<template>
  <Layout>
    <div>
      <flash-messages :error="error" />

      <h1 class="mb-8 text-3xl font-bold">
        <RouterLink class="text-orange-400 hover:text-orange-600" to="/tasks"
          >Tasks List</RouterLink
        >
        <span class="text-orange-400 font-normal">/</span> Create
      </h1>
      <div class="max-w-3xl bg-white rounded-md shadow overflow-hidden">
        <form @submit.prevent="store(task)">
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

            <select-input
              class="pb-8 pr-6 w-full"
              label="Status"
              v-model="task.status"
            >
              <option :value="null" />
              <option value="New">New</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select-input>
          </div>
          <div
            class="flex items-center justify-end px-8 py-4 bg-gray-50 border-t border-gray-100"
          >
            <loading-button
              :loading="loading"
              class="px-6 py-3 rounded bg-orange-600 text-white text-sm leading-4 font-bold whitespace-nowrap hover:bg-orange-400 focus:bg-orange-400"
              type="submit"
              >Create Task</loading-button
            >
          </div>
        </form>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import TextInput from "../Shared/TextInput.vue";
import FlashMessages from "../Shared/FlashMessages.vue";
import TextareaInput from "../Shared/TextareaInput.vue";
import Layout from "../Shared/Layout.vue";
import SelectInput from "../Shared/SelectInput.vue";
import LoadingButton from "../Shared/LoadingButton.vue";
import { reactive, watch } from "vue";
import useTaskCreation from "../../composables/useTaskCreation";

const { error, loading, store } = useTaskCreation();

// Watch the loading state and clear fields when loading becomes true
watch(loading, (newValue) => {
  if (newValue === true) {
    task.name = "";
    task.description = "";
    task.due_date = "";
    task.status = ""; // Assuming status can also be cleared
  }
});

const task = reactive({
  name: null,
  description: null,
  due_date: null,
  status: null,
});
</script>
