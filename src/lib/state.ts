import { create } from "zustand";
import { todayISO } from "./helpers";

type PresensiHarian = {
  classId: string;
  student_id: string;
  date: string;
  setClassId: (classId: string) => void;
  setStudentId: (student_id: string) => void;
  setDate: (date: string) => void;
};

type RiwayatPresensi = {
  classId: string;
  status: string;
  date: string;
  setClassId: (kelas: string) => void;
  setStatus: (status: string) => void;
  setDate: (tanggal: string) => void;
};

type DataSiswa = {
  filterClass: string;
  show: string;
  search: string;
  inputSearch: string;
  setFilterClass: (kelas: string) => void;
  setSearch: (search: string) => void;
  setInputSearch: (search: string) => void;
  setShow: (show: string) => void;
};

type Kelas = {
  classFilter: string;
  setClassFilter: (kelas: string) => void;
};

type LaporanBulanan = {
  classId: string;
  month: string;
  setClassId: (class_id: string) => void;
  setMonth: (month: string) => void;
};

export const presensiHarian = create<PresensiHarian>((set) => ({
  classId: "",
  student_id: "",
  date: todayISO(),
  setDate: (date) => set({ date }),
  setClassId: (class_id) => set({ classId: class_id }),
  setStudentId: (student_id) => set({ student_id }),
}));

export const riwayatPresensi = create<RiwayatPresensi>((set) => ({
  classId: "all",
  status: "all",
  date: todayISO(),
  setClassId: (kelas) => set({ classId: kelas }),
  setStatus: (status) => set({ status }),
  setDate: (tanggal) => set({ date: tanggal }),
}));

export const dataSiswa = create<DataSiswa>((set) => ({
  filterClass: "all",
  search: "",
  inputSearch: "",
  show: "10",
  setShow: (show) => set({ show }),
  setFilterClass: (kelas) => set({ filterClass: kelas }),
  setSearch: (search) => set({ search }),
  setInputSearch: (search) => set({ inputSearch: search }),
}));

export const kelasSiswa = create<Kelas>((set) => ({
  classFilter: "all",
  setClassFilter: (kelas) => set({ classFilter: kelas }),
}));
export const laporanBulanan = create<LaporanBulanan>((set) => ({
  classId: "all",
  month: todayISO().slice(0, 7),
  setClassId: (class_id) => set({ classId: class_id }),
  setMonth: (month) => set({ month }),
}));
