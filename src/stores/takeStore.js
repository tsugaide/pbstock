import { defineStore } from "pinia";
import { supabase } from "../lib/supabase";
import { ref } from "vue";

export const useTakeStore = defineStore("take", () => {
  const isError = ref(false);
  const transactionsData = ref([]);
  const take = async (personName, itemId, qty, satuan, keperluan) => {
    const { error: txError } = await supabase.rpc("take_stuff", {
      p_person_name: personName,
      p_item_id: itemId,
      p_qty: qty,
      p_satuan: satuan,
      p_keperluan: keperluan,
    });

    if (txError) {
      isError.value = true;
      console.error(txError);
    }
  };

  const getTransactions = async () => {
    const { data, error } = await supabase
      .from("transactions")
      .select(`*, items(name)`)
      .order("taken_at", { ascending: false });

    transactionsData.value = data;
  };

  return {
    take,
    isError,
    getTransactions,
    transactionsData,
  };
});
