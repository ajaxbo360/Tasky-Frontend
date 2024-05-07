<template>
  <Layout>
    <div>
      <div class="flex items-center justify-end mb-6">
        <RouterLink
          class="float-end px-6 py-3 rounded bg-orange-400 text-white text-sm leading-4 font-bold whitespace-nowrap hover:bg-orange-500 focus:bg-orange-500"
          to="/task/create"
        >
          <span>Create a Task</span>
        </RouterLink>
      </div>
      <dir class="flex items-center">
        <div class="flex items-center mr-4">
          <label class="block text-gray-700 mr-4" for="sortBy">SortBy:</label>
          <select
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-36 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500 my-2"
            id="sortBy"
            v-model="date"
            @change="SortByOption(date)"
          >
            <option v-for="SortByOptions in sortOption" :key="SortByOptions">
              {{ SortByOptions }}
            </option>
          </select>
        </div>
        <label class="block text-gray-700 mr-4" for="status">Filterby:</label>
        <select
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-36 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500 my-2"
          id="status"
          v-model="status"
          @change="FilterStatus(status)"
        >
          <option v-for="filterOption in filterOptions" :key="filterOption">
            {{ filterOption }}
          </option>
        </select>
      </dir>
      <div class="bg-white rounded-md drop-shadow-2xl overflow-x-auto p-3">
        <div v-if="loading" class="btn-spinner mr-2" />
        <table class="w-full whitespace-nowrap">
          <thead>
            <tr class="text-left font-semibold text-slate-700">
              <th class="pb-4 pt-6 px-6">Name</th>
              <th class="pb-4 pt-6 px-6">Description</th>
              <th class="pb-4 pt-6 px-6">Status</th>
              <th class="pb-4 pt-6 px-6" colspan="2">Due Date</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="task in tasks.data"
              :key="task.id"
              class="hover:bg-gray-100 focus-within:bg-gray-100"
            >
              <td class="border-t">
                {{ task.attributes.name }}
              </td>
              <td class="border-t">
                {{ task.attributes.description }}
              </td>
              <td class="border-t">
                <select
                  v-model="task.attributes.status"
                  @change="updateTaskStatus(task, task.id)"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-36 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500 my-2"
                >
                  <option
                    v-for="statusOption in statusOptions"
                    :key="statusOption"
                  >
                    {{ statusOption }}
                  </option>
                </select>
              </td>
              <td class="border-t">
                {{ task.attributes.due_date }}
              </td>
              <td class="w-px border-t">
                <div class="flex space-x-2">
                  <button
                    class="flex items-center"
                    @click="confirmDelete(task)"
                    name="delete"
                    tabindex="-1"
                  >
                    <Icon
                      name="trash"
                      class="block w-5 h-5 fill-gray-400 hover:fill-red-400"
                    />
                  </button>
                  <RouterLink
                    class="flex items-center"
                    name="edit"
                    :to="`/task/${task.id}/edit`"
                    tabindex="-1"
                  >
                    <Icon
                      name="cheveron-right"
                      class="block w-6 h-6 fill-gray-400 hover:fill-blue-500"
                    />
                  </RouterLink>
                </div>
              </td>
            </tr>
            <tr v-if="tasks.length === 0">
              <td class="px-6 py-4 border-t" colspan="4">No task found.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Pagination :links="tasks.links" />
      <TailwindPagination
        :data="tasks"
        @pagination-change-page="fetchTasks"
        class="mt-4"
      />
    </div>
  </Layout>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import Layout from "../Shared/Layout.vue";
import useTasks from "@/composables/useTasks";
import useDeleteTask from "@/composables/useDeleteTask";
import { TailwindPagination } from "laravel-vue-pagination";
// import Pagination from "laravel-vue-pagination";

import Icon from "../Shared/Icon.vue";
import useTaskEdit from "@/composables/useTaskEdit";
import useFilterByStatus from "@/composables/useFilterByStatus";
import useSortBy from "@/composables/useSortBy";

const { tasks, loading, fetchTasks } = useTasks();
const { destroy } = useDeleteTask();
const currentPage = ref(1);
onMounted(() => {
  fetchTasks(currentPage.value);
});

const confirmDelete = (task) => {
  if (confirm("Are you sure you want to delete this task")) {
    destroy(task.id);
    fetchTasks();
  }
};

const statusOptions = ["New", "In Progress", "Completed"];
const filterOptions = ref(["New", "In Progress", "Completed"]);
const sortOption = ref(["created_at", "updated_at", "due_date"]);
const status = ref(["New", "In Progress", "Completed"]);

const date = ref(["created_at", "updated_at", "due_date"]);
const { update } = useTaskEdit();
const { filter, filterdedTasks } = useFilterByStatus();
const { sortBy, sortedTasks } = useSortBy();
console.log(tasks);

watch(status, async (newStatus) => {
  await fetchTasks(currentPage.value, newStatus);
  console.log(newStatus);
});
watch(date, async (newDate) => {
  await fetchTasks(newDate);
  console.log(newDate);
});

const updateTaskStatus = async (task, id) => {
  return update(id, task.attributes);
};

// const FilterStatus = async (statusName) => {
//   return await filter(statusName);
// };
// const SortByOption = async (dueDate) => {
//   // console.log(dueDate);
//   return await sortBy(dueDate);
// };
</script>

<style lang="scss" scoped></style>
