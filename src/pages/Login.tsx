import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, Loader2, Lock, User, Eye, EyeOff } from "lucide-react";

import { useLogin } from "@/hooks/usePost";
import { showError } from "@/hooks/useToast";

export default function Login() {
  const [dataLogin, setDataLogin] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const { mutation } = useLogin();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Mencegah reload halaman bawaan form browser

    if (!dataLogin.email || !dataLogin.password) {
      showError("Data tidak lengkap");
      return;
    }
    mutation.mutate({
      email: dataLogin.email,
      password: dataLogin.password,
    });
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-50 dark:bg-slate-950 font-sans">
      {/* Sisi Kiri: Panel Informasi & Branding */}
      <div className="hidden lg:flex flex-col justify-between p-12 relative overflow-hidden bg-gradient-to-br from-primary via-indigo-950 to-slate-900 text-primary-foreground">
        {/* Dekorasi Latar Belakang (Efek Ornamen Premium) */}
        <div className="absolute top-[-20%] left-[-20%] w-[600px] h-[600px] rounded-full bg-primary-foreground/5 blur-3xl pointer-events-none animate-pulse duration-[6000ms]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-white/5 blur-3xl pointer-events-none" />

        {/* Logo / Header */}
        <div className="flex items-center gap-3 relative z-10 select-none">
          <div className="p-2.5 bg-white/10 rounded-xl backdrop-blur-md border border-white/10 shadow-inner">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <span className="font-extrabold tracking-wider text-lg uppercase drop-shadow-sm bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
            Presensi SMK
          </span>
        </div>

        {/* Konten Utama Kiri */}
        <div className="space-y-6 max-w-lg relative z-10 my-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs backdrop-blur-sm shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium tracking-wide">
              Versi Terbaru v2.0
            </span>
          </div>
          <h1 className="text-4xl xl:text-5xl font-extrabold tracking-tight leading-[1.15]">
            Sistem presensi siswa yang{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 drop-shadow-sm">
              sederhana, cepat,
            </span>{" "}
            dan profesional.
          </h1>
          <p className="text-base text-primary-foreground/80 leading-relaxed font-light">
            Catat kehadiran kelas, kelola data siswa, dan hasilkan laporan dalam
            hitungan detik. Dirancang khusus untuk efisiensi lingkungan sekolah
            menengah kejuruan.
          </p>
        </div>

        {/* Footer Kiri */}
        <p className="text-xs text-primary-foreground/50 relative z-10 tracking-wide font-light">
          © {new Date().getFullYear()} Presensi SMK. Hak Cipta Dilindungi.
        </p>
      </div>

      {/* Sisi Kanan: Form Login */}
      <div className="flex items-center justify-center p-6 sm:p-12 relative bg-dot-pattern">
        {/* Dekorasi halus sisi kanan */}
        <div className="absolute top-10 right-10 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <Card className="w-full max-w-md border-slate-200/80 dark:border-slate-800/80 shadow-2xl shadow-slate-200/40 dark:shadow-none backdrop-blur-md bg-white/95 dark:bg-slate-900/95 transition-all duration-300 hover:shadow-primary/5">
          <CardHeader className="space-y-2 pb-6">
            <div className="lg:hidden flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-primary rounded-lg text-primary-foreground shadow-sm">
                <GraduationCap className="h-5 w-5" />
              </div>
              <span className="font-bold tracking-wider text-sm uppercase">
                Presensi SMK
              </span>
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Selamat Datang Kembali
            </CardTitle>
            <CardDescription className="text-slate-500 dark:text-slate-400 text-sm">
              Silakan masuk menggunakan akun kredensial Anda.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Membungkus input dengan form agar mendukung submit via tombol Enter */}
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="u"
                  className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400"
                >
                  Username
                </Label>
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors duration-200 pointer-events-none" />
                  <Input
                    id="u"
                    type="text"
                    placeholder="nama@sekolah.sch.id"
                    className="pl-10 h-10.5 bg-slate-50/50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 focus-visible:ring-primary/20 focus-visible:border-primary transition-all duration-200"
                    value={dataLogin.email}
                    onChange={(e) =>
                      setDataLogin({
                        ...dataLogin,
                        email: e.target.value,
                      })
                    }
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Input Password */}
              <div className="space-y-2">
                <Label
                  htmlFor="p"
                  className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400"
                >
                  Password
                </Label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors duration-200 pointer-events-none" />
                  <Input
                    id="p"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 pr-10 h-10.5 bg-slate-50/50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800 focus-visible:ring-primary/20 focus-visible:border-primary transition-all duration-200"
                    value={dataLogin.password}
                    onChange={(e) =>
                      setDataLogin({
                        ...dataLogin,
                        password: e.target.value,
                      })
                    }
                    autoComplete="current-password"
                  />
                  {/* Tombol Show/Hide Password */}
                  <button
                    type="button"
                    tabIndex={-1} // Dilewati saat user menekan tombol Tab agar tidak mengganggu alur ketik
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1 rounded-md"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Tombol Submit */}
              <Button
                className="w-full mt-6 h-11 font-medium transition-all duration-200 shadow-lg shadow-primary/10 hover:shadow-primary/20 active:scale-[0.98]"
                type="submit"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Memproses Masuk...
                  </>
                ) : (
                  "Masuk Aplikasi"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
