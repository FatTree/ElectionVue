<script lang="ts" setup>
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';
import { elections } from '../assets/elections';
// import draggable from 'vuedraggable';
import { getThemeList } from '~/services/ElectionService';
import type { ThemeViewModel } from '~/viewModels/ElectionViewModel';
import { onMounted, ref } from 'vue';

const list = ref<ThemeViewModel[]>([]);

list.value = await getThemeList();
</script>

<template>
  <div class="outBox">
    <header>2020 開票地圖</header>
    <ul>
      <li v-for="(item, i) in list" :key="i">
        <nuxt-link
          :to="{
            name: 'id-type-code',
            params: { id: item.id, code: item.code, type: item.type },
          }"
        >
          {{ item.theme_name }}{{ i }}
        </nuxt-link>
      </li>
    </ul>
    <main class="mainContent">
      <slot />
    </main>
  </div>
</template>

<style lang="scss" scoped>
* {
  display: block;
  border: 1px solid #000;
}
html,
body {
  height: 100%;
}
</style>
~/viewModels/ElectionViewModel ~/services/ElectionService
