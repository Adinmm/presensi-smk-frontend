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
import { showError, showSuccess } from "@/hooks/useToast";
import { Eye, EyeOff, KeyRound, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useChangePassword } from "@/hooks/usePatch";

export default function Pengaturan() {
  const { user } = useAuth();
  const { data: me } = useGetMe();

  const { data, isLoading } = useGetAllData();

  const [showPassword, setShowPassword] = useState({
    new: false,
    confirm: false,
  });

  const [password, setPassword] = useState({ new: "", confirm: "" });

  const isChangingPassword = false;

  const { mutation } = useChangePassword();

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

  const onSubmit = () => {
    if(!password.new || !password.confirm){
      showError("Password baru dan konfirmasi password harus diisi");
      return;
    }
    if(password.new !== password.confirm){
      showError("Password baru dan konfirmasi password harus sama");
      return;
    }
    mutation.mutate({ password: password.new, password_confirmation: password.confirm });
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

      {/* Tambahan Baru - Card 3: Keamanan / Ganti Password */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <KeyRound className="h-4 w-4 text-primary" />
            <CardTitle>Keamanan</CardTitle>
          </div>
          <CardDescription>
            Perbarui kata sandi Anda secara berkala untuk menjaga keamanan akun.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 ">
          {/* Password Baru */}

          <div className="space-y-1.5">
            <Label htmlFor="new_password">Password Baru</Label>
            <div className="relative">
              <Input
                id="new_password"
                type={showPassword.new ? "text" : "password"}
                placeholder="Minimal 8 karakter"
                className="pr-10"
                onChange={(e)=>{
                  setPassword({
                    ...password,
                    new: e.target.value
                  })
                }}
              />
              <button
                type="button"
                onClick={() =>
                  setShowPassword({ ...showPassword, new: !showPassword.new })
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword.new ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Konfirmasi Password Baru */}
          <div className="space-y-1.5">
            <Label htmlFor="confirm_password">Konfirmasi Password</Label>
            <div className="relative">
              <Input
                id="confirm_password"
                type={showPassword.confirm ? "text" : "password"}
                placeholder="Ulangi password baru"
                className="pr-10"
                onChange={(e)=>{
                  setPassword({
                    ...password,
                    confirm: e.target.value
                  })
                }}
              />
              <button
                type="button"
                onClick={() =>
                  setShowPassword({
                    ...showPassword,
                    confirm: !showPassword.confirm,
                  })
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword.confirm ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Tombol Simpan */}
          <div className="flex justify-end pt-2">
            <Button
              disabled={mutation.isPending}
              className="w-full sm:w-auto min-w-[120px]"
              onClick={onSubmit}
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                "Perbarui Password"
              )}
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
