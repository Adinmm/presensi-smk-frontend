import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { useAuth } from "@/lib/auth";

import { exportXLS, formatKeJamMenit } from "@/lib/helpers";
import { useGetAllData, useGetMe } from "@/hooks/useGet";
import { showSuccess } from "@/hooks/useToast";

export default function Pengaturan() {
  const { user } = useAuth();
  const { data: me } = useGetMe();

  const { data, isLoading } = useGetAllData();

  const dataStudents = data?.data?.students?.map((student: any) => {
    return {
      "Nomor Induk Siswa": student.nis,
      "Nama Siswa": student.nama_lengkap,
      "Jenis Kelamin":
        student.jenis_kelamin === "L" ? "Laki-laki" : "Perempuan",
      Kelas: student.kelas,
      Jurusan: student.jurusan,
      "Nomor Telepon": student.no_telepon,
      Tingkat: student.tingkat,
    };
  });

  const dataKelas = data?.data?.classes?.map((classs: any) => {
    return {
      "Nama Kelas": classs.nama_kelas,
      Jurusan: classs.jurusan,
      Tingkat: classs.tingkat,
    };
  });

  const dataPresensi = data?.data?.attendances?.map((att: any) => {
    return {
      "Nama Siswa": att.siswa,
      "Nomor Induk Siswa": att.nis,
      "Jenis Kelamin": att.jenis_kelamin === "L" ? "Laki-laki" : "Perempuan",
      "Nomor Telepon": att.no_telepon,

      Kelas: att.kelas,
      Jurusan: att.jurusan,
      Tingkat: att.tingkat,

      "Tanggal Presensi": att.tanggal,
      "Status Kehadiran": att.status,
      "Waktu Presensi": formatKeJamMenit(att.waktu),
    };
  });

  const exportAll = () => {
    exportXLS("siswa.xlsx", dataStudents);
    exportXLS("kelas.xlsx", dataKelas);
    exportXLS("presensi.xlsx", dataPresensi);
    showSuccess("Berhasil mengekspor semua data");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Pengaturan</h1>
        <p className="text-sm text-muted-foreground">
          Akun, data, dan preferensi sistem.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Akun</CardTitle>
          <CardDescription>Informasi akun yang sedang masuk.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between border-b py-2">
            <span className="text-muted-foreground">Nama</span>
            <span className="font-medium">{me?.data?.name}</span>
          </div>
          <div className="flex justify-between border-b py-2">
            <span className="text-muted-foreground">Email</span>
            <span className="font-medium">{me?.data?.email}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-muted-foreground">Peran</span>
            <span className="font-medium capitalize">{me?.data?.role}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Manajemen Data</CardTitle>
          <CardDescription>Backup atau reset data aplikasi.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between gap-3 flex-wrap border rounded-md p-3">
            <div>
              <div className="text-sm font-medium">Export Semua Data</div>
              <div className="text-xs text-muted-foreground">
                Unduh data siswa, kelas, dan presensi sebagai file EXCEL.
              </div>
            </div>
            <Button disabled={isLoading} variant="outline" onClick={exportAll}>
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tentang</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-1">
          <p>
            <strong className="text-foreground">Presensi SMK</strong> — Sistem
            kehadiran digital untuk Sekolah Menengah Kejuruan.
          </p>
          <p>Versi 2.0.0 · </p>
        </CardContent>
      </Card>
    </div>
  );
}
