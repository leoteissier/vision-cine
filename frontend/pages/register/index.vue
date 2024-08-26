<script setup lang="ts">
import { navigateTo } from '#app';
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import UserServices from "~/services/authsServices";
import {computed, ref} from "vue";

definePageMeta({
  title: 'Sign up',
  description: 'Sign up to your account',
  layout : 'auth-default',
})

const schema = z.object({
  username: z.string().min(3, 'Must be at least 3 characters'),
  email: z.string().email('Invalid email').or(z.string().length(0)),
  plainPassword: z.string()
      .min(8, 'Must be at least 8 characters')
      .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Must contain at least one number')
      .regex(/[^A-Za-z0-9]/, 'Must contain at least one symbol')
})

type Schema = z.output<typeof schema>

const state = ref({
  username: '',
  email: '',
  plainPassword: ''
})


const passwordVisible = ref(false)
const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value
}

// Validation
const validationResult = computed(() => schema.safeParse(state.value))

// Errors
const usernameError = computed(() => validationResult.value.success ? undefined : validationResult.value.error?.issues.find(issue => issue.path.includes('username'))?.message)
const emailError = computed(() => validationResult.value.success ? undefined : validationResult.value.error?.issues.find(issue => issue.path.includes('email'))?.message)
const plainPasswordError = computed(() => validationResult.value.success ? undefined : validationResult.value.error?.issues.find(issue => issue.path.includes('plainPassword'))?.message)


const submit = async (event: FormSubmitEvent<Schema>) => {
  try {
    await UserServices.register(event.data)
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
          Register to your account
        </h1>
        <UForm :schema="schema" :state="state" @submit="submit" class="space-y-4 md:space-y-6">
          <UFormGroup label="Username" :error="usernameError">
            <UInput v-model="state.username" name="username" placeholder="username" aria-autocomplete="none" />
          </UFormGroup>

          <UFormGroup label="Email" :error="emailError">
            <UInput v-model="state.email" type="email" name="email" placeholder="Enter email" />
          </UFormGroup>

          <UFormGroup label="Password" :error="plainPasswordError">
            <UInput v-model="state.plainPassword" :type="passwordVisible ? 'text' : 'password'" name="password" placeholder="********" />
            <UIcon :name="passwordVisible ? 'i-heroicons-eye' : 'i-heroicons-eye-slash'" class="absolute top-2 right-0.5 w-6 fill-green-600" @click="togglePasswordVisibility" />
          </UFormGroup>
          <div class="flex flex-col">
            <UButton type="submit" class="mb-3">Submit</UButton>
            <p class="text-sm text-center font-light text-gray-500 dark:text-gray-400">
              You already have account? <ULink to="/login" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in</ULink>
            </p>
          </div>
        </UForm>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>