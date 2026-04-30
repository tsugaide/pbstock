<script setup>
const today = new Intl.DateTimeFormat("id-ID", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
}).format(new Date());
</script>
<template>
  <div class="flex items-start justify-between mb-8">
    <div>
      <p
        class="font-mono text-[0.72rem] text-muted uppercase tracking-widest mb-1"
      >
        {{ today }}
      </p>
      <h1
        class="font-display text-4xl font-extrabold tracking-tight leading-none"
      >
        Stok Barang
      </h1>
    </div>
  </div>
</template>
