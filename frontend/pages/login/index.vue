<script setup lang="ts">
import { navigateTo } from '#app';
import { ref, computed } from "vue";
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import UserServices from '~/services/authsServices'
import { useAuthStore } from "~/stores/auth"

definePageMeta({
  title: 'Sign in',
  description: 'Sign in to your account',
  layout : 'auth-default',
})

const schema = z.object({
  email: z.string().email('Invalid email').or(z.string().length(0)),
  password: z.string()
      .min(8, 'Must be at least 8 characters')
      .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Must contain at least one number')
      .regex(/[^A-Za-z0-9]/, 'Must contain at least one symbol')
})

type Schema = z.output<typeof schema>
const state = ref({
  email: '',
  password: ''
})

const passwordVisible = ref(false)
const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value
}

const validationResult = computed(() => schema.safeParse(state.value))

const emailError = computed(() => validationResult.value.success ? undefined : validationResult.value.error?.issues.find(issue => issue.path.includes('email'))?.message)
const passwordError = computed(() => validationResult.value.success ? undefined : validationResult.value.error?.issues.find(issue => issue.path.includes('password'))?.message)

const submit = async (event: FormSubmitEvent<Schema>) => {
  try {
    const response = await UserServices.login(event.data);
    useAuthStore().login(response.token, response.user);
    return navigateTo('/');
  } catch (error) {
    console.log(error);
  }
};
</script>


<template>
  <section class="h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center px-6 py-8 mx-auto">
    <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Login to your account
        </h1>
        <UForm :schema="schema" :state="state" @submit="submit" class="space-y-4 md:space-y-6">
          <UFormGroup label="Email" :error="emailError">
            <UInput v-model="state.email" type="email" name="email" placeholder="Enter email" />
          </UFormGroup>

          <UFormGroup label="Password" :error="passwordError">
            <UInput v-model="state.password" :type="passwordVisible ? 'text' : 'password'" name="password" placeholder="********" />
            <UIcon :name="passwordVisible ? 'i-heroicons-eye' : 'i-heroicons-eye-slash'" class="absolute top-1.5 right-0.5 w-8" @click="togglePasswordVisibility" />
          </UFormGroup>
          <ULink to="/forgot-password" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</ULink>
          <div class="flex flex-col">
            <UButton type="submit" class="mb-3">Submit</UButton>
            <p class="text-sm text-center font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet? <ULink to="/register" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</ULink>
            </p>
          </div>
        </UForm>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
