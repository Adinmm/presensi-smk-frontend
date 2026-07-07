export type Status = "hadir" | "izin" | "sakit" | "alpa";

export type Student = {
  id: string;
  nis: string;
  name: string;
  classId: string;
  gender: "L" | "P";
  phone?: string;
};

export type Attendences = {
  id?: string;
  student_id: string;
  class_id: string;
  date: string;
  status: Status;
  student?: Students;
  kelas?: Classes;
  created_at?: string;
  updated_at?: string;
};

export type ClassRoom = {
  id: string;
  name: string;
  major: string;
  grade: 10 | 11 | 12;
};

export type AttendanceRecord = {
  id: string;
  studentId: string;
  classId: string;
  date: string; // YYYY-MM-DD
  status: Status;
  time?: string; // HH:mm
  note?: string;
};

export type User = { username: string; role: "admin" | "guru"; name: string };

export type Students = {
  id?: string;
  nis: string;
  nama_lengkap: string;
  no_telepon: string;
  jenis_kelamin: string;

  class_id: string;

  kelas?: {
    id: string;
    nama_kelas: string;
  };
};
export type Classes = {
  id?: string;
  nama_kelas: string;
  jurusan: string;
  tingkat: string;
  students?: Students[];
};

export type Pagination = {
  current_page: number;
  per_page: number;
  last_page: number;
  total: number;
};

interface RekapIndividu {
  hadir: number;
  izin: number;
  sakit: number;
  alpa: number;
  total: number;
  persentase_kehadiran: number;
}

interface Siswa {
  id: string;
  class_id: string;
  nis: string;
  nama_lengkap: string;
  rekap_individu: RekapIndividu;
}

export interface ApiResponseRekapAbsensi {
  rekap_siswa: Siswa[];
  total_hadir: number;
  total_sakit: number;
  total_izin: number;
  total_alpa: number;
}

interface StudentMinimal {
  id: number;
  nama_lengkap: string;
  class_id: number;
  nis?: string;
}

interface StudentWithNis {
  id: number;
  nama_lengkap: string;
  nis: string;
}

interface ClassMinimal {
  id: number;
  nama_kelas: string;
}

interface ClassWithStudents {
  id: number;
  nama_kelas: string;
  jurusan: string;
  tingkat:string
  students: StudentMinimal[];
}

interface AttendanceActivity {
  id: number;
  student_id: number;
  class_id: number;
  date: string;
  status: "hadir" | "sakit" | "izin" | "alpa";
  created_at: string;
  updated_at: string;
  student: StudentWithNis;
  kelas: ClassMinimal;
  [key: string]: any;
}
interface DashboardHighlight {
  total_siswa: number;
  total_kelas: number;
  hadir: number;
  izin_sakit: number;
  alpa: number;
}

interface StatusDetail {
  jumlah: number;
  persentase: number;
}

interface RingkasanStatus {
  hadir: StatusDetail;
  izin: StatusDetail;
  sakit: StatusDetail;
  alpa: StatusDetail;
}

export interface DashboardResponseData {
  highlight: DashboardHighlight;
  ringkasan_status: RingkasanStatus;
  kelas: ClassWithStudents[];
  aktivitas_terbaru: AttendanceActivity[];
}

export type Response<T> = {
  data: T;
};
