<script setup lang="ts">
import { useRoute } from 'vue-router';
import { getProfileList } from '~/services/ElectionService';
import type { ProfileViewModel } from '~/viewModels/ElectionViewModel';

const route = useRoute();
const id = route.params.id as string;
const type = route.params.type as string;
const code = route.params.code as string;

const list = ref<ProfileViewModel[]>([]);
list.value = await getProfileList(id, type, code);
</script>

<template>
  <div>{{ list }}</div>
</template>

<style scoped></style>
