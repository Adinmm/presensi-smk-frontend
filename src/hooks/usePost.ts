import { axiosInstance } from "@/lib/axiosInstance";
import { Attendences, Classes, Students } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import { showError, showSuccess } from "./useToast";
import { useCookies } from "react-cookie";

export const useCreateStudent = () => {
  const mutation = useMutation({
    mutationKey: ["create-student"],
    mutationFn: async (data: Students) => {
      const res = await axiosInstance.post("/student", data, {
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: async () => {
      showSuccess(" Siswa berhasil ditambahkan", true);
    },
    onError: () => {
      showError("Siswa gagal ditambahkan");
    },
  });
  return { mutation };
};
export const useCreateClass = () => {
  const mutation = useMutation({
    mutationKey: ["create-class"],
    mutationFn: async (data: Classes) => {
      const res = await axiosInstance.post("/class", data, {
        withCredentials: true,
      });
      return res.data;
    },

    onSuccess: async () => {
      showSuccess(" Kelas berhasil ditambahkan", true);
    },
    onError: () => {
      showError("Kelas gagal ditambahkan");
    },
  });
  return { mutation };
};

export const useCreateAttendence = () => {
  const mutation = useMutation({
    mutationKey: ["create-attendence"],
    mutationFn: async (data: Attendences[]) => {
      const res = await axiosInstance.post("/attendance", data, {
        withCredentials: true,
      });
      return res.data;
    },

    onSuccess: async () => {
      showSuccess(" Presensi berhasil ditambahkan");
    },
    onError: (err: any) => {
      showError(err.response.data.message);
    },
  });
  return { mutation };
};

export const useLogin = () => {
  const [cookies, setCookie] = useCookies(["role"]);
  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: { email: string; password: string }) => {
      const res = await axiosInstance.post("/login", data, {
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: (data) => {
      setCookie("role", data.data.role, {
        path: "/",
        sameSite: "lax",
      });

      showSuccess("Berhasil login", false, "/");
    },
    onError: () => {
      showError("Gagal login");
    },
  });
  return { mutation };
};

export const useLogOut = () => {
  const [, , removeCookie] = useCookies(["role"]);
  const mutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      const res = await axiosInstance.post("/logout",{}, {
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: () => {
      showSuccess("Berhasil logout", false, "/login");
      removeCookie("role", { path: "/" });
    },
    onError: (err: any) => {
      showError("Gagal logout");
      console.log(err.response);
    },
  });
  return { mutation };
};
