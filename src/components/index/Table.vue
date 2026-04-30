<script setup>
import { ref, computed, onMounted } from "vue";
import { useDataStore } from "../../stores/dataStore";
import Modal from "./Modal.vue";

const dataStore = useDataStore();

const search = ref("");
const selectedCat = ref("Semua");
const form = ref({
  nama: "",
  itemName: "",
  itemId: "",
  jumlah: 1,
  satuan: "PCS",
  keperluan: "",
});
const showModal = ref(false);

const categories = computed(() => {
  return [...new Set(dataStore.items.map((i) => i.categories.name))];
});

const filteredItems = computed(() => {
  return dataStore.items.filter((i) => {
    const matchSearch = i.name
      .toLowerCase()
      .includes(search.value.toLowerCase());
    const matchCat =
      selectedCat.value === "Semua" || i.categories.name === selectedCat.value;
    return matchSearch && matchCat;
  });
});

const statusLabel = (item) => {
  if (item.stock === 0) return "HABIS";
  if (item.stock <= 5) return "RENDAH";
  return "AMAN";
};
const barColor = (item) => {
  if (item.stock > 5) return "#3a7d52";
  if (item.stock > 0) return "#c49a1a";
  return "#c0392b";
};
const openAmbilModal = (item = null) => {
  form.value = {
    nama: "",
    itemName: item.name,
    itemId: item ? item.id : "",
    jumlah: 1,
  };
  showModal.value = true;
};

const close = (data) => {
  showModal.value = data;
};
</script>

<template>
  <div>
    <!-- FILTER ROW -->
    <div class="flex items-center gap-3 mb-4 flex-wrap">
      <div class="relative flex-1 min-w-50 max-w-xs">
        <span
          class="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-sm"
          >🔍</span
        >
        <input
          type="text"
          class="border border-border bg-white pl-9 pr-3 py-2.5 font-body] text-sm rounded-sm w-full outline-none transition-colors focus:border-accent placeholder:text-muted text-ink"
          placeholder="Cari barang..."
          v-model="search"
        />
      </div>
      <div class="flex gap-2 flex-wrap">
        <button
          v-for="cat in ['Semua', ...categories]"
          :key="cat"
          @click="selectedCat = cat"
          :class="
            selectedCat === cat
              ? 'bg-ink text-white border-ink'
              : 'bg-white text-muted border-border hover:border-ink hover:text-ink'
          "
          class="font-mono text-[0.72rem] px-3 py-1.5 border rounded-sm cursor-pointer transition-all uppercase tracking-wide"
        >
          {{ cat }}
        </button>
      </div>
    </div>

    <!-- TABLE -->
    <div class="bg-white border border-border rounded-sm overflow-x-auto">
      <table class="w-full border-collapse">
        <thead>
          <tr>
            <th
              class="font-mono text-[0.7rem] uppercase tracking-widest text-muted px-4 py-3 text-left border-b border-border"
            >
              Nama Barang
            </th>
            <th
              class="font-mono text-[0.7rem] uppercase tracking-widest text-muted px-4 py-3 text-left border-b border-border"
            >
              Kategori
            </th>
            <th
              class="font-mono text-[0.7rem] uppercase tracking-widest text-muted px-4 py-3 text-left border-b border-border"
            >
              Stok
            </th>
            <th
              class="font-mono text-[0.7rem] uppercase tracking-widest text-muted px-4 py-3 text-left border-b border-border"
            >
              Status
            </th>
            <th class="border-b border-border px-4 py-3"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in filteredItems"
            :key="item.id"
            class="hover:[&>td]:bg-cream"
          >
            <td
              class="px-4 py-3.5 border-b border-cream text-sm font-medium last:border-0 transition-colors"
            >
              {{ item.name }}
            </td>
            <td
              class="px-4 py-3.5 border-b border-cream text-sm last:border-0 transition-colors"
            >
              <span
                class="font-mono text-[0.68rem] text-muted bg-cream px-1.5 py-0.5 rounded-sm tracking-wide"
                >{{ item.categories.name }}</span
              >
            </td>
            <td
              class="px-4 py-3.5 border-b border-cream text-sm last:border-0 transition-colors"
            >
              <div class="flex items-center gap-3">
                <span
                  class="w-2 h-2 rounded-full inline-block"
                  :style="{ background: barColor(item) }"
                ></span>
                {{ item.stock }}
              </div>
            </td>
            <td
              class="px-4 py-3.5 border-b border-cream text-sm last:border-0 transition-colors"
            >
              <span
                class="font-mono text-[0.7rem] px-2 py-0.5 rounded-sm tracking-wide"
                :class="{
                  'bg-[#d4edda] text-success': statusLabel(item) === 'AMAN',
                  'bg-[#fef9e7] text-warning': statusLabel(item) === 'RENDAH',
                  'bg-[#fde8e8] text-danger': statusLabel(item) === 'HABIS',
                }"
                >{{ statusLabel(item) }}</span
              >
            </td>
            <td
              class="px-4 py-3.5 border-b border-cream text-sm last:border-0 transition-colors"
            >
              <button
                @click="openAmbilModal(item)"
                :disabled="item.stock === 0"
                class="bg-transparent text-ink border border-border px-3 py-1.5 font-mono text-[0.72rem] uppercase tracking-wide cursor-pointer rounded-sm transition-all hover:border-ink disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Ambil
              </button>
            </td>
          </tr>
          <tr v-if="filteredItems.length === 0">
            <td
              colspan="5"
              class="text-center text-muted py-12 font-mono text-[0.8rem]"
            >
              tidak ada barang ditemukan
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <p class="font-mono text-[0.72rem] text-muted mt-6 tracking-wide">
      {{ filteredItems.length }} barang ditampilkan
    </p>
  </div>

  <Modal :form="form" @close-modal="close" :show-modal="showModal" />
</template>
