<script setup>
import { onMounted, ref } from "vue";
import { useDataStore } from "../../stores/dataStore";

const dataStore = useDataStore();

onMounted(async () => {
  await dataStore.getCategories();
});

const newCategory = ref("");

const addCategory = async () => {
  if (newCategory.value == "") {
    return;
  }
  await dataStore.addCategory(newCategory.value);
  await dataStore.getCategories();
  newCategory.value = "";
};
</script>

<template>
  <div class="grid gap-4" style="grid-template-columns: 1fr 2fr">
    <div class="bg-white border-[1.5px] border-border rounded-xs p-5">
      <h3
        class="font-mono text-[0.75rem] uppercase tracking-[0.06em] text-muted mb-4"
      >
        Tambah Kategori
      </h3>
      <div class="flex flex-col gap-3">
        <div>
          <label
            class="font-mono text-[0.72rem] uppercase tracking-[0.08em] text-muted block mb-1.5"
            >Nama Kategori</label
          >
          <input
            type="text"
            class="w-full border-[1.5px] border-border bg-white px-3.5 py-2.5 font-sans text-[0.9rem] rounded-xs outline-none transition-[border-color] duration-150 focus:border-accent placeholder:text-muted text-ink"
            placeholder="contoh: Elektronik"
            v-model="newCategory"
          />
        </div>
        <button
          class="bg-accent hover:bg-accent-dark text-white border-none px-5 py-2.5 font-mono text-[0.78rem] uppercase tracking-[0.05em] cursor-pointer rounded-xs transition-all duration-150"
          @click="addCategory"
        >
          Tambah
        </button>
      </div>
    </div>
    <div class="bg-white border-[1.5px] border-border rounded-xs p-5">
      <h3
        class="font-mono text-[0.75rem] uppercase tracking-[0.06em] text-muted mb-4"
      >
        Daftar Kategori
      </h3>
      <div class="flex flex-col gap-2">
        <div
          v-for="cat in dataStore.categories"
          :key="cat"
          class="flex items-center justify-between bg-cream px-3 py-2 rounded-xs"
        >
          <span class="font-mono text-[0.85rem]">{{ cat.name }}</span>
          <!-- <button
            class="bg-transparent text-danger border-[1.5px] border-danger hover:bg-danger hover:text-white px-2.5 py-1 font-mono text-[0.68rem] uppercase cursor-pointer rounded-xs transition-all duration-150"
            @click="deleteCategory(cat)"
          >
            Hapus
          </button> -->
        </div>
      </div>
    </div>
  </div>
</template>
