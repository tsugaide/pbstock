<script setup>
import { ref } from "vue";
import { useDataStore } from "../../stores/dataStore";
import ModalEdit from "./ModalEdit.vue";

const dataStore = useDataStore();

const statusLabel = (item) => {
  if (item.stock === 0) return "Habis";
  if (item.stock <= 5) return "Rendah";
  return "Aman";
};

const showModal = ref(false);
const form = ref({});

const openEditModal = (item) => {
  showModal.value = true;
  form.value = item;
};

const deleteItem = async (id) => {
  await dataStore.deletItem(id);
};
</script>

<template>
  <div class="bg-white border-[1.5px] border-border rounded-xs overflow-hidden">
    <table class="w-full border-collapse">
      <thead>
        <tr>
          <th
            class="font-mono text-[0.7rem] uppercase tracking-[0.08em] text-muted px-4 py-3 text-left border-b-[1.5px] border-border"
          >
            Nama Barang
          </th>
          <th
            class="font-mono text-[0.7rem] uppercase tracking-[0.08em] text-muted px-4 py-3 text-left border-b-[1.5px] border-border"
          >
            Kategori
          </th>
          <th
            class="font-mono text-[0.7rem] uppercase tracking-[0.08em] text-muted px-4 py-3 text-left border-b-[1.5px] border-border"
          >
            Stok Saat Ini
          </th>

          <th
            class="font-mono text-[0.7rem] uppercase tracking-[0.08em] text-muted px-4 py-3 text-left border-b-[1.5px] border-border"
          >
            Status
          </th>
          <th
            class="font-mono text-[0.7rem] uppercase tracking-[0.08em] text-muted px-4 py-3 text-left border-b-[1.5px] border-border"
          >
            Aksi
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in dataStore.items"
          :key="item.id"
          class="hover:[&>td]:bg-cream"
        >
          <td
            class="px-4 py-3.5 border-b border-cream font-medium text-[0.9rem]"
          >
            {{ item.name }}
          </td>
          <td class="px-4 py-3.5 border-b border-cream text-[0.9rem]">
            <span
              class="font-mono text-[0.72rem] text-muted bg-cream px-1.5 py-0.5 rounded-[1px]"
              >{{ item.categories.name }}</span
            >
          </td>
          <td class="px-4 py-3.5 border-b border-cream">
            <span class="font-mono font-medium text-[0.9rem]">{{
              item.stock
            }}</span>
          </td>

          <td class="px-4 py-3.5 border-b border-cream">
            <span
              class="font-mono text-[0.7rem] px-2 py-0.5 rounded-[1px]"
              :class="{
                'bg-[#d4edda] text-success': item.stock > 5,
                'bg-[#fef9e7] text-warning': item.stock > 0 && item.stock <= 5,
                'bg-[#fde8e8] text-danger': item.stock === 0,
              }"
              >{{ statusLabel(item) }}</span
            >
          </td>
          <td class="px-4 py-3.5 border-b border-cream">
            <div class="flex gap-2">
              <button
                class="bg-transparent text-success border-[1.5px] border-success hover:bg-success hover:text-white px-3 py-1.5 font-mono text-[0.72rem] uppercase cursor-pointer rounded-xs transition-all duration-150"
                @click="openEditModal(item)"
              >
                Edit
              </button>
              <button
                class="bg-transparent text-danger border-[1.5px] border-danger hover:bg-danger hover:text-white px-3 py-1.5 font-mono text-[0.72rem] uppercase cursor-pointer rounded-xs transition-all duration-150"
                @click="deleteItem(item.id)"
              >
                Hapus
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <ModalEdit :form-props="form" v-model:show-modal="showModal" />
</template>
