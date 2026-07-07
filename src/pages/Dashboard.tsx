import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { todayISO, formatDateID, formatKeJamMenit } from "@/lib/helpers";
import {
  Users,
  CheckCircle2,
  AlertCircle,
  Stethoscope,
  XCircle,
  School,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useGetDashboard } from "@/hooks/useGet";
import { EmptyDataResponse } from "@/components/utils/Response";

// Peningkatan warna: menggunakan skema warna yang cerah dan informatif untuk tiap status
const STATUS_META = {
  hadir: {
    label: "Hadir",
    icon: CheckCircle2,
    colorClass: "text-emerald-600 dark:text-emerald-400",
    bgClass: "bg-emerald-500",
    variant: "success" as const,
  },
  izin: {
    label: "Izin",
    icon: AlertCircle,
    colorClass: "text-amber-600 dark:text-amber-400",
    bgClass: "bg-amber-500",
    variant: "warning" as const,
  },
  sakit: {
    label: "Sakit",
    icon: Stethoscope,
    colorClass: "text-sky-600 dark:text-sky-400",
    bgClass: "bg-sky-500",
    variant: "secondary" as const,
  },
  alpa: {
    label: "Alpa",
    icon: XCircle,
    colorClass: "text-rose-600 dark:text-rose-400",
    bgClass: "bg-rose-500",
    variant: "destructive" as const,
  },
};

export default function Dashboard() {
  const today = todayISO();
  const { data: dashboard, isLoading } = useGetDashboard(today);

  const totalSiswa = dashboard?.data?.highlight?.total_siswa || 0;
  const totalKelas = dashboard?.data?.highlight?.total_kelas || 0;
  const hadir = dashboard?.data?.highlight?.hadir || 0;
  const izin_sakit = dashboard?.data?.highlight?.izin_sakit || 0;
  const alpa = dashboard?.data?.highlight?.alpa || 0;

  const ringkasanStatus = dashboard?.data?.ringkasan_status;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">{formatDateID(today)}</p>
      </div>

      {/* Grid Statistik Utama */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Stat
          title="Total Siswa"
          value={isLoading ? "..." : totalSiswa}
          icon={Users}
          hint={`${totalKelas} kelas terdaftar`}
          iconColor="text-blue-500"
        />
        <Stat
          title="Hadir Hari Ini"
          value={isLoading ? "..." : hadir}
          icon={CheckCircle2}
          hint={`${Math.round((hadir / totalSiswa) * 100) || 0}% kehadiran`}
          iconColor="text-emerald-500"
        />
        <Stat
          title="Izin / Sakit"
          value={isLoading ? "..." : izin_sakit}
          icon={AlertCircle}
          hint="Diketahui dengan keterangan"
          iconColor="text-amber-500"
        />
        <Stat
          title="Alpa"
          value={isLoading ? "..." : alpa}
          icon={XCircle}
          hint="Perlu tindak lanjut"
          iconColor="text-rose-500"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Ringkasan Status */}
        <Card className="lg:col-span-2 shadow-sm border-muted/60">
          <CardHeader>
            <CardTitle>Ringkasan Status Hari Ini</CardTitle>
            <CardDescription>Distribusi status presensi siswa.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {(["hadir", "izin", "sakit", "alpa"] as const).map((k) => {
              const meta = STATUS_META[k];
              const persentase = ringkasanStatus?.[k]?.persentase || 0;
              const jumlah = ringkasanStatus?.[k]?.jumlah || 0;

              return (
                <div key={k} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 font-medium text-foreground">
                      <meta.icon className={`h-4 w-4 ${meta.colorClass}`} />
                      {meta.label}
                    </span>
                    <span className="text-muted-foreground font-medium">
                      {isLoading ? "..." : `${jumlah} siswa · ${persentase}%`}
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary/60 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${meta.bgClass}`}
                      style={{ width: isLoading ? "0%" : `${persentase}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Daftar Kelas */}
        <Card className="shadow-sm border-muted/60">
          <CardHeader>
            <CardTitle>Kelas</CardTitle>
            <CardDescription>Daftar kelas aktif.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-md border p-3 animate-pulse"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-md bg-muted" />
                      <div className="space-y-1.5">
                        <div className="h-4 w-24 rounded bg-muted" />
                        <div className="h-3 w-12 rounded bg-muted" />
                      </div>
                    </div>
                    <div className="h-5 w-16 rounded-full bg-muted" />
                  </div>
                ))}
              </div>
            ) : (
              <div>
                {dashboard?.data.kelas.length === 0 ? (
                  <EmptyDataResponse
                    title="Tidak ada kelas"
                    message="Belum ada kelas terdaftar."
                  />
                ) : (
                  <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
                    {dashboard?.data?.kelas?.map((c) => (
                      <div
                        key={c.id}
                        className="flex items-center justify-between rounded-md border p-3 bg-card hover:bg-accent/40 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 grid place-items-center rounded-md bg-primary/10 text-primary">
                            <School className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-foreground">
                              {c.nama_kelas}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Kelas {c.tingkat}
                            </div>
                          </div>
                        </div>
                        <Badge
                          variant="secondary"
                          className="bg-secondary/70 font-normal"
                        >
                          {c.students?.length || 0} siswa
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Aktivitas Terbaru */}
      <Card className="shadow-sm border-muted/60">
        <CardHeader>
          <CardTitle>Aktivitas Terbaru</CardTitle>
          <CardDescription>
            Catatan presensi yang baru saja diperbarui.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <ul className="divide-y animate-pulse">
              {[...Array(4)].map((_, index) => (
                <li
                  key={index}
                  className="py-3 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="h-4 w-4 rounded bg-muted shrink-0" />
                    <div className="min-w-0 flex-1 space-y-1.5">
                      <div className="h-4 w-1/2 max-w-[180px] rounded bg-muted" />
                      <div className="h-3 w-3/4 max-w-[240px] rounded bg-muted" />
                    </div>
                  </div>
                  <div className="h-5 w-16 rounded-full bg-muted shrink-0" />
                </li>
              ))}
            </ul>
          ) : !dashboard?.data?.aktivitas_terbaru ||
            dashboard.data.aktivitas_terbaru.length === 0 ? (
            <EmptyDataResponse
              title="Tidak ada aktivitas"
              message="Belum ada aktivitas terdaftar."
            />  
          ) : (
            <ul className="divide-y divide-border/60">
              {dashboard.data.aktivitas_terbaru.map((r) => {
                const m = STATUS_META[r.status] || {
                  label: r.status,
                  icon: AlertCircle,
                  colorClass: "text-muted-foreground",
                  variant: "outline" as const,
                };
                return (
                  <li
                    key={r.id}
                    className="py-3 flex items-center justify-between gap-3 hover:bg-accent/20 px-2 -mx-2 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <m.icon className={`h-4 w-4 shrink-0 ${m.colorClass}`} />
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-foreground truncate">
                          {r.student?.nama_lengkap ?? "—"}
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                          <span className="font-medium text-foreground/80">
                            {r.kelas?.nama_kelas}
                          </span>{" "}
                          · {formatDateID(r.date)}{" "}
                          {r.created_at &&
                            `· ${formatKeJamMenit(r.created_at)}`}
                        </div>
                        {r.created_at !== r.updated_at && r.updated_at && (
                          <div className="text-xs text-blue-600 dark:text-blue-400 font-medium mt-0.5">
                            Diperbarui · {formatKeJamMenit(r.updated_at)}
                          </div>
                        )}
                      </div>
                    </div>
                    <Badge variant={m.variant} className="capitalize shrink-0">
                      {m.label}
                    </Badge>
                  </li>
                );
              })}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function Stat({
  title,
  value,
  icon: Icon,
  hint,
  iconColor = "text-muted-foreground",
}: {
  title: string;
  value: number | string;
  icon: any;
  hint?: string;
  iconColor?: string;
}) {
  return (
    <Card className="shadow-sm border-muted/60 bg-gradient-to-br from-card to-background/50">
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
            {title}
          </span>
          <div className={`p-1.5 rounded-md bg-secondary/50 ${iconColor}`}>
            <Icon className="h-4 w-4 current-color" />
          </div>
        </div>
        <div className="mt-2 text-3xl font-bold tracking-tight text-foreground">
          {value}
        </div>
        {hint && (
          <div className="text-xs text-muted-foreground/80 mt-1 font-medium">
            {hint}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
