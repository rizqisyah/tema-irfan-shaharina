<template>
  <vue3-snackbar top :duration="4000" />
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
</script>
