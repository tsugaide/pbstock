<script setup>
import { ref } from "vue";
import { useDataStore } from "../../stores/dataStore";

const dataStore = useDataStore();

const topupAmounts = ref({});

const doTopup = async (item) => {
  const amount = topupAmounts.value[item.id] || 1;
  await dataStore.increaseItem(amount, item.stock, item.id);
  topupAmounts.value[item.id] = 1;
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
            Stok Sekarang
          </th>
          <th
            class="font-mono text-[0.7rem] uppercase tracking-[0.08em] text-muted px-4 py-3 text-left border-b-[1.5px] border-border"
          >
            Tambah Stok
          </th>
          <th class="border-b-[1.5px] border-border"></th>
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
          <td class="px-4 py-3.5 border-b border-cream">
            <span class="font-mono font-medium">{{ item.stock }}</span>
          </td>
          <td class="px-4 py-3.5 border-b border-cream">
            <div class="stepper">
              <button
                class="stepper-btn"
                @click="
                  topupAmounts[item.id] = Math.max(
                    1,
                    (topupAmounts[item.id] || 1) - 1,
                  )
                "
              >
                −
              </button>
              <input
                type="number"
                class="stepper-val"
                :value="topupAmounts[item.id] || 1"
                @input="topupAmounts[item.id] = +$event.target.value"
                min="1"
              />
              <button
                class="stepper-btn"
                @click="
                  topupAmounts[item.id] = (topupAmounts[item.id] || 1) + 1
                "
              >
                +
              </button>
            </div>
          </td>
          <td class="px-4 py-3.5 border-b border-cream">
            <button
              class="bg-accent hover:bg-accent-dark text-white border-none px-3.5 py-1.5 font-mono text-[0.72rem] uppercase tracking-[0.05em] cursor-pointer rounded-xs transition-all duration-150"
              @click="doTopup(item)"
            >
              Top-up
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style lang="css" scoped>
.stepper {
  display: flex;
  align-items: center;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-base);
  overflow: hidden;
  width: fit-content;
}
.stepper-btn {
  width: 32px;
  height: 32px;
  background: var(--color-cream);
  border: none;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;
}
.stepper-btn:hover {
  background: var(--color-border);
}
.stepper-val {
  width: 48px;
  text-align: center;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  border: none;
  outline: none;
  background: white;
  padding: 0 0.25rem;
  height: 32px;
}
</style>
