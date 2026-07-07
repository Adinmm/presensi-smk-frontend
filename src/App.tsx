import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/lib/auth";
import { ToastProvider } from "@/components/ui/toast";
import Login from "@/pages/Login";
import AppLayout from "@/components/AppLayout";
import Dashboard from "@/pages/Dashboard";
import Presensi from "@/pages/Presensi";
import Riwayat from "@/pages/Riwayat";
import Siswa from "@/pages/Siswa";
import Kelas from "@/pages/Kelas";
import Laporan from "@/pages/Laporan";
import Pengaturan from "@/pages/Pengaturan";
import { useCookies } from "react-cookie";

function Protected({ children }: { children: JSX.Element }) {
  const [cookie] = useCookies(["role"]);
  const user = cookie.role;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <Protected>
                  <AppLayout />
                </Protected>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="presensi" element={<Presensi />} />
              <Route path="riwayat" element={<Riwayat />} />
              <Route path="siswa" element={<Siswa />} />
              <Route path="kelas" element={<Kelas />} />
              <Route path="laporan" element={<Laporan />} />
              <Route path="pengaturan" element={<Pengaturan />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ToastProvider>
  );
}
