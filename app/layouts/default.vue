<script setup>
import "~/styles/global.css";
import Navigation from "~/components/navigation/index.vue";
</script>

<template>
  <div>
    <Navigation />
    <slot />
  </div>
</template>
