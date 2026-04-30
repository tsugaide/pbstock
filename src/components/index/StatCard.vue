<script setup>
import { computed } from "vue";
import { useDataStore } from "../../stores/dataStore";

const dataStore = useDataStore();

const amanCount = computed(() => {
  return dataStore.items.filter((i) => i.stock > 7).length;
});

const rendahCount = computed(() => {
  return dataStore.items.filter((i) => i.stock > 0 && i.stock <= 7).length;
});

const habisCount = computed(() => {
  return dataStore.items.filter((i) => i.stock === 0).length;
});
</script>

<template>
  <div class="grid grid-cols-4 gap-4 mb-8">
    <div class="bg-white border border-border rounded-sm p-5">
      <p
        class="font-mono text-[0.68rem] text-muted uppercase tracking-widest mb-2"
      >
        Total Jenis
      </p>
      <div class="font-display text-4xl font-extrabold leading-none">
        {{ dataStore.items.length }}
      </div>
    </div>
    <div class="bg-white border border-border rounded-sm p-5">
      <p
        class="font-mono text-[0.68rem] text-muted uppercase tracking-widest mb-2"
      >
        Stok Aman
      </p>
      <div
        class="font-display text-4xl font-extrabold leading-none text-success"
      >
        {{ amanCount }}
      </div>
    </div>
    <div class="bg-white border border-border rounded-sm p-5">
      <p
        class="font-mono text-[0.68rem] text-muted uppercase tracking-widest mb-2"
      >
        Hampir Habis
      </p>
      <div
        class="font-display text-4xl font-extrabold leading-none text-warning"
      >
        {{ rendahCount }}
      </div>
    </div>
    <div class="bg-accent border border-accent rounded-sm p-5 text-white">
      <p
        class="font-mono text-[0.68rem] uppercase tracking-widest mb-2 opacity-75"
      >
        Habis
      </p>
      <div class="font-display text-4xl font-extrabold leading-none">
        {{ habisCount }}
      </div>
    </div>
  </div>
</template>
