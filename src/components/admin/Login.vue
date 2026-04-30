<script setup>
import { onMounted, ref } from "vue";
import { useAdminStore } from "../../stores/adminStore";

const adminStore = useAdminStore();

onMounted(async () => {
  await adminStore.cekSession();
});

const password = ref("");

const login = async (pw) => {
  await adminStore.login(pw);
};
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center"
    v-if="!adminStore.isLoggedIn"
  >
    <div class="w-full max-w-sm">
      <div class="bg-white border-[1.5px] border-border rounded-xs p-8">
        <div class="text-center mb-8">
          <div
            class="w-12 h-12 bg-accent rounded-xs flex items-center justify-center mx-auto mb-4"
          >
            <span class="font-mono text-base font-medium text-white">PB</span>
          </div>
          <h2 class="font-display font-extrabold text-2xl mb-1">Admin Panel</h2>
          <p class="font-mono text-[0.75rem] text-muted">
            masukkan password untuk lanjut
          </p>
        </div>
        <div class="flex flex-col gap-4">
          <div>
            <label
              class="font-mono text-[0.72rem] uppercase tracking-[0.08em] text-muted block mb-1.5"
              >Password</label
            >
            <input
              type="password"
              class="w-full border-[1.5px] border-border bg-white px-3.5 py-2.5 font-sans text-[0.9rem] rounded-xs outline-none transition-[border-color] duration-150 focus:border-accent placeholder:text-muted text-ink"
              placeholder="••••••••"
              v-model="password"
              @keyup.enter="login(password)"
            />
          </div>
          <p
            v-if="adminStore.isError"
            class="font-mono text-[0.75rem] text-danger"
          >
            password salah
          </p>
          <button
            class="w-full bg-accent hover:bg-accent-dark text-white border-none px-5 py-2.5 font-mono text-[0.78rem] uppercase tracking-[0.05em] cursor-pointer rounded-xs transition-all duration-150"
            @click="login(password)"
          >
            Masuk
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
