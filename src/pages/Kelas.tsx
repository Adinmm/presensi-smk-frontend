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
import { Button } from "@/components/ui/button";
import { Pencil, Plus, SearchX, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/toast";
import { CreateClass, UpdateClass } from "@/components/form/DataKelas";
import { useGetClass } from "@/hooks/useGet";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { kelasSiswa } from "@/lib/state";
import { LoadingOverlay } from "@/components/utils/LoadingOverlay";
import { useEffect } from "react";
import { EmptyDataResponse } from "@/components/utils/Response";

export default function Kelas() {
  const { toast } = useToast();
  const { classFilter, setClassFilter } = kelasSiswa();

  const { data: classes, isLoading, isError, error } = useGetClass(classFilter);

  const kelas = [
    {
      value: "10",
      kelas: "Kelas X",
    },
    {
      value: "11",
      kelas: "Kelas XI",
    },
    {
      value: "12",
      kelas: "kelas XII",
    },
  ];

  useEffect(() => {
    console.log(classes);
  });

  return (
    <div className="space-y-6">
      {/* <LoadingOverlay/> */}
      <div className="flex items-end justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Kelas</h1>
          <p className="text-sm text-muted-foreground">
            Kelola daftar kelas dan jurusan.
          </p>
        </div>
        <CreateClass
          buttonTrigger={
            <Button>
              <Plus className="h-4 w-4" /> Tambah Kelas
            </Button>
          }
        />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Daftar Kelas</CardTitle>
          <CardDescription>{classes?.data?.length ?? 0} kelas</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            <div className="space-y-1.5">
              <Label>Kelas</Label>
              <Select value={classFilter} onValueChange={setClassFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua kelas</SelectItem>
                  {kelas.map((c, i) => (
                    <SelectItem key={i} value={c.value}>
                      {c.kelas}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          {isError ? (
           <EmptyDataResponse
              title="Terjadi kesalahan"
              message="Terjadi kesalahan saat mengambil data kelas. Silahkan coba lagi."
            />
          ) : classes?.data.length === 0 ? (
            <EmptyDataResponse
              title="Kelas tidak ditemukan"
              message="Tidak ada kelas yang cocok dengan kata kunci atau filter kelas yang kamu masukkan."
            />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>Jurusan</TableHead>
                  <TableHead>Tingkat</TableHead>
                  <TableHead className="truncate">Jumlah Siswa</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading
                  ? Array.from({ length: 5 }).map((_, index) => (
                      <TableRow key={index} className="animate-pulse">
                        <TableCell>
                          <div className="h-4 bg-muted rounded w-16"></div>
                        </TableCell>
                        <TableCell>
                          <div className="h-4 bg-muted rounded w-16"></div>
                        </TableCell>
                        <TableCell>
                          <div className="h-4 bg-muted rounded w-16"></div>
                        </TableCell>
                        <TableCell>
                          <div className="h-4 bg-muted rounded w-32"></div>
                        </TableCell>
                        <TableCell>
                          <div className="h-4 bg-muted rounded w-12"></div>
                        </TableCell>
                        <TableCell>
                          <div className="h-4 bg-muted rounded w-20"></div>
                        </TableCell>
                      </TableRow>
                    ))
                  : classes?.data?.map((c, i) => {
                      return (
                        <TableRow key={c.id}>
                          <TableCell className="font-medium">{i + 1}</TableCell>
                          <TableCell className="font-medium truncate">
                            {c.nama_kelas}
                          </TableCell>
                          <TableCell>{c.jurusan}</TableCell>
                          <TableCell className="truncate">
                            Kelas{" "}
                            {c.tingkat === "10"
                              ? "X"
                              : c.tingkat === "11"
                                ? "XI"
                                : "XII"}
                          </TableCell>
                          <TableCell>{c.students?.length ?? 0}</TableCell>
                          <TableCell className="text-right truncate">
                            <UpdateClass
                              buttonTrigger={
                                <Button variant="ghost" size="icon">
                                  <Pencil className="h-4 w-4" />
                                </Button>
                              }
                              data={c}
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                if (classes?.data?.length > 0) {
                                  toast({
                                    title: "Tidak dapat dihapus",
                                    description: "Kelas masih memiliki siswa.",
                                    variant: "destructive",
                                  });
                                  return;
                                }
                                if (confirm(`Hapus kelas ${c.nama_kelas}?`)) {
                                  toast({ title: "Kelas dihapus" });
                                }
                              }}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
