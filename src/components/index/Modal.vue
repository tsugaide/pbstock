<script setup>
import { ref, computed } from "vue";
import { useDataStore } from "../../stores/dataStore";
import { useTakeStore } from "../../stores/takeStore";

const dataStore = useDataStore();
const takeStore = useTakeStore();

const props = defineProps({
  form: Object,
  showModal: Boolean,
});

const selectedItemStock = computed(() => {
  const item = dataStore.items.find((i) => i.id === props.form.itemId);
  return item ? item.stock : 0;
});

const selectedItemName = computed(() => {
  const item = dataStore.items.find((i) => i.id === props.form.itemId);
  return item ? item.name : "";
});

const canSubmit = computed(() => {
  return (
    props.form.nama.trim() &&
    props.form.itemId &&
    props.form.jumlah > 0 &&
    props.form.jumlah <= selectedItemStock.value &&
    props.form.keperluan.trim()
  );
});

const emit = defineEmits(["closeModal"]);

const closeModal = () => {
  emit("closeModal", false);
};

const toast = ref({ show: false, message: "", type: "" });

const showToast = (message, type = "") => {
  toast.value = { show: true, message, type };
  setTimeout(() => {
    toast.value.show = false;
  }, 3000);
};

const submitAmbil = async () => {
  if (!canSubmit.value) return;
  await takeStore.take(
    props.form.nama,
    props.form.itemId,
    props.form.jumlah,
    props.form.satuan,
    props.form.keperluan,
  );
  showToast(
    `${props.form.jumlah} ${props.form.satuan} ${selectedItemName.value} berhasil diambil`,
    takeStore.isError ? "error" : "success",
  );
  closeModal();
  await dataStore.getItems();
};
</script>

<template>
  <div>
    <transition name="fade">
      <div
        v-if="showModal"
        class="fixed inset-0 bg-[rgba(15,14,13,0.6)] z-500 flex items-center justify-center p-4"
        @click.self="closeModal"
      >
        <div
          class="bg-paper border border-border rounded-sm w-full max-w-110 p-8"
        >
          <div class="flex items-center justify-between mb-6">
            <h2 class="font-display text-xl font-bold">Ambil Barang</h2>
            <button
              @click="closeModal"
              class="bg-transparent border-none cursor-pointer text-muted text-xl leading-none"
            >
              ✕
            </button>
          </div>

          <div class="flex flex-col gap-4">
            <div>
              <label
                class="font-mono text-[0.72rem] uppercase tracking-widest text-muted block mb-1.5"
                >Nama Kamu</label
              >
              <input
                type="text"
                class="border border-border bg-white px-3.5 py-2.5 font-body text-sm rounded-sm w-full outline-none transition-colors focus:border-accent placeholder:text-muted text-ink"
                placeholder="Masukkan nama kamu"
                v-model="form.nama"
              />
            </div>
            <div>
              <label
                class="font-mono text-[0.72rem] uppercase tracking-widest text-muted block mb-1.5"
                >Barang</label
              >
              <select
                class="border border-border bg-white px-3.5 py-2.5 font-body text-sm rounded-sm w-full outline-none transition-colors focus:border-accent text-ink"
                v-model="form.itemId"
              >
                <option value="">— pilih barang —</option>
                <option
                  v-for="item in dataStore.items.filter((i) => i.stock > 0)"
                  :key="item.id"
                  :value="item.id"
                >
                  {{ item.name }} (stok: {{ item.stock }})
                </option>
              </select>
            </div>

            <!-- Jumlah + Satuan -->
            <div>
              <label
                class="font-mono text-[0.72rem] uppercase tracking-widest text-muted block mb-1.5"
                >Jumlah & Satuan</label
              >
              <div class="flex gap-2">
                <input
                  type="number"
                  class="border border-border bg-white px-3.5 py-2.5 font-body text-sm rounded-sm w-full outline-none transition-colors focus:border-accent placeholder:text-muted text-ink"
                  placeholder="0"
                  min="1"
                  :max="selectedItemStock"
                  v-model.number="form.jumlah"
                />
                <select
                  class="border border-border bg-white px-3.5 py-2.5 font-body text-sm rounded-sm outline-none transition-colors focus:border-accent text-ink shrink-0"
                  v-model="form.satuan"
                >
                  <option value="PCS">PCS</option>
                  <option value="PACK">PACK</option>
                  <option value="RIM">RIM</option>
                  <option value="ROLL">ROLL</option>
                </select>
              </div>
              <p
                v-if="form.itemId"
                class="font-mono text-[0.72rem] text-muted mt-1.5"
              >
                maks. {{ selectedItemStock }} tersedia
              </p>
            </div>

            <!-- Keperluan -->
            <div>
              <label
                class="font-mono text-[0.72rem] uppercase tracking-widest text-muted block mb-1.5"
                >Keperluan</label
              >
              <textarea
                class="border border-border bg-white px-3.5 py-2.5 font-body text-sm rounded-sm w-full outline-none transition-colors focus:border-accent placeholder:text-muted text-ink resize-none"
                placeholder="Tulis keperluan pengambilan barang..."
                rows="3"
                v-model="form.keperluan"
              />
            </div>

            <div
              v-if="form.nama && form.itemId && form.jumlah > 0"
              class="bg-cream border border-border rounded-sm p-3.5"
            >
              <p
                class="font-mono text-[0.72rem] text-muted mb-1 uppercase tracking-widest"
              >
                Ringkasan
              </p>
              <p class="text-sm">
                <strong>{{ form.nama }}</strong> mengambil
                <strong
                  >{{ form.jumlah }} {{ form.satuan }}
                  {{ selectedItemName }}</strong
                >
              </p>
              <p v-if="form.keperluan" class="text-sm text-muted mt-1">
                untuk: {{ form.keperluan }}
              </p>
            </div>

            <button
              @click="submitAmbil"
              :disabled="!canSubmit"
              class="w-full bg-accent hover:bg-accent-dark text-white font-mono text-[0.78rem] uppercase tracking-wide py-2.5 rounded-sm cursor-pointer transition-all hover:-translate-y-px active:translate-y-0 border-none disabled:bg-muted disabled:cursor-not-allowed disabled:translate-y-0 mt-2"
            >
              Konfirmasi Pengambilan
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>

  <transition name="fade">
    <div
      v-if="toast.show"
      class="toast-anim fixed bottom-8 right-8 text-white px-5 py-3 rounded-sm font-mono text-[0.8rem] z-1000"
      :class="{
        'bg-success': toast.type === 'success',
        'bg-danger': toast.type === 'error',
        'bg-ink': !toast.type,
      }"
    >
      {{ toast.message }}
    </div>
  </transition>
</template>
