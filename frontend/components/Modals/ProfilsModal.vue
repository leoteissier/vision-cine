<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";
import { useProfilModalStore } from "~/stores/profilModal";
import ProfilsServices from "~/services/profilsServices";
import { z } from "zod";

const profilModal = useProfilModalStore();
const authStore = useAuthStore();

const schema = z.object({
  username: z.string().min(3, 'Must be at least 3 characters').optional(),
  email: z.string().email('Invalid email').or(z.string().length(0)).optional(),
  plainPassword: z.string()
      .min(8, 'Must be at least 8 characters')
      .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Must contain at least one number')
      .regex(/[^A-Za-z0-9]/, 'Must contain at least one symbol')
      .optional()
})

const data = ref({
  username: '',
  email: '',
  plainPassword: ''
})

const passwordVisible = ref(false)
const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value
}

const validationResult = computed(() => schema.safeParse(data.value));



// Errors
const usernameError = computed(() => {
  return data.value.username && !validationResult.value.success
      ? validationResult.value.error?.issues.find(issue => issue.path.includes('username'))?.message
      : undefined;
});
const emailError = computed(() => {
  return data.value.email && !validationResult.value.success
      ? validationResult.value.error?.issues.find(issue => issue.path.includes('email'))?.message
      : undefined;
});
const plainPasswordError = computed(() => {
  return data.value.plainPassword && !validationResult.value.success
      ? validationResult.value.error?.issues.find(issue => issue.path.includes('plainPassword'))?.message
      : undefined;
});


const onSubmit = async () => {
  if (validationResult.value.success || (validationResult.value.error?.issues.every(issue =>
      (issue.path[0] === 'plainPassword' && !data.value.plainPassword) ||
      (issue.path[0] === 'username' && !data.value.username) ||
      (issue.path[0] === 'email' && !data.value.email)
  ))) {
    try {
      const updateData = {};
      const id = '/api/users/' + authStore.user.id

      if (data.value.username && data.value.username !== authStore.user.username) {
        updateData.username = data.value.username;
      }

      if (data.value.email && data.value.email !== authStore.user.email) {
        updateData.email = data.value.email;
      }

      if (data.value.plainPassword) {
        updateData.password = data.value.plainPassword;
      }

      if (Object.keys(updateData).length > 0) {
        await ProfilsServices.patchProfil({ id, ...updateData });
        authStore.updateUser(updateData);
        profilModal.closeModal();
      } else {
        profilModal.closeModal();
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log('Validation errors', validationResult.value.error?.issues);
  }
};


onMounted(() => {
  data.value.username = authStore.user.username || '';
  data.value.email = authStore.user.email || '';
});


</script>

<template>
  <UModal v-model="profilModal.isModalOpen" prevent-close>
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <!-- Dynamic form title -->
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            Edit Profil
          </h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="profilModal.closeModal();" />
        </div>
      </template>

      <UForm :schema="schema" :state="data">
        <UFormGroup label="Username" :error="usernameError">
          <UInput v-model="data.username" name="username" placeholder="username" aria-autocomplete="none" />
        </UFormGroup>

        <UFormGroup label="Email" :error="emailError">
          <UInput v-model="data.email" type="email" name="email" placeholder="Enter email" />
        </UFormGroup>

        <UFormGroup label="Password" :error="plainPasswordError">
          <UInput v-model="data.plainPassword" :type="passwordVisible ? 'text' : 'password'" name="password" placeholder="********" />
          <UIcon :name="passwordVisible ? 'i-heroicons-eye' : 'i-heroicons-eye-slash'" class="absolute top-2 right-0.5 w-6 fill-green-600" @click="togglePasswordVisibility" />
        </UFormGroup>
        <div class="flex justify-end mt-4">
          <UButton @click="onSubmit" type="submit" color="primary" label="Update profil" />
        </div>
      </UForm>
    </UCard>
  </UModal>
</template>

<style scoped>

</style>