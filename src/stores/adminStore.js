import { defineStore } from "pinia";
import { supabase } from "../lib/supabase";
import { ref } from "vue";

export const useAdminStore = defineStore("admin", () => {
  const isLoggedIn = ref(false);
  const isError = ref(false);

  const login = async (password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: "admin@pb.com",
      password: password,
    });

    if (error) {
      isError.value = true;
      isLoggedIn.value = false;
      return;
    }

    isLoggedIn.value = true;
    console.log(isLoggedIn.value);
  };

  const logOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (!error) {
      isLoggedIn.value = false;
    }
  };

  const cekSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  };

  return {
    isLoggedIn,
    isError,
    login,
    cekSession,
    logOut,
  };
});
