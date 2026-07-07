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
import { GraduationCap, Loader2, Lock, User } from "lucide-react";

import { useLogin } from "@/hooks/usePost";
import { showError } from "@/hooks/useToast";

export default function Login() {
  const [dataLogin, setDataLogin] = useState({ email: "", password: "" });

  const { mutation } = useLogin();

  const onSubmit = () => {
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
    <div className="min-h-screen grid lg:grid-cols-2 bg-background font-sans">
      {/* Sisi Kiri: Panel Informasi & Branding */}
      <div className="hidden lg:flex flex-col justify-between p-12 relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-slate-900 text-primary-foreground">
        {/* Dekorasi Latar Belakang (Abstrak Modern) */}
        <div className="absolute top-[-20%] left-[-20%] w-[600px] h-[600px] rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-primary-foreground/5 blur-3xl pointer-events-none" />

        {/* Logo / Header */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="p-2 bg-white/10 rounded-xl backdrop-blur-md border border-white/10 shadow-inner">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <span className="font-bold tracking-wider text-lg uppercase drop-shadow-sm">
            Presensi SMK
          </span>
        </div>

        {/* Konten Utama Kiri */}
        <div className="space-y-6 max-w-lg relative z-10 my-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Versi Terbaru v2.0
          </div>
          <h1 className="text-4xl xl:text-5xl font-extrabold tracking-tight leading-[1.15]">
            Sistem presensi siswa yang{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-400">
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
        <p className="text-xs text-primary-foreground/60 relative z-10 tracking-wide font-light">
          © {new Date().getFullYear()} Presensi SMK. Hak Cipta Dilindungi.
        </p>
      </div>

      {/* Sisi Kanan: Form Login */}
      <div className="flex items-center justify-center p-6 sm:p-12 bg-slate-50/50 dark:bg-slate-950/20 relative">
        {/* Ornamen Ringan Latar Belakang Kanan */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
        
        <Card className="w-full max-w-md border-slate-200/60 dark:border-slate-800/60 shadow-xl shadow-slate-200/50 dark:shadow-none backdrop-blur-sm bg-white/90 dark:bg-slate-900/90 transition-all duration-300">
          <CardHeader className="space-y-2 pb-6">
            <div className="lg:hidden flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-primary rounded-lg text-primary-foreground">
                <GraduationCap className="h-5 w-5" />
              </div>
              <span className="font-bold tracking-wider text-sm uppercase">Presensi SMK</span>
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Selamat Datang Kembali
            </CardTitle>
            <CardDescription className="text-slate-500 dark:text-slate-400 text-sm">
              Silakan masuk menggunakan akun kredensial Anda.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Input Username */}
            <div className="space-y-2">
              <Label htmlFor="u" className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                 Email
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                <Input
                  id="u"
                  placeholder="Masukkan email"
                  className="pl-10 bg-slate-50 dark:bg-slate-950 border-slate-200 focus-visible:ring-primary/20 focus-visible:border-primary transition-all duration-200"
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
              <div className="flex justify-between items-center">
                <Label htmlFor="p" className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                  Password
                </Label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                <Input
                  id="p"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10 bg-slate-50 dark:bg-slate-950 border-slate-200 focus-visible:ring-primary/20 focus-visible:border-primary transition-all duration-200"
                  value={dataLogin.password}
                  onChange={(e) =>
                    setDataLogin({
                      ...dataLogin,
                      password: e.target.value,
                    })
                  }
                  autoComplete="current-password"
                />
              </div>
            </div>

            {/* Tombol Submit */}
            <Button 
              onClick={onSubmit} 
              className="w-full mt-6 h-11 font-medium transition-all duration-200 shadow-md shadow-primary/10 active:scale-[0.99]" 
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}