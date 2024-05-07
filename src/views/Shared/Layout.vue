<template>
  <div>
    <div />
    <div class="md:flex md:flex-col h-full">
      <div class="md:flex md:flex-col md:h-screen">
        <div class="md:flex md:flex-shrink-0">
          <div
            class="flex items-center justify-between px-6 py-6 bg-orange-500 md:flex-shrink-0 md:justify-center md:w-56"
          >
            <div class="text-2xl font-semibold text-white">SquaHR</div>

            <template>
              <svg
                class="w-6 h-6 fill-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </template>
          </div>
          <div
            class="md:text-md flex items-center justify-between p-6 w-full text-sm bg-white border-b md:px-12 md:py-0"
          >
            <div class="mr-4 mt-1">Task Management System</div>
            <div class="flex space-x-1">
              <div class="flex items-center">
                <div
                  class="mr-3 text-sm text-gray-700 group-hover:text-gray-400 focus:text-gray-400 whitespace-nowrap"
                >
                  <span>{{ auth.user?.name }}</span>
                </div>
              </div>
              <a href="#" name="logout" type="button" @click="logout">
                <svg
                  class="w-8 h-8 fill-gray-700 hover:fill-orange-600 focus:fill-orange-600"
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  viewBox="-5.0 -10.0 110.0 135.0"
                >
                  <path
                    d="m66.898 64.891v4.8516c0 8.2383-6.8984 14.941-15.391 14.941l-21.988-0.003906c-8.4883 0-15.391-6.6992-15.391-14.941v-39.477c0-8.2383 6.8984-14.941 15.391-14.941h21.98c8.4883 0 15.391 6.6992 15.391 14.941v4.2891c0 1.9297-1.5703 3.5-3.5 3.5s-3.5-1.5703-3.5-3.5v-4.2891c0-4.3789-3.7617-7.9414-8.3906-7.9414h-21.98c-4.6289 0-8.3906 3.5586-8.3906 7.9414v39.48c0 4.3789 3.7617 7.9414 8.3906 7.9414h21.98c4.6289 0 8.3906-3.5586 8.3906-7.9414v-4.8516c0-1.9297 1.5703-3.5 3.5-3.5s3.5 1.5703 3.5 3.5zm17.988-17.309-9.1484-9.5312c-1.3398-1.3984-3.5586-1.4414-4.9492-0.10156-1.3906 1.3398-1.4414 3.5508-0.10156 4.9492l3.4609 3.6016h-23.641c-1.9297 0-3.5 1.5703-3.5 3.5s1.5703 3.5 3.5 3.5h23.238l-2.9805 2.8984c-1.3789 1.3516-1.4102 3.5586-0.058594 4.9492 0.67969 0.69922 1.5898 1.0586 2.5 1.0586 0.91016 0 1.7695-0.32812 2.4492-1l9.1484-8.8984c1.3789-1.3398 1.4219-3.5508 0.078124-4.9297z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div class="md:flex md:flex-grow md:overflow-hidden h-screen">
          <main-menu
            class="hidden flex-shrink-0 p-12 w-56 bg-orange-400 overflow-y-auto md:block"
          />
          <div
            class="px-4 py-8 md:flex-1 md:p-12 md:overflow-y-auto"
            scroll-region
          >
            <slot />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MainMenu from "../Shared/MainMenu.vue";

import { useAuthStore } from "@/stores/auth";
import useLogout from "../../composables/auth/useLogout";

const { logout } = useLogout();

const auth = useAuthStore();
</script>
