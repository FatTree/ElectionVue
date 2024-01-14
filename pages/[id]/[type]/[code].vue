<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { getProfileList } from '../../../services/ElectionService';

const route = useRoute();
const id = route.params.id as string;
const type = route.params.type as string;
const code = route.params.code as string;

const profile = ref();
profile.value = await getProfileList(id, type, code);
</script>

<template>
  <content :id="id" :profile="profile" />
</template>

<style scoped></style>
