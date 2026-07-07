import { axiosInstance } from "@/lib/axiosInstance";
import {
  ApiResponseRekapAbsensi,
  Attendences,
  Classes,
  DashboardResponseData,
  Pagination,
  Response,
  Students,
} from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export const useGetClass = (kelas?: string) => {
  if (kelas === "all") kelas = "";
  const { data, isLoading, isError, error } = useQuery<Response<Classes[]>>({
    queryKey: ["classes", kelas],
    queryFn: async () => {
      const res = await axiosInstance.get(`/classes?kelas=${kelas}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      return res.data;
    },
  });
  return {
    data,
    isLoading,
    isError,
    error,
  };
};
export const useGetGeneralClass = () => {
  const { data, isLoading, isError } = useQuery<Response<Classes[]>>({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/classes/general`, {
        withCredentials: true,
      });
      return res.data;
    },
  });
  return {
    data,
    isLoading,
    isError,
  };
};
export const useGetStudents = (
  page: number,
  kelas: string,
  search: string,
  perPage: number,
) => {
  const classs = kelas === "all" ? "" : kelas;
  const { data, isLoading, error, isError } = useQuery<
    Response<{ items: Students[]; pagination: Pagination }>
  >({
    queryKey: ["students", page, kelas, search, perPage],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/students?page=${page}&kelas=${classs}&search=${search}&per_page=${perPage}`,
        {
          withCredentials: true,
        },
      );
      return res.data;
    },
  });
  return {
    data,
    isLoading,
    error,
    isError,
  };
};

export const useGetAttendanceHistory = (
  kelas: string,
  status: string,
  tanggal: string,
) => {
  if (kelas === "all") kelas = "";
  if (status === "all") status = "";
  const { data, isLoading, error, isError } = useQuery<Response<Attendences[]>>(
    {
      queryKey: ["attendance-history", kelas, status, tanggal],
      queryFn: async () => {
        const res = await axiosInstance.get(
          `/attendances?kelas=${kelas}&status=${status}&tanggal=${tanggal}`,
          {
            withCredentials: true,
          },
        );
        return res.data;
      },
    },
  );
  return {
    data,
    isLoading,
    error,
    isError,
  };
};

export const useGetReports = (kelas: string, tanggal: string) => {
  if (kelas === "all") kelas = "";
  if (kelas === "loading") kelas = "";
  const { data, isLoading, isError } = useQuery<
    Response<ApiResponseRekapAbsensi>
  >({
    queryKey: ["reports", kelas, tanggal],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/reports?kelas=${kelas}&tanggal=${tanggal}`,
        {
          withCredentials: true,
        },
      );
      return res.data;
    },
  });
  return {
    data,
    isLoading,
    isError,
  };
};

export const useGetDashboard = (tanggal: string) => {
  const { data, isLoading, isError } = useQuery<
    Response<DashboardResponseData>
  >({
    queryKey: ["dashboard", tanggal],
    queryFn: async () => {
      const res = await axiosInstance.get(`/dashboard?tanggal=${tanggal}`, {
        withCredentials: true,
      });
      return res.data;
    },
  });
  return {
    data,
    isLoading,
    isError,
  };
};

export const useGetAllData = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["all-data"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/backup-data`, {
        withCredentials: true,
      });
      return res.data;
    },
  });
  return {
    data,
    isLoading,
  };
};

export const useGetMe = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/me`, {
        withCredentials: true,
      });
      return res.data;
    },
  });
  return {
    data,
    isLoading,
  };
};
