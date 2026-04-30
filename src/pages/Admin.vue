<script setup>
import { onMounted, ref } from "vue";
import Header from "../components/admin/Header.vue";
import Login from "../components/admin/Login.vue";
import Tabs from "../components/admin/Tabs.vue";
import TabBarang from "../components/admin/TabBarang.vue";
import TabTopUp from "../components/admin/TabTopUp.vue";
import TabKategori from "../components/admin/TabKategori.vue";
import { useAdminStore } from "../stores/adminStore";
import { useDataStore } from "../stores/dataStore";

const adminStore = useAdminStore();
const dataStore = useDataStore();

onMounted(async () => {
  await dataStore.getItems();
  await dataStore.getCategories();
});

const tab = ref("barang");

const switchTab = (data) => {
  tab.value = data;
};
</script>

<template>
  <Login />
  <main class="max-w-6xl mx-auto px-6 py-8" v-if="adminStore.isLoggedIn">
    <Header @open-modal="showModal = true" />
    <Tabs @switch-tab="switchTab" />
    <div v-if="tab === 'barang'">
      <TabBarang />
    </div>
    <div v-if="tab === 'topup'">
      <TabTopUp />
    </div>
    <div v-if="tab === 'kategori'">
      <TabKategori />
    </div>
  </main>
</template>
