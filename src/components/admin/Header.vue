<script setup>
import { ref } from "vue";
import ModalAdd from "./ModalAdd.vue";
import { useAdminStore } from "../../stores/adminStore";

const adminStore = useAdminStore();
const showModal = ref(false);

const logOut = async () => {
  await adminStore.logOut();
};
</script>

<template>
  <div class="flex items-start justify-between mb-8">
    <div>
      <p
        class="font-mono text-[0.72rem] uppercase tracking-[0.08em] text-muted mb-1.5"
      >
        Panel Admin
      </p>
      <h1 class="font-display font-extrabold text-[2rem] tracking-tight">
        Kelola Barang
      </h1>
    </div>
    <div class="flex gap-2">
      <button
        class="bg-accent hover:bg-accent-dark text-white border-none px-5 py-2.5 font-mono text-[0.78rem] uppercase tracking-[0.05em] cursor-pointer rounded-xs transition-all duration-150"
        @click="showModal = true"
      >
        + Tambah Barang
      </button>
      <button
        class="bg-transparent text-ink border-[1.5px] border-border hover:border-ink px-4 py-2 font-mono text-[0.78rem] uppercase tracking-[0.04em] cursor-pointer rounded-xs transition-all duration-150"
        @click="logOut"
      >
        Keluar
      </button>
    </div>
  </div>

  <ModalAdd v-model:show-modal="showModal" />
</template>
