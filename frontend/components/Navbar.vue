<script setup lang="ts">
import { navigateTo } from "#app";
import { useAuthStore } from "~/stores/auth";
import { useProfilModalStore } from "~/stores/profilModal";

const profilModal = useProfilModalStore();

const logout = () => {
  useAuthStore().logout()
  return navigateTo('/login')
}
</script>

<template>
  <nav>
    <ul>
      <li>
        <ULink
            to="/"
            active-class="text-primary"
            inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
        >
          Home
        </ULink>
      </li>
      <li>
        <ULink
            to="/movies"
            active-class="text-primary"
            inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
        >
          Movies
        </ULink>
      </li>
      <li>
        <ULink
            to="/actors"
            active-class="text-primary"
            inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
        >
          Actors
        </ULink>
      </li>
      <li>
        <ULink
            to="/categories"
            active-class="text-primary"
            inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
        >
          Categories
        </ULink>
      </li>
    </ul>
    <ul v-if="useAuthStore().isAuthenticated">
      <li class="flex items-center">
        <ULink
            to="/login"
            active-class="text-primary"
            inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            @click="logout"
        >
          Logout
        </ULink>
      </li>
      <li @click="profilModal.openModal()">
        <UAvatar :alt="useAuthStore().user.username" size="sm" class="cursor-pointer" />
      </li>
    </ul>
    <ul v-else>
      <li>
        <ULink
            to="/register"
            active-class="text-primary"
            inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
        >
          Register
        </ULink>
      </li>
      <li>
        <ULink
          to="/login"
          active-class="text-primary"
          inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
        >
          Login
        </ULink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom : 1px solid #334155FF;
}
ul {
  display: flex;
  list-style: none;
}
li {
  margin-left: 1rem;
}
</style>