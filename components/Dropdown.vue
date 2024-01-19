<script lang="ts" setup generic="T">
type Props = {
  selectedValue: T;
  options: { value: T; label: string }[];
};

type Emits = {
  (e: "update:selectedValue", payload: T | undefined): void;
};

const props = withDefaults(defineProps<Props>(), {});

const emit = defineEmits<Emits>();

const _selectedValue = ref<T>();

watch(
  () => props.selectedValue,
  (value) => {
    _selectedValue.value = value;
  },
  {
    immediate: true,
  }
);

watch(_selectedValue, (value) => {
  emit("update:selectedValue", value);
});

watch(
  () => props.options,
  (opts) => {
    if (opts.length > 0) {
      const { value } = opts[0];
      _selectedValue.value = value;
    }
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <select v-model="_selectedValue">
    <option
      v-for="(item, index) in props.options"
      :key="index"
      :value="item.value"
    >
      {{ item.label }}
    </option>
  </select>
</template>

<style lang="scss" scoped></style>
