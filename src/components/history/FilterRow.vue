<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useTakeStore } from "../../stores/takeStore";
import { useAdminStore } from "../../stores/adminStore";
import Table from "./Table.vue";
import ExportModal from "./ExportModal.vue";

const takeStore = useTakeStore();
const adminStore = useAdminStore();

const search = ref("");
const filterItem = ref("");
const filterFrom = ref("");
const filterTo = ref("");
const currentPage = ref(1);
const perPage = 12;

const showExportModal = ref(false);

const uniqueItems = computed(() =>
  [...new Set(takeStore.transactionsData.map((t) => t.items.name))].sort(),
);

const filteredTx = computed(() =>
  takeStore.transactionsData.filter((tx) => {
    const q = search.value.toLowerCase();
    const matchSearch =
      !q ||
      tx.person_name.toLowerCase().includes(q) ||
      tx.items.name.toLowerCase().includes(q);
    const matchItem = !filterItem.value || tx.items.name === filterItem.value;
    const matchFrom =
      !filterFrom.value || new Date(tx.taken_at) >= new Date(filterFrom.value);
    const matchTo =
      !filterTo.value ||
      new Date(tx.taken_at) <= new Date(filterTo.value + "T23:59:59");
    return matchSearch && matchItem && matchFrom && matchTo;
  }),
);

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * perPage;
  return filteredTx.value.slice(start, start + perPage);
});

const resetFilter = () => {
  search.value = "";
  filterItem.value = "";
  filterFrom.value = "";
  filterTo.value = "";
  currentPage.value = 1;
};

watch(filteredTx, () => {
  currentPage.value = 1;
});

onMounted(async () => {
  await adminStore.cekSession();
});
</script>

<template>
  <div>
    <div class="flex gap-3 mb-4 flex-wrap items-end">
      <div class="flex-1 min-w-40">
        <label
          class="font-mono text-[0.72rem] uppercase tracking-[0.08em] text-muted block mb-1.5"
          >Cari nama / barang</label
        >
        <input
          type="text"
          class="border-[1.5px] border-border bg-white px-3.5 py-2.5 font-sans text-[0.9rem] rounded-sm w-full outline-none text-ink placeholder:text-muted focus:border-accent transition-colors"
          placeholder="Ketik nama atau barang..."
          v-model="search"
        />
      </div>
      <div class="min-w-40">
        <label
          class="font-mono text-[0.72rem] uppercase tracking-[0.08em] text-muted block mb-1.5"
          >Filter barang</label
        >
        <select
          class="border-[1.5px] border-border bg-white px-3.5 py-2.5 font-sans text-[0.9rem] rounded-sm w-full outline-none text-ink focus:border-accent transition-colors"
          v-model="filterItem"
        >
          <option value="">Semua Barang</option>
          <option v-for="name in uniqueItems" :key="name" :value="name">
            {{ name }}
          </option>
        </select>
      </div>
      <div class="min-w-40">
        <label
          class="font-mono text-[0.72rem] uppercase tracking-[0.08em] text-muted block mb-1.5"
          >Dari tanggal</label
        >
        <input
          type="date"
          class="border-[1.5px] border-border bg-white px-3.5 py-2.5 font-sans text-[0.9rem] rounded-sm w-full outline-none text-ink focus:border-accent transition-colors"
          v-model="filterFrom"
        />
      </div>
      <div class="min-w-40">
        <label
          class="font-mono text-[0.72rem] uppercase tracking-[0.08em] text-muted block mb-1.5"
          >Sampai tanggal</label
        >
        <input
          type="date"
          class="border-[1.5px] border-border bg-white px-3.5 py-2.5 font-sans text-[0.9rem] rounded-sm w-full outline-none text-ink focus:border-accent transition-colors"
          v-model="filterTo"
        />
      </div>
      <button
        class="bg-transparent text-ink border-[1.5px] border-border px-4 py-2.5 font-mono text-[0.78rem] uppercase tracking-[0.04em] cursor-pointer rounded-sm hover:border-ink transition-colors"
        @click="resetFilter"
      >
        Reset
      </button>
    </div>
    <Table
      :paginated-items="paginatedItems"
      :current-page="currentPage"
      :filtered-tx="filteredTx"
    />

    <button
      v-if="adminStore.isLoggedIn"
      class="bg-accent py-3 px-5 font-mono text-white rounded-md mt-20 cursor-pointer"
      @click="showExportModal = true"
    >
      Export Data
    </button>
  </div>
  <ExportModal
    :show-modal="showExportModal"
    :transactions="takeStore.transactionsData"
    @close="showExportModal = false"
  />
</template>
