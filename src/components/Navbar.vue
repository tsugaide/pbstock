<script setup></script>

<template>
  <nav class="border-b border-border bg-paper sticky top-0 z-100">
    <div class="max-w-6xl mx-auto px-6">
      <div class="flex items-center justify-between h-14">
        <div class="flex items-center gap-3">
          <div
            class="w-7 h-7 bg-accent rounded-sm flex items-center justify-center"
          >
            <span class="text-white font-mono text-[0.7rem] font-medium"
              >PB</span
            >
          </div>
          <span class="font-display font-bold text-base tracking-tight"
            >Stok</span
          >
        </div>
        <div class="flex items-center gap-6">
          <a
            href="/"
            class="font-mono text-[0.78rem] uppercase tracking-widest border-b-2 hover:text-ink transition-colors"
            :class="[
              $route.path == '/'
                ? 'text-accent border-accent'
                : 'text-muted border-transparent',
            ]"
            >Dashboard</a
          >
          <a
            href="/history"
            class="font-mono text-[0.78rem] uppercase tracking-widest border-b-2 hover:text-ink transition-colors"
            :class="[
              $route.path == '/history'
                ? 'text-accent border-accent'
                : 'text-muted border-transparent',
            ]"
            >Riwayat</a
          >
          <a
            href="/admin"
            class="font-mono text-[0.78rem] uppercase tracking-widest border-b-2 hover:text-ink transition-colors"
            :class="[
              $route.path == '/admin'
                ? 'text-accent border-accent'
                : 'text-muted border-transparent',
            ]"
            >Admin</a
          >
        </div>
      </div>
    </div>
  </nav>
</template>
