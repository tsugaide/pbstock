<script setup>
const props = defineProps({
  paginatedItems: Array,
  filteredTx: Array,
  currentPage: Number,
});

const strColor = (str) => {
  const colors = [
    "#d4522a",
    "#3a7d52",
    "#c49a1a",
    "#3b82f6",
    "#8b5cf6",
    "#ec4899",
    "#0891b2",
    "#65a30d",
  ];
  let h = 0;
  for (let c of str) h = (h * 31 + c.charCodeAt(0)) % colors.length;
  return colors[h];
};
</script>

<template>
  <div
    class="bg-white border-[1.5px] border-border rounded-sm overflow-hidden mb-4"
  >
    <table class="w-full border-collapse">
      <thead>
        <tr>
          <th
            class="font-mono text-[0.7rem] uppercase tracking-[0.08em] text-muted px-4 py-3 text-left border-b-[1.5px] border-border"
          >
            #
          </th>
          <th
            class="font-mono text-[0.7rem] uppercase tracking-[0.08em] text-muted px-4 py-3 text-left border-b-[1.5px] border-border"
          >
            Nama
          </th>
          <th
            class="font-mono text-[0.7rem] uppercase tracking-[0.08em] text-muted px-4 py-3 text-left border-b-[1.5px] border-border"
          >
            Barang
          </th>
          <th
            class="font-mono text-[0.7rem] uppercase tracking-[0.08em] text-muted px-4 py-3 text-left border-b-[1.5px] border-border"
          >
            Jumlah
          </th>
          <th
            class="font-mono text-[0.7rem] uppercase tracking-[0.08em] text-muted px-4 py-3 text-left border-b-[1.5px] border-border"
          >
            Waktu
          </th>
          <th
            class="font-mono text-[0.7rem] uppercase tracking-[0.08em] text-muted px-4 py-3 text-left border-b-[1.5px] border-border"
          >
            Tanggal
          </th>
          <th
            class="font-mono text-[0.7rem] uppercase tracking-[0.08em] text-muted px-4 py-3 text-left border-b-[1.5px] border-border"
          >
            Keperluan
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(tx, idx) in paginatedItems"
          :key="tx.id"
          class="hover:[&>td]:bg-cream"
        >
          <td class="px-4 py-3.5 border-b border-cream last:border-b-0">
            <span class="font-mono text-[0.75rem] text-muted">{{
              (currentPage - 1) * 12 + idx + 1
            }}</span>
          </td>
          <td class="px-4 py-3.5 border-b border-cream last:border-b-0">
            <div class="flex items-center gap-2">
              <div
                class="w-7 h-7 rounded-full flex items-center justify-center font-mono text-[0.7rem] font-medium text-white shrink-0"
                :style="{ background: strColor(tx.person_name) }"
              >
                {{ tx.person_name.charAt(0).toUpperCase() }}
              </div>
              <span class="font-medium">{{ tx.person_name }}</span>
            </div>
          </td>
          <td
            class="px-4 py-3.5 border-b border-cream last:border-b-0 text-[0.9rem]"
          >
            {{ tx.items.name }}
          </td>
          <td class="px-4 py-3.5 border-b border-cream last:border-b-0">
            <span class="font-mono font-medium text-accent"
              >{{ tx.qty }} {{ tx.satuan }}</span
            >
          </td>
          <td class="px-4 py-3.5 border-b border-cream last:border-b-0">
            <span class="font-mono text-[0.8rem] text-muted">{{
              new Date(tx.taken_at).toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
              })
            }}</span>
          </td>
          <td class="px-4 py-3.5 border-b border-cream last:border-b-0">
            <span class="font-mono text-[0.8rem]">{{
              new Date(tx.taken_at).toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            }}</span>
          </td>
          <td class="px-4 py-3.5 border-b border-cream last:border-b-0">
            <span class="font-mono font-medium">{{ tx.keperluan }}</span>
          </td>
        </tr>
        <tr v-if="filteredTx.length === 0">
          <td
            colspan="6"
            class="text-center text-muted py-12 font-mono text-[0.8rem]"
          >
            tidak ada transaksi ditemukan
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
