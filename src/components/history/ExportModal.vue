<template>
  <Transition name="fade">
    <div
      v-if="showModal"
      class="fixed inset-0 bg-ink/60 z-500 flex items-center justify-center p-4"
      @click.self="$emit('close')"
    >
      <div class="bg-paper border border-border rounded-sm w-full max-w-sm p-6">
        <!-- Header -->
        <div class="flex items-center justify-between mb-6">
          <div>
            <p
              class="font-mono text-[0.68rem] tracking-widest uppercase text-muted mb-0.5"
            >
              Export
            </p>
            <h2 class="font-display text-xl font-bold">Unduh Data</h2>
          </div>
          <button
            @click="$emit('close')"
            class="text-muted hover:text-ink transition-colors bg-transparent border-0 text-xl cursor-pointer"
          >
            ✕
          </button>
        </div>

        <!-- Form -->
        <div class="flex flex-col gap-4">
          <div>
            <label
              class="font-mono text-[0.7rem] tracking-widest uppercase text-muted block mb-1.5"
              >Bulan</label
            >
            <select
              v-model="selectedMonth"
              class="w-full border border-border bg-white px-3 py-2.5 text-sm rounded-sm outline-none focus:border-accent transition-colors text-ink"
            >
              <option v-for="(name, idx) in months" :key="idx" :value="idx + 1">
                {{ name }}
              </option>
            </select>
          </div>

          <div>
            <label
              class="font-mono text-[0.7rem] tracking-widest uppercase text-muted block mb-1.5"
              >Tahun</label
            >
            <select
              v-model="selectedYear"
              class="w-full border border-border bg-white px-3 py-2.5 text-sm rounded-sm outline-none focus:border-accent transition-colors text-ink"
            >
              <option v-for="year in years" :key="year" :value="year">
                {{ year }}
              </option>
            </select>
          </div>

          <!-- Preview jumlah data -->
          <div class="bg-cream border border-border rounded-sm px-4 py-3">
            <p
              class="font-mono text-[0.68rem] text-muted tracking-wide uppercase mb-0.5"
            >
              Data ditemukan
            </p>
            <p class="font-display text-2xl font-extrabold leading-none">
              {{ filteredCount }}
              <span class="font-mono text-sm font-normal text-muted"
                >transaksi</span
              >
            </p>
          </div>

          <button
            @click="download"
            :disabled="filteredCount === 0"
            class="w-full bg-accent hover:bg-accent-hover text-white font-mono text-xs tracking-widest uppercase py-3 rounded-sm transition-all cursor-pointer disabled:bg-muted disabled:cursor-not-allowed"
          >
            ↓ Unduh Data Excel
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed } from "vue";
import * as XLSX from "xlsx";

const props = defineProps({
  showModal: Boolean,
  transactions: Array,
});

const emit = defineEmits(["close"]);

const now = new Date();
const selectedMonth = ref(now.getMonth() + 1);
const selectedYear = ref(now.getFullYear());

const months = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const years = computed(() => {
  const current = now.getFullYear();
  return Array.from({ length: 4 }, (_, i) => current - i);
});

const filtered = computed(() =>
  props.transactions.filter((tx) => {
    const d = new Date(tx.taken_at);
    return (
      d.getMonth() + 1 === selectedMonth.value &&
      d.getFullYear() === selectedYear.value
    );
  }),
);

const filteredCount = computed(() => filtered.value.length);

const download = () => {
  const rows = filtered.value.map((tx) => ({
    Nama: tx.person_name,
    Barang: tx.items.name,
    Jumlah: `${tx.qty} ${tx.satuan}`,
    Jam: new Date(tx.taken_at).toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    Tanggal: new Date(tx.taken_at).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    Keperluan: tx.keperluan,
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Riwayat");

  const filename = `riwayat-${months[selectedMonth.value - 1].toLowerCase()}-${selectedYear.value}.xlsx`;
  XLSX.writeFile(workbook, filename);

  emit("close");
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
