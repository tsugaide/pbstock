<script setup>
import { onMounted } from "vue";
import Navbar from "./components/Navbar.vue";
import { useDataStore } from "./stores/dataStore";

const dataStore = useDataStore();

onMounted(async () => {
  await dataStore.getItems();
});
</script>

<template>
  <Navbar />
  <RouterView></RouterView>
</template>
