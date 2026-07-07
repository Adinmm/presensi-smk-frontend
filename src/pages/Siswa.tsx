import { useEffect, useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Plus, Pencil, Trash2, Search, SearchX } from "lucide-react";
import { CreateStudent, UpdateStudent } from "@/components/form/DataSiswa";
import { useGetGeneralClass, useGetStudents } from "@/hooks/useGet";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagitantion";
import { dataSiswa } from "@/lib/state";
import { useDeleteStudent } from "@/hooks/useDelete";
import { AlertDialogDelete } from "@/components/utils/AlertDialog";
import { LoadingOverlay } from "@/components/utils/LoadingOverlay";
import { EmptyDataResponse } from "@/components/utils/Response";

export default function Siswa() {
  const {
    filterClass,
    search,
    setFilterClass,
    setSearch,
    inputSearch,
    setInputSearch,
    setShow,
    show,
  } = dataSiswa();

  const [page, setPage] = useState(1);

  const {
    data: students,
    isLoading,
    isError,
  } = useGetStudents(page, filterClass, search, Number(show));
  const { data: classes } = useGetGeneralClass();

  const { mutation } = useDeleteStudent();

  const total = students?.data?.pagination?.last_page ?? 0;
  const totalData = students?.data?.pagination?.total ?? 0;
  const totalPages = Array.from({ length: total }, (_, i) => i + 1);

  const curentPage = students?.data?.pagination?.current_page ?? 0;
  const perPage = students?.data?.pagination?.per_page ?? 0;

  const onSeacrh = (text: string) => {
    setSearch(text);
  };

  const onDelete = (id: string) => {
    mutation.mutate(id);
  };

  useEffect(() => {
    if (inputSearch === "") {
      setSearch("");
    }
  }, [inputSearch]);

  const filterKelas = (id: string) => {
    setFilterClass(id);
    setPage(1);
  };

  return (
    <div className="space-y-6">
      {mutation.isPending && <LoadingOverlay />}
      <div className="flex items-end justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Data Siswa</h1>
          <p className="text-sm text-muted-foreground">
            Kelola daftar siswa per kelas.
          </p>
        </div>
        <CreateStudent
          buttonTrigger={
            <Button>
              <Plus className="h-4 w-4" /> Tambah Siswa
            </Button>
          }
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Siswa</CardTitle>
          <CardDescription>{totalData} siswa</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 md:grid-cols-3">
            <div className="space-y-1.5">
              <Label>Cari</Label>
              <div className="flex gap-2 items-center">
                <Input
                  placeholder="Nama / NIS"
                  value={inputSearch}
                  onChange={(e) => setInputSearch(e.target.value)}
                />
                <Button onClick={() => onSeacrh(inputSearch)}>
                  <Search className="text-white" />
                </Button>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Kelas</Label>
              <Select value={filterClass} onValueChange={(e) => filterKelas(e)}>
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
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground font-medium">
              <span>Menampilkan</span>
              <Select value={show} onValueChange={setShow} defaultValue="10">
                <SelectTrigger className="w-[70px] border-muted-foreground/20 focus:ring-1 focus:ring-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
              <span>Siswa</span>
            </div>
          </div>
          {isError ? (
            <EmptyDataResponse
              title="Error"
              message="Terjadi kesalahan pada server"
            />
          ) : students?.data?.items.length === 0 ? (
            <EmptyDataResponse
              title="Data Kosong"
              message="Belum ada data siswa"
            />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No</TableHead>
                  <TableHead>NIS</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>Kelas</TableHead>
                  <TableHead>JK</TableHead>
                  <TableHead>Telepon</TableHead>
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
                          <div className="h-4 bg-muted rounded w-32"></div>
                        </TableCell>
                        <TableCell>
                          <div className="h-4 bg-muted rounded w-12"></div>
                        </TableCell>
                        <TableCell>
                          <div className="h-4 bg-muted rounded w-20"></div>
                        </TableCell>
                        <TableCell>
                          <div className="h-4 bg-muted rounded w-24"></div>
                        </TableCell>
                        <TableCell className="text-right flex justify-end gap-2">
                          <div className="h-8 w-8 bg-muted rounded"></div>
                          <div className="h-8 w-8 bg-muted rounded"></div>
                        </TableCell>
                      </TableRow>
                    ))
                  : students?.data?.items?.map((s: any, index) => {
                      return (
                        <TableRow key={s?.id}>
                          <TableCell>
                            {(curentPage - 1) * perPage + index + 1}
                          </TableCell>
                          <TableCell>{s?.nis}</TableCell>
                          <TableCell className="font-medium truncate">
                            {s?.nama_lengkap}
                          </TableCell>
                          <TableCell className="truncate">
                            {s?.kelas?.nama_kelas}
                          </TableCell>
                          <TableCell className="truncate">
                            {s?.jenis_kelamin === "L"
                              ? "Laki-laki"
                              : "Perempuan"}
                          </TableCell>
                          <TableCell>{s?.no_telepon ?? "—"}</TableCell>
                          <TableCell className="text-right truncate">
                            <UpdateStudent
                              buttonTrigger={
                                <Button variant="ghost" size="icon">
                                  <Pencil className="h-4 w-4" />
                                </Button>
                              }
                              data={s}
                            />
                            <AlertDialogDelete
                              buttonTrigger={
                                <Button variant="ghost" size="icon">
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              }
                              onSubmit={() => onDelete(s?.id)}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      {!isLoading || students?.data?.items?.length && (
        <div className="p-3">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => curentPage > 1 && setPage(curentPage - 1)}
                  className={
                    curentPage === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
              <PaginationItem>
                {totalPages?.map((p) => {
                  return (
                    <PaginationLink
                      onClick={() => setPage(p)}
                      key={p}
                      isActive={curentPage === p}
                    >
                      {p}
                    </PaginationLink>
                  );
                })}
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  onClick={() => page < total && setPage(page + 1)}
                  className={
                    page === total
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
