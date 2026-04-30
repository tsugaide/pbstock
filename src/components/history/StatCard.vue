<script setup>
import { onMounted, computed, ref } from "vue";
import { useTakeStore } from "../../stores/takeStore";
const takeStore = useTakeStore();

onMounted(async () => {
  await takeStore.getTransactions();
});

const todayCount = computed(() => {
  const today = new Date().toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  return takeStore.transactionsData.filter((t) => {
    const tanggal = new Date(t.taken_at).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    return tanggal === today;
  }).length;
});
</script>

<template>
  <div class="grid grid-cols-3 gap-4 mb-8">
    <div class="bg-white border-[1.5px] border-border rounded-sm p-5">
      <p
        class="font-mono text-[0.68rem] text-muted uppercase tracking-[0.08em] mb-2"
      >
        Total Transaksi
      </p>
      <div class="font-display text-[2rem] font-extrabold leading-none">
        {{ takeStore.transactionsData.length }}
      </div>
    </div>
    <div class="bg-white border-[1.5px] border-border rounded-sm p-5">
      <p
        class="font-mono text-[0.68rem] text-muted uppercase tracking-[0.08em] mb-2"
      >
        Hari Ini
      </p>
      <div
        class="font-display text-[2rem] font-extrabold leading-none text-accent"
      >
        {{ todayCount }}
      </div>
    </div>
  </div>
</template>
