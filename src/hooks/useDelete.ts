import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showError, showSuccess } from "./useToast";
import { axiosInstance } from "@/lib/axiosInstance";

export const useDeleteStudent = () => {
  const query = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["delete-student"],
    mutationFn: async (id: string) => {
      const res = await axiosInstance.delete(`/student/${id}`,{
        withCredentials: true
      });
      return res.data;
    },
    onSuccess: () => {
      showSuccess("Siswa berhasil dihapus");
      query.invalidateQueries({ queryKey: ["students"] });
    },
    onError: () => {
      showError("Siswa gagal dihapus");
    },
  });
  return {
    mutation,
  };
};
export const useDeleteClass = () => {
  const query = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["delete-class"],
    mutationFn: async (id: string) => {
      const res = await axiosInstance.delete(`/class/${id}`,{
        withCredentials: true
      });
      return res.data;
    },
    onSuccess: () => {
      showSuccess("Kelas berhasil dihapus");
      query.invalidateQueries({ queryKey: ["classes"] });
    },
    onError: () => {
      showError("Kelas gagal dihapus");
    },
  });
  return {
    mutation,
  };
};
