import { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Status } from "@/lib/types";
import {
  CheckCircle2,
  AlertCircle,
  Stethoscope,
  XCircle,
  Search,
  SearchX,
  Users,
  Send,
  Loader2,
  X,
} from "lucide-react";
import { useGetGeneralClass, useGetStudents } from "@/hooks/useGet";
import { showError, showSuccess } from "@/hooks/useToast";
import { useCreateAttendence } from "@/hooks/usePost";
import { presensiHarian } from "@/lib/state";
import { EmptyDataResponse } from "@/components/utils/Response";

// Perubahan Warna: Memberikan identitas warna yang segar dan tegas pada tiap status (Aksen Emerald, Amber, Sky, Rose)
const STATUSES: {
  key: Status;
  label: string;
  icon: any;
  activeClass: string;
  iconColor: string;
}[] = [
  {
    key: "hadir",
    label: "Hadir",
    icon: CheckCircle2,
    activeClass:
      "bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    key: "izin",
    label: "Izin",
    icon: AlertCircle,
    activeClass:
      "bg-amber-600 text-white hover:bg-amber-700 dark:bg-amber-500/20 dark:text-amber-400 dark:border-amber-500/30",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  {
    key: "sakit",
    label: "Sakit",
    icon: Stethoscope,
    activeClass:
      "bg-sky-600 text-white hover:bg-sky-700 dark:bg-sky-500/20 dark:text-sky-400 dark:border-sky-500/30",
    iconColor: "text-sky-600 dark:text-sky-400",
  },
  {
    key: "alpa",
    label: "Alpa",
    icon: XCircle,
    activeClass:
      "bg-rose-600 text-white hover:bg-rose-700 dark:bg-rose-500/20 dark:text-rose-400 dark:border-rose-500/30",
    iconColor: "text-rose-600 dark:text-rose-400",
  },
];

export default function Presensi() {
  const { classId, setClassId, date, setDate } = presensiHarian();

  const [search] = useState("");

  const [attendance, setAttendance] = useState<
    Record<string, Record<string, Status>>
  >({});

  const { data: classData, isError, isLoading } = useGetGeneralClass();
  const { data: studentData, isLoading: isLoadingStudents } = useGetStudents(
    1,
    classId,
    "",
    100,
  );
  const { mutation } = useCreateAttendence();

  const originalStudents = studentData?.data?.items ?? [];

  const filteredStudents = useMemo(() => {
    return originalStudents
      .filter(
        (s) =>
          s.nama_lengkap.toLowerCase().includes(search.toLowerCase()) ||
          s.nis.includes(search),
      )
      .sort((a, b) => a.nama_lengkap.localeCompare(b.nama_lengkap));
  }, [originalStudents, search]);

  const handleSetStatus = (studentId: string, status: Status) => {
    setAttendance((prev) => ({
      ...prev,
      [date]: {
        ...(prev[date] || {}),
        [studentId]: status,
      },
    }));
  };

  const markAll = (status: Status) => {
    if (!classId || filteredStudents.length === 0) return;

    setAttendance((prev) => {
      const currentDayAttendance = { ...(prev[date] || {}) };
      filteredStudents.forEach((s) => {
        currentDayAttendance[s.id ?? ""] = status;
      });
      return { ...prev, [date]: currentDayAttendance };
    });

    showSuccess(
      'Semua siswa ditandai dengan status "' +
        STATUSES.find((s) => s.key === status)?.label +
        '"',
    );
  };

  const deleteAllMark = () => {
    setAttendance({});
    showSuccess("Semua presensi telah dihapus");
  };

  const handleSubmit = () => {
    const currentDayData = attendance[date] || {};

    if (Object.keys(currentDayData).length === 0) {
      showError("Tidak ada presensi untuk tanggal ini");
      return;
    }

    const payload = Object.entries(currentDayData).map(
      ([studentId, status]) => ({
        student_id: studentId,
        class_id: classId,
        date: date,
        status,
      }),
    );
    mutation.mutate(payload);
  };

  return (
    <div className="space-y-6">
      <div>
        {/* Desaturasi/penyesuaian warna teks judul utama */}
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Presensi Harian
        </h1>
        <p className="text-sm text-muted-foreground">
          Catat kehadiran siswa per kelas.
        </p>
      </div>

      {/* Perubahan Warna: Border halus muted/60 */}
      <Card className="shadow-sm border-muted/60">
        <CardHeader>
          <CardTitle>Filter</CardTitle>
          <CardDescription>Pilih kelas dan tanggal presensi.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-4">
          <div className="space-y-1.5">
            <Label className="text-foreground/80">Kelas</Label>
            <Select value={classId} onValueChange={setClassId}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Pilih kelas" />
              </SelectTrigger>
              <SelectContent>
                {isLoading ? (
                  <SelectItem value="">Memuat kelas...</SelectItem>
                ) : (
                  <div>
                    {classData?.data?.map((c) => (
                      <SelectItem key={c.id} value={c.id ?? ""}>
                        {c.nama_kelas}
                      </SelectItem>
                    ))}
                  </div>
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-foreground/80">Tanggal</Label>
            <Input
              type="date"
              value={date}
              className="bg-background"
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Perubahan Warna: Border halus muted/60 */}
      <Card className="flex flex-col shadow-sm border-muted/60">
        <CardHeader className="flex-row items-center justify-between gap-2 flex-wrap border-b border-muted/40 pb-4">
          <div>
            <CardTitle>Daftar Siswa</CardTitle>
            <CardDescription className="text-primary font-medium">
              {classId === "" ? "0" : filteredStudents.length} siswa ditemukan
            </CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            {STATUSES.map((s) => (
              <Button
                key={s.key}
                variant="outline"
                size="sm"
                disabled={
                  !classId ||
                  filteredStudents.length === 0 ||
                  mutation.isPending
                }
                onClick={() => markAll(s.key)}
                className="hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors"
              >
                <s.icon className={`h-3.5 w-3.5 mr-1 ${s.iconColor}`} /> Tandai
                Semua {s.label}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              disabled={
                !classId || filteredStudents.length === 0 || mutation.isPending
              }
              onClick={() => deleteAllMark()}
              className="text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-950/40 hover:bg-rose-50 dark:hover:bg-rose-950/20"
            >
              <X className="h-3.5 w-3.5 mr-1" /> Hapus Semua Tanda
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 pt-6">
          {isError ? (
            <EmptyDataResponse
              title="Gagal memuat data siswa"
              message="Terjadi kesalahan saat mengambil data dari server."
            />
          ) : studentData?.data?.items?.length === 0 ? (
            <EmptyDataResponse
              title="Data Siswa Kosong"
              message="Tidak ada data siswa pada kelas ini."
            />
          ) : classId === "" ? (
            /* Perubahan Warna: Sentuhan warna background redup netral */
            <div className="w-full flex flex-col items-center justify-center min-h-[260px] p-8 rounded-xl bg-muted/20">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground">
                Pilih Kelas
              </h3>
              <p className="mt-1 text-sm text-muted-foreground text-center max-w-sm">
                Silakan pilih kelas terlebih dahulu untuk menampilkan daftar
                siswa.
              </p>
            </div>
          ) : isLoadingStudents ? (
            <ul className="divide-y border border-muted/60 rounded-lg animate-pulse">
              {Array.from({ length: 5 }).map((_, i) => (
                <li
                  key={i}
                  className="p-3 sm:p-4 flex items-center justify-between gap-3 flex-wrap"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-8 w-8 rounded-full bg-muted shrink-0" />

                    <div className="min-w-0 space-y-2">
                      <div className="h-4 w-40 bg-muted rounded-md" />

                      <div className="h-3 w-28 bg-muted/70 rounded-md" />
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 flex-wrap">
                    {Array.from({ length: 4 }).map((_, btnIdx) => (
                      <div
                        key={btnIdx}
                        className="h-8 w-16 bg-muted rounded-md"
                      />
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="divide-y border border-muted/60 rounded-lg overflow-hidden bg-card">
              {filteredStudents.map((s, i) => {
                const currentStatus = attendance[date]?.[s.id ?? ""];

                return (
                  <li
                    key={s.id}
                    className="p-3 sm:p-4 flex items-center justify-between gap-3 flex-wrap hover:bg-accent/20 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Perubahan Warna: Kontras text nomor urutan diperhalus */}
                      <div className="h-8 w-8 rounded-full bg-muted text-xs font-semibold text-muted-foreground grid place-items-center shrink-0">
                        {i + 1}
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-foreground truncate">
                          {s.nama_lengkap}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          NIS{" "}
                          <span className="text-foreground/70">{s.nis}</span> ·{" "}
                          {s.jenis_kelamin === "L" ? "Laki-laki" : "Perempuan"}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {STATUSES.map((st) => {
                        const isActive = currentStatus === st.key;
                        return (
                          <Button
                            key={st.key}
                            size="sm"
                            disabled={mutation.isPending}
                            variant={isActive ? "default" : "outline"}
                            className={`h-8 text-xs font-medium transition-all ${
                              isActive
                                ? st.activeClass
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                            onClick={() => handleSetStatus(s.id ?? "", st.key)}
                          >
                            <st.icon
                              className={`h-3.5 w-3.5 mr-1 ${isActive ? "text-current" : st.iconColor}`}
                            />{" "}
                            {st.label}
                          </Button>
                        );
                      })}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </CardContent>

        {/* Bagian Tombol Submit di Ujung Kanan Bawah */}
        {classId !== "" && filteredStudents.length > 0 && (
          /* Perubahan Warna: Pewarnaan latar belakang footer card agar terlihat kokoh */
          <CardFooter className="flex justify-end border-t border-muted/40 p-4 mt-4 bg-muted/10">
            <Button
              disabled={mutation.isPending}
              onClick={handleSubmit}
              className="gap-2 shadow-sm bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Send className="h-4 w-4" /> Submit Presensi{" "}
              {mutation.isPending && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
