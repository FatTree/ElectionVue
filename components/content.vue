<script lang="ts" setup>
import { defineProps } from 'vue';
import { elections } from '../assets/elections';

const props = defineProps(['id', 'type', 'code']);
</script>

<template>
  <h1>content</h1>

  <div class="option">
    <select name="pets" id="select-1">
      <option value="">--City--</option>
    </select>
    <select name="pets" id="select-2">
      <option value="">--Area--</option>
    </select>
    <select name="pets" id="select-3">
      <option value="">--town--</option>
    </select>
    <button>delete</button>
  </div>
  <div class="detaile">
    <div class="percent">
      <div class="percent__title">
        <h2>投票概況</h2>
      </div>
      <div class="percent__total">
        <h2>總體percent</h2>
        <p>投票數： <label for=""></label></p>
        <p>無效票數： <label for=""></label></p>
        <p>有效票數： <label for=""></label></p>
      </div>
      <div class="percent__parties">
        <h2>政黨percent</h2>
        <p>投票數： <label for=""></label></p>
      </div>
    </div>
    <div class="taiwan">TAIWAN</div>
    <div class="hints">
      <div class="hints__hint1">hint 1</div>
      <div class="hints__hint1">hint 2</div>
    </div>
  </div>
</template>

<style></style>
