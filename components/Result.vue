<script lang="ts" setup generic="T">
type Props = {
  title: string;
  selectedValue: string;
  list: T[];
};

const props = withDefaults(defineProps<Props>(), {
  title: "Result",
  selectedValue: "Selected Value",
  list: () => [],
});
</script>

<template>
  <div class="result">
    <h2>{{ props.title }}</h2>
    <p>{{ props.selectedValue }}</p>
    <div v-for="(item, index) in props.list" :key="index" class="result__item">
      <slot :item="item"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.result {
  &__item {
    border: 1px solid #000;
  }
}
</style>
