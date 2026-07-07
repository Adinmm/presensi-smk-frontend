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
import { Badge } from "@/components/ui/badge";
import {
  exportXLS,
  formatDateID,
  formatKeJamMenit,
  todayISO,
} from "@/lib/helpers";
import { Download, Pencil, SearchX } from "lucide-react";
import { Status } from "@/lib/types";
import { useGetAttendanceHistory, useGetGeneralClass } from "@/hooks/useGet";
import { riwayatPresensi } from "@/lib/state";
import { UpdateKehadiran } from "@/components/form/RiwayatPresensi";
import { EmptyDataResponse } from "@/components/utils/Response";

const VARIANT: Record<
  Status,
  "success" | "warning" | "secondary" | "destructive"
> = {
  hadir: "success",
  izin: "warning",
  sakit: "secondary",
  alpa: "destructive",
};

export default function Riwayat() {
  const { classId, date, status, setClassId, setDate, setStatus } =
    riwayatPresensi();

  const {
    data: attendances,
    isError: isErrorAttendances,
    isLoading: isLoadingAttendances,
  } = useGetAttendanceHistory(classId, status, date);
  const { data: classes } = useGetGeneralClass();

  const doExport = () => {
    const today = new Date().toISOString().slice(0, 10);
    const xlsData =
      attendances?.data?.map((r) => {
        return {
          Tanggal: r.date ? formatDateID(r.date) : "—",
          NIS: r?.student?.nis ?? "—",
          Nama: r?.student?.nama_lengkap ?? "—",
          Kelas: r?.kelas?.nama_kelas ?? "—",
          Waktu: r.created_at ? formatKeJamMenit(r.created_at) : "—",
          Status: r.status?.toUpperCase() ?? "—",
        };
      }) ?? [];

    if (xlsData.length > 0) {
      exportXLS(`riwayat-presensi-${today}.csv`, xlsData);
    } else {
      alert("Tidak ada data yang bisa diekspor");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Riwayat Presensi
          </h1>
          <p className="text-sm text-muted-foreground">
            Pencarian dan filter seluruh catatan kehadiran.
          </p>
        </div>
        <Button onClick={doExport} disabled={!attendances?.data.length}>
          <Download className="h-4 w-4" /> Export CSV
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filter</CardTitle>
          <CardDescription>Persempit hasil pencarian.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          <div className="space-y-1.5">
            <Label>Kelas</Label>
            <Select value={classId} onValueChange={setClassId}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua kelas</SelectItem>
                {classes?.data?.map((c) => (
                  <SelectItem key={c.id} value={c.id ?? ""}>
                    {c.nama_kelas}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua</SelectItem>
                <SelectItem value="hadir">Hadir</SelectItem>
                <SelectItem value="izin">Izin</SelectItem>
                <SelectItem value="sakit">Sakit</SelectItem>
                <SelectItem value="alpa">Alpa</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Tanggal</Label>

            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            {formatDateID(date)}
            <Badge className="ml-2">
              {attendances?.data?.length ?? 0} Siswa
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isErrorAttendances ? (
            <EmptyDataResponse
              title="Terjadi kesalahan"
              message="Terjadi kesalahan saat memuat data riwayat presensi."
            />
          ) : attendances?.data.length === 0 ? (
            <EmptyDataResponse
              title="Belum ada presensi"
              message="Belum ada presensi tercatat. Buka menu Presensi Harian untuk memulai."
            />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>NIS</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>Kelas</TableHead>
                  <TableHead>Waktu</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              {isLoadingAttendances ? (
                <TableBody>
                  {Array.from([1, 2, 3, 4, 5]).map((_, index) => (
                    <TableRow key={index} className="animate-pulse">
                      <TableCell>
                        <div className="h-4 w-24 bg-gray-200 rounded dark:bg-gray-700" />
                      </TableCell>
                      <TableCell>
                        <div className="h-4 w-24 bg-gray-200 rounded dark:bg-gray-700" />
                      </TableCell>

                      <TableCell>
                        <div className="h-4 w-16 bg-gray-200 rounded dark:bg-gray-700" />
                      </TableCell>

                      <TableCell>
                        <div className="h-4 w-40 bg-gray-200 rounded dark:bg-gray-700" />
                      </TableCell>

                      <TableCell>
                        <div className="h-4 w-12 bg-gray-200 rounded dark:bg-gray-700" />
                      </TableCell>

                      <TableCell>
                        <div className="h-4 w-14 bg-gray-200 rounded dark:bg-gray-700" />
                      </TableCell>

                      <TableCell>
                        <div className="h-6 w-16 bg-gray-200 rounded-full dark:bg-gray-700" />
                      </TableCell>

                      <TableCell>
                        <div className="h-8 w-8 bg-muted rounded"></div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              ) : (
                <TableBody>
                  {attendances?.data?.map((r, i) => {
                    return (
                      <TableRow key={r.id}>
                        <TableCell className="whitespace-nowrap">
                          {i + 1}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          {formatDateID(r.date)}
                        </TableCell>
                        <TableCell className="truncate">{r?.student?.nis}</TableCell>
                        <TableCell className="font-medium">
                          {r?.student?.nama_lengkap}
                        </TableCell>
                        <TableCell className="truncate">{r?.kelas?.nama_kelas}</TableCell>
                        <TableCell>
                          {formatKeJamMenit(r.created_at ?? "") ?? "—"}
                        </TableCell>
                        <TableCell>
                          <Badge variant={VARIANT[r.status]}>
                            {r.status === "hadir"
                              ? "HADIR"
                              : r.status === "izin"
                                ? "IZIN"
                                : r.status === "sakit"
                                  ? "SAKIT"
                                  : "ALPA"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right truncate">
                          <UpdateKehadiran
                            buttonTrigger={
                              <Button variant="ghost" size="icon">
                                <Pencil className="h-4 w-4" />
                              </Button>
                            }
                            data={{
                              id: r.id ?? "",
                              status: r.status,
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              )}
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
