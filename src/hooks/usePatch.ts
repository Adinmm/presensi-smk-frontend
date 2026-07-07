import { axiosInstance } from "@/lib/axiosInstance";
import { Classes, Students } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showError, showSuccess } from "./useToast";

export const useUpdateStudent = () => {
  const mutation = useMutation({
    mutationKey: ["update-student"],
    mutationFn: async (data: Students) => {
      const { class_id, id, ...rest } = data;
      const res = await axiosInstance.patch(`/student/${data.id}`, rest);
      return res.data;
    },
    onSuccess: () => {
      showSuccess("Siswa berhasil diubah", true);
    },
    onError: () => {
      showError("Siswa gagal diubah");
    },
  });

  return {
    mutation,
  };
};

export const useUpdateClass = () => {
  const mutation = useMutation({
    mutationKey: ["update-class"],
    mutationFn: async (data: Classes) => {
      const { id, students, ...rest } = data;
      const res = await axiosInstance.patch(`/class/${data.id}`, rest,{
        withCredentials: true
      });
      return res.data;
    },
    onSuccess: () => {
      showSuccess("Kelas berhasil diubah", true);
    },
    onError: (err: any) => {
      showError("Kelas gagal diubah");
    },
  });
  return {
    mutation,
  };
};

export const useUpdateStatus = () => {
  const query = useQueryClient()
  const mutation = useMutation({
    mutationKey: ["update-status-kehadiran"],
    mutationFn: async (data: { status: string; id: string }) => {
      const res = await axiosInstance.patch(`/attendance/${data.id}`, {
        status: data.status,
      },{
        withCredentials: true
      });
      return res.data;
    },
    onSuccess: () => {
      showSuccess("Status kehadiran berhasil diubah");
      query.invalidateQueries({ queryKey: ["attendance-history"] });
    },
    onError: (err: any) => {
      showError("Status kehadiran gagal diubah");
    
      
    },
  });
  return {
    mutation,
  };
};

export const useChangePassword = ()=>{
  const mutation = useMutation({
    mutationKey: ["change-password"],
    mutationFn: async (data: { password: string, password_confirmation: string }) => {
      const res = await axiosInstance.patch(`/reset-password`, data, {
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: () => {
      showSuccess("Password berhasil diubah", true);
    },
    onError: (err: any) => {
      showError("Password gagal diubah");
   
      
    },
  });
  return {
    mutation,
  };
}