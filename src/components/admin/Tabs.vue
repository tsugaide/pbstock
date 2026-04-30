<script setup>
import { ref } from "vue";

const tab = ref("barang");

const emit = defineEmits(["switchTab"]);

const switchTab = (t) => {
  tab.value = t;
  emit("switchTab", t);
};
</script>

<template>
  <div>
    <div class="border-b-[1.5px] border-border mb-6">
      <button
        class="font-mono text-[0.78rem] px-4 py-2 border-none bg-transparent cursor-pointer uppercase tracking-[0.04em] border-b-2 transition-all duration-150"
        :class="
          tab === 'barang'
            ? 'text-accent border-accent'
            : 'text-muted border-transparent'
        "
        @click="switchTab('barang')"
      >
        Daftar Barang
      </button>
      <button
        class="font-mono text-[0.78rem] px-4 py-2 border-none bg-transparent cursor-pointer uppercase tracking-[0.04em] border-b-2 transition-all duration-150"
        :class="
          tab === 'topup'
            ? 'text-accent border-accent'
            : 'text-muted border-transparent'
        "
        @click="switchTab('topup')"
      >
        Top-up Stok
      </button>
      <button
        class="font-mono text-[0.78rem] px-4 py-2 border-none bg-transparent cursor-pointer uppercase tracking-[0.04em] border-b-2 transition-all duration-150"
        :class="
          tab === 'kategori'
            ? 'text-accent border-accent'
            : 'text-muted border-transparent'
        "
        @click="switchTab('kategori')"
      >
        Kategori
      </button>
    </div>
  </div>
</template>
