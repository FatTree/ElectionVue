<script lang="ts" setup>
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';
import { onMounted } from 'vue';
import { useThemeStore } from '~/stores/useThemeStore';

const store = useThemeStore();

const { list } = storeToRefs(store);
const { getList } = store;

getList();
</script>

<template>
  <div class="outBox">
    <header>2020 開票地圖</header>
    <ul class="nav">
      <li v-for="(item, i) in list" :key="i">
        <nuxt-link
          :to="{
            name: 'id-type-code',
            params: { id: item.id, code: item.code, type: item.type },
          }"
        >
          {{ item.theme_name }}
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
.nav {
  display: flex;
}
</style>
~/viewModels/ElectionViewModel ~/services/ElectionService
