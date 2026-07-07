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
import { GraduationCap, Loader2 } from "lucide-react";

import { useLogin } from "@/hooks/usePost";
import { showError } from "@/hooks/useToast";

export default function Login() {
  const [dataLogin, setDataLogin] = useState({ email: "", password: "" });

  const { mutation } = useLogin();

  const onSubmit = () => {
    if (!dataLogin.email || !dataLogin.password) {
      showError("Data tidak lengkap");
      return
    }
    mutation.mutate({
      email: dataLogin.email,
      password: dataLogin.password,
    });
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-between p-12 bg-primary text-primary-foreground">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-6 w-6" />
          <span className="font-semibold">Presensi SMK</span>
        </div>
        <div className="space-y-4 max-w-md">
          <h1 className="text-3xl font-semibold tracking-tight">
            Sistem presensi siswa yang sederhana, cepat, dan profesional.
          </h1>
          <p className="text-sm opacity-80">
            Catat kehadiran kelas, kelola data siswa, dan hasilkan laporan dalam
            hitungan detik. Dirancang khusus untuk lingkungan sekolah menengah
            kejuruan.
          </p>
        </div>
        <p className="text-xs opacity-60">
          © {new Date().getFullYear()} Presensi SMK
        </p>
      </div>

      <div className="flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-xl">Masuk ke Akun</CardTitle>
            <CardDescription>
              Masuk menggunakan akun Anda
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-1.5">
              <Label htmlFor="u">Username</Label>
              <Input
                id="u"
                value={dataLogin.email}
                onChange={(e) =>
                  setDataLogin({
                    ...dataLogin,
                    email: e.target.value,
                  })
                }
                autoComplete="username"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="p">Password</Label>
              <Input
                id="p"
                type="password"
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
            <Button onClick={onSubmit} className="w-full mt-4" type="submit">
              Masuk
              {mutation.isPending && (
                <Loader2 className="w-4 h-4 animate-spin" />
              )}
            </Button>
        
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
