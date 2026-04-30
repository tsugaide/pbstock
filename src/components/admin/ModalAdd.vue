<script setup>
import { ref } from "vue";
import { useDataStore } from "../../stores/dataStore";

const dataStore = useDataStore();

const props = defineProps({
  showModal: Boolean,
});

const emit = defineEmits(["update:showModal"]);

const form = ref({ name: "", category: "", stock: 0 });

const saveItem = async () => {
  await dataStore.addItem(
    form.value.name,
    form.value.category,
    form.value.stock,
  );

  await dataStore.getItems();
  emit("update:showModal", false);
};
</script>

<template>
  <div>
    <transition name="fade">
      <div
        class="fixed inset-0 bg-ink/60 z-500 flex items-center justify-center p-4"
        v-if="showModal"
        @click.self="emit('update:showModal', false)"
      >
        <div
          class="bg-paper border-[1.5px] border-border rounded-xs w-full max-w-sm p-8"
        >
          <div class="flex items-center justify-between mb-6">
            <h2 class="font-display font-bold text-xl">Tambah Barang Baru</h2>
            <button
              @click="emit('update:showModal', false)"
              class="bg-transparent border-none cursor-pointer text-muted text-xl leading-none"
            >
              ✕
            </button>
          </div>
          <div class="flex flex-col gap-4">
            <div>
              <label
                class="font-mono text-[0.72rem] uppercase tracking-[0.08em] text-muted block mb-1.5"
                >Nama Barang</label
              >
              <input
                type="text"
                class="w-full border-[1.5px] border-border bg-white px-3.5 py-2.5 font-sans text-[0.9rem] rounded-xs outline-none transition-[border-color] duration-150 focus:border-accent placeholder:text-muted text-ink"
                placeholder="contoh: Kertas A4"
                v-model="form.name"
              />
            </div>
            <div>
              <label
                class="font-mono text-[0.72rem] uppercase tracking-[0.08em] text-muted block mb-1.5"
                >Kategori</label
              >
              <select
                class="w-full border-[1.5px] border-border bg-white px-3.5 py-2.5 font-sans text-[0.9rem] rounded-xs outline-none transition-[border-color] duration-150 focus:border-accent text-ink"
                v-model="form.category"
              >
                <option value="">— pilih kategori —</option>
                <option
                  v-for="cat in dataStore.categories"
                  :key="cat"
                  :value="cat.id"
                >
                  {{ cat.name }}
                </option>
              </select>
            </div>
            <div class="grid grid-cols-3 gap-3">
              <div>
                <label
                  class="font-mono text-[0.72rem] uppercase tracking-[0.08em] text-muted block mb-1.5"
                  >Stok</label
                >
                <input
                  type="number"
                  class="w-full border-[1.5px] border-border bg-white px-3.5 py-2.5 font-sans text-[0.9rem] rounded-xs outline-none transition-[border-color] duration-150 focus:border-accent text-ink"
                  placeholder="0"
                  v-model.number="form.stock"
                  min="0"
                />
              </div>
            </div>
            <button
              class="mt-2 bg-accent hover:bg-accent-dark disabled:opacity-50 disabled:cursor-not-allowed text-white border-none px-5 py-2.5 font-mono text-[0.78rem] uppercase tracking-[0.05em] cursor-pointer rounded-xs transition-all duration-150"
              @click="saveItem"
              :disabled="!form.name || !form.category"
            >
              Tambah Barang
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
