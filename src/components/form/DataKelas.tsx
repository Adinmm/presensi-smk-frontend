import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Classes } from "@/lib/types";
import { useCreateClass } from "@/hooks/usePost";
import { Loader2 } from "lucide-react";
import { showError } from "@/hooks/useToast";
import { useUpdateClass } from "@/hooks/usePatch";
export const CreateClass = ({
  buttonTrigger,
}: {
  buttonTrigger: React.ReactNode;
}) => {
  const empty: Omit<Classes, "id"> = {
    nama_kelas: "",
    jurusan: "",
    tingkat: "",
  };

  const [form, setForm] = useState<Omit<Classes, "id">>(empty);

  const { mutation } = useCreateClass();
  const onSubmit = (data: Classes) => {
    if (!data.nama_kelas || !data.jurusan || !data.tingkat) {
      return showError("Data tidak lengkap");
    }
    mutation.mutate(data);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{buttonTrigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Kelas</DialogTitle>
          <DialogDescription>Lengkapi data kelas.</DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label>Nama Kelas</Label>
            <Input
              placeholder="Mis. XII RPL 1"
              value={form.nama_kelas}
              onChange={(e) => setForm({ ...form, nama_kelas: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Jurusan</Label>
            <Input
              placeholder="Mis. Rekayasa Perangkat Lunak"
              value={form.jurusan}
              onChange={(e) => setForm({ ...form, jurusan: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Tingkat</Label>
            <Select
              value={String(form.tingkat)}
              onValueChange={(v) => setForm({ ...form, tingkat: v })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">Kelas X</SelectItem>
                <SelectItem value="11">Kelas XI</SelectItem>
                <SelectItem value="12">Kelas XII</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Batal
              </Button>
            </DialogClose>
            <Button onClick={() => onSubmit(form)} type="submit">
              Tambah
              {mutation.isPending && <Loader2 className="animate-spin" />}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export const UpdateClass = ({
  buttonTrigger,
  data,
}: {
  buttonTrigger: React.ReactNode;
  data: Classes;
}) => {
  const [form, setForm] = useState<Classes>({
    id: data.id ?? "",
    nama_kelas: data.nama_kelas ?? "",
    jurusan: data?.jurusan ?? "",
    tingkat: data?.tingkat ?? "",
  });

  const { mutation } = useUpdateClass();
  const onSubmit = (data: Classes) => {
    mutation.mutate(data);

  };
  return (
    <Dialog>
      <DialogTrigger asChild>{buttonTrigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Kelas</DialogTitle>
          <DialogDescription>Edit data kelas.</DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label>Nama Kelas</Label>
            <Input
              placeholder="Mis. XII RPL 1"
              value={form.nama_kelas}
              onChange={(e) => setForm({ ...form, nama_kelas: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Jurusan</Label>
            <Input
              placeholder="Mis. Rekayasa Perangkat Lunak"
              value={form.jurusan}
              onChange={(e) => setForm({ ...form, jurusan: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Tingkat</Label>
            <Select
              value={form.tingkat}
              onValueChange={(v) => setForm({ ...form, tingkat: v })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">Kelas X</SelectItem>
                <SelectItem value="11">Kelas XI</SelectItem>
                <SelectItem value="12">Kelas XII</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button disabled={mutation.isPending} type="button" variant="outline">
                Batal
              </Button>
            </DialogClose>
            <Button disabled={mutation.isPending} onClick={() => onSubmit(form)} type="submit">
              Edit
              {mutation.isPending && <Loader2 className="animate-spin" />}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
