<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'
import UserService from "~/services/authsServices";

definePageMeta({
  title: 'Forgot password',
  description: 'Forgot password page',
  layout : 'auth-default',
})

const schema = z.object({
  email: z.string().email('Invalid email'),
})
type Schema = z.output<typeof schema>
const state = ref({
  email: undefined,
})
async function submit(event: FormSubmitEvent<Schema>) {
  try {
    await UserService.forgotPassword(event.data);
    return navigateTo('/login');
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <section class="h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center px-6 py-8 mx-auto">
    <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          You forgot your password ?
        </h1>
        <UForm :schema="schema" :state="state" @submit="submit" class="space-y-4 md:space-y-6">
          <UFormGroup label="Email" name="email" class="block mb-6 text-sm font-medium text-gray-900 dark:text-white">
            <UInput v-model="state.email" type="email" placeholder="you@example.com" icon="i-heroicons-envelope" />
          </UFormGroup>
          <div class="flex flex-col">
            <UButton type="submit" class="mb-2">Submit</UButton>
            <p class="text-sm text-center font-light text-gray-500 dark:text-gray-400">
              you have found your password? <ULink to="/login" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in</ULink>
            </p>
          </div>
        </UForm>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>