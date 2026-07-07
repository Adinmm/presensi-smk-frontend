import { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { exportXLS, todayISO } from "@/lib/helpers";
import { Download } from "lucide-react";
import { useGetGeneralClass, useGetReports } from "@/hooks/useGet";
import { laporanBulanan } from "@/lib/state";
import { EmptyDataResponse } from "@/components/utils/Response";

// Konfigurasi warna status agar konsisten dengan halaman sebelumnya (Emerald, Amber, Sky, Rose)
const COLOR_META = {
  HADIR: {
    text: "text-emerald-600 dark:text-emerald-400",
    bgClass: "bg-emerald-500",
  },
  IZIN: { text: "text-amber-600 dark:text-amber-400", bgClass: "bg-amber-500" },
  SAKIT: { text: "text-sky-600 dark:text-sky-400", bgClass: "bg-sky-500" },
  ALPA: { text: "text-rose-600 dark:text-rose-400", bgClass: "bg-rose-500" },
};

export default function Laporan() {
  const { classId, month, setClassId, setMonth } = laporanBulanan();

  const { data: reports, isLoading: isLoadingReports } = useGetReports(
    classId,
    month,
  );
  const { data: classes, isLoading: isLoadingClasses } = useGetGeneralClass();
  const doExport = () => {
    const cName =
      classes?.data?.find((c) => c.id === classId)?.nama_kelas ?? "Semua kelas";
    const dataSiswa = reports?.data?.rekap_siswa ?? [];
    exportXLS(
      `laporan-${cName}-${month}.xlsx`,
      dataSiswa.map((r) => ({
        NIS: r.nis,
        Nama: r.nama_lengkap,
        Hadir: r.rekap_individu?.hadir ?? 0,
        Izin: r.rekap_individu?.izin ?? 0,
        Sakit: r.rekap_individu?.sakit ?? 0,
        Alpa: r.rekap_individu?.alpa ?? 0,
        Total: r.rekap_individu?.total ?? 0,
        "Persen Hadir": `${r.rekap_individu?.persentase_kehadiran ?? 0}%`,
      })),
    );
  };


  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Laporan Bulanan
          </h1>
          <p className="text-sm text-muted-foreground">
            Ringkasan kehadiran per siswa per bulan.
          </p>
        </div>
        <Button
          onClick={doExport}
          disabled={isLoadingReports || !reports?.data?.rekap_siswa?.length}
          className="shadow-sm bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Download className="h-4 w-4" /> Export Excel
        </Button>
      </div>

      <Card className="shadow-sm border-muted/60">
        <CardHeader>
          <CardTitle>Filter</CardTitle>
          <CardDescription>Pilih kelas dan periode bulan.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          <div className="space-y-1.5">
            <Label className="text-foreground/80">Kelas</Label>
            <Select value={classId} onValueChange={setClassId}>
              <SelectTrigger className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kelas</SelectItem>
                {isLoadingClasses && (
                  <SelectItem value="loading">Loading...</SelectItem>
                )}
                {classes?.data?.map((c) => (
                  <SelectItem key={c.id} value={c.id ?? ""}>
                    {c.nama_kelas}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-foreground/80">Bulan</Label>
            <Input
              type="month"
              value={month}
              className="bg-background"
              onChange={(e) => setMonth(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Grid Statistik Bulanan dengan Pewarnaan Ikon Tekstual */}
      <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
        {(["HADIR", "IZIN", "SAKIT", "ALPA"] as const).map((k) => {
          const meta = COLOR_META[k];
          return (
            <Card
              key={k}
              className="shadow-sm border-muted/60 bg-gradient-to-br from-card to-background/40"
            >
              <CardContent className="p-5">
                <div
                  className={`text-xs font-bold uppercase tracking-wider ${meta.text}`}
                >
                  {k}
                </div>
                <div className="mt-1 text-2xl font-bold tracking-tight text-foreground">
                  {k === "HADIR"
                    ? reports?.data?.total_hadir || 0
                    : k === "IZIN"
                      ? reports?.data?.total_izin || 0
                      : k === "SAKIT"
                        ? reports?.data?.total_sakit || 0
                        : reports?.data?.total_alpa || 0}
                </div>
                <div className="text-xs text-muted-foreground/80 mt-0.5">
                  Periode {month}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="shadow-sm border-muted/60">
        <CardHeader className="border-b border-muted/40 pb-4">
          <CardTitle>Rekap Siswa</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          {reports?.data.rekap_siswa.length === 0 ? (
            <EmptyDataResponse title="Tidak ada laporan" message="Tidak ada laporan untuk bulan ini" />
          ):(

          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow>
                <TableHead className="font-semibold text-foreground/80">
                  No
                </TableHead>
                <TableHead className="font-semibold text-foreground/80">
                  NIS
                </TableHead>
                <TableHead className="font-semibold text-foreground/80">
                  Nama
                </TableHead>
                <TableHead className="font-semibold text-emerald-600 dark:text-emerald-400">
                  Hadir
                </TableHead>
                <TableHead className="font-semibold text-amber-600 dark:text-amber-400">
                  Izin
                </TableHead>
                <TableHead className="font-semibold text-sky-600 dark:text-sky-400">
                  Sakit
                </TableHead>
                <TableHead className="font-semibold text-rose-600 dark:text-rose-400">
                  Alpa
                </TableHead>
                <TableHead className="font-semibold text-foreground/80 truncate">
                  Total Hari
                </TableHead>
                <TableHead className="font-semibold text-foreground/80">
                  % Hadir
                </TableHead>
              </TableRow>
            </TableHeader>
            {isLoadingReports ? (
              <TableBody>
                {Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i} className="animate-pulse">
                    <TableCell>
                      <div className="h-4 w-4 bg-muted rounded" />
                    </TableCell>
                    <TableCell>
                      <div className="h-4 w-16 bg-muted rounded" />
                    </TableCell>
                    <TableCell>
                      <div className="h-4 w-40 bg-muted rounded" />
                    </TableCell>
                    <TableCell>
                      <div className="h-4 w-6 bg-muted/60 rounded m-auto sm:m-0" />
                    </TableCell>
                    <TableCell>
                      <div className="h-4 w-6 bg-muted/60 rounded m-auto sm:m-0" />
                    </TableCell>
                    <TableCell>
                      <div className="h-4 w-6 bg-muted/60 rounded m-auto sm:m-0" />
                    </TableCell>
                    <TableCell>
                      <div className="h-4 w-6 bg-muted/60 rounded m-auto sm:m-0" />
                    </TableCell>
                    <TableCell>
                      <div className="h-4 w-8 bg-muted/40 rounded" />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 rounded-full bg-muted/50 overflow-hidden" />
                        <div className="h-3 w-8 bg-muted rounded" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <TableBody>
                {reports?.data?.rekap_siswa?.map((r, i) => (
                  <TableRow
                    key={i}
                    className="hover:bg-accent/10 transition-colors"
                  >
                    <TableCell className="text-muted-foreground font-medium">
                      {i + 1}
                    </TableCell>
                    <TableCell className="tabular-nums text-foreground/80">
                      {r.nis}
                    </TableCell>
                    <TableCell className="font-semibold text-foreground">
                      {r.nama_lengkap}
                    </TableCell>
                    <TableCell className="font-medium text-emerald-600 dark:text-emerald-400/90 tabular-nums">
                      {r.rekap_individu.hadir}
                    </TableCell>
                    <TableCell className="font-medium text-amber-600 dark:text-amber-400/90 tabular-nums">
                      {r.rekap_individu.izin}
                    </TableCell>
                    <TableCell className="font-medium text-sky-600 dark:text-sky-400/90 tabular-nums">
                      {r.rekap_individu.sakit}
                    </TableCell>
                    <TableCell className="font-medium text-rose-600 dark:text-rose-400/90 tabular-nums">
                      {r.rekap_individu.alpa}
                    </TableCell>
                    <TableCell className="font-medium text-muted-foreground tabular-nums">
                      {r.rekap_individu.total}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 rounded-full bg-secondary overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 dark:bg-emerald-600 transition-all duration-300"
                            style={{
                              width: `${r.rekap_individu.persentase_kehadiran}%`,
                            }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-foreground tabular-nums">
                          {r.rekap_individu.persentase_kehadiran}%
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
