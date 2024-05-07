<template>
  <div class="h-screen flex justify-between">
    <div class="mb-4 flex flex-grow">
      <RouterLink class="group flex items-center py-3" to="/tasks">
        <icon name="dashboard" class="mr-2 w-4 h-4" />
        <div>Dashboard</div>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import Icon from "../Shared/Icon.vue";
</script>
