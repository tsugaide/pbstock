import { defineStore } from "pinia";
import { supabase } from "../lib/supabase";
import { ref } from "vue";

export const useDataStore = defineStore("data", () => {
  const items = ref([]);
  const categories = ref([]);

  const getItems = async () => {
    const { data, error } = await supabase.from("items").select(`
    *,
    categories (
      name
    )
  `);
    items.value = data;
  };

  const getCategories = async () => {
    const { data, error } = await supabase.from("categories").select("*");

    categories.value = data;
  };

  const addItem = async (name, category, stock) => {
    const { data, error } = await supabase.from("items").insert({
      name: name,
      category: category,
      stock: stock,
    });

    if (error) console.error(error);
  };

  const editItem = async (name, category, stock, id) => {
    const { data, error } = await supabase
      .from("items")
      .update({
        name: name,
        category: category,
        stock: stock,
      })
      .eq("id", id);

    if (error) console.error(error);
  };

  const increaseItem = async (amount, stock, id) => {
    const { data, error } = await supabase
      .from("items")
      .update({
        stock: amount + stock,
      })
      .eq("id", id)
      .select();

    if (!error) {
      const idx = items.value.findIndex((i) => i.id == id);
      items.value[idx] = data[0];
    }
  };

  const deletItem = async (id) => {
    const { data, error } = await supabase.from("items").delete().eq("id", id);
    if (!error) {
      items.value = items.value.filter((i) => i.id !== id);
    }
  };

  const addCategory = async (name) => {
    const { data, error } = await supabase.from("categories").insert({
      name: name,
    });
  };

  return {
    items,
    getItems,
    getCategories,
    categories,
    addItem,
    editItem,
    increaseItem,
    deletItem,
    addCategory,
  };
});
