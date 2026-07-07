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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import { Students } from "@/lib/types";
import { useGetClass, useGetGeneralClass } from "@/hooks/useGet";
import { useCreateStudent } from "@/hooks/usePost";
import { useToast } from "../ui/toast";
import { useUpdateStudent } from "@/hooks/usePatch";
import { Loader2 } from "lucide-react";
export const CreateStudent = ({
  buttonTrigger,
}: {
  buttonTrigger: React.ReactNode;
}) => {
  const [form, setForm] = useState<Students>({
    nis: "",
    nama_lengkap: "",
    no_telepon: "",
    jenis_kelamin: "",
    class_id: "",
  });
  const { toast } = useToast();

  function onSubmit(data: Students) {
    if (
      !form.nis ||
      !form.nama_lengkap ||
      !form.jenis_kelamin ||
      !form.class_id
    ) {
      toast({ title: "Data tidak lengkap", variant: "destructive" });
      return;
    }
    mutation.mutate(data);

  }

  const { data: classes } = useGetGeneralClass();
  const { mutation } = useCreateStudent();

  return (
    <Dialog>
      <DialogTrigger asChild>{buttonTrigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Siswa</DialogTitle>
          <DialogDescription>Isi data siswa dengan lengkap.</DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>NIS</Label>
              <Input
                value={form.nis}
                onChange={(e) =>
                  setForm({
                    ...form,
                    nis: e.target.value,
                  })
                }
              />
            </div>

            <div className="space-y-1.5">
              <Label>Jenis Kelamin</Label>
              <Select
                value={form.jenis_kelamin}
                onValueChange={(value) =>
                  setForm({
                    ...form,
                    jenis_kelamin: value,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih jenis kelamin" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="L">Laki-laki</SelectItem>
                  <SelectItem value="P">Perempuan</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Nama Lengkap</Label>
            <Input
              value={form.nama_lengkap}
              onChange={(e) =>
                setForm({
                  ...form,
                  nama_lengkap: e.target.value,
                })
              }
            />
          </div>

          <div className="space-y-1.5">
            <Label>Kelas</Label>
            <Select
              value={form.class_id}
              onValueChange={(value) =>
                setForm({
                  ...form,
                  class_id: value,
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih kelas" />
              </SelectTrigger>

              <SelectContent>
                {classes?.data?.map((c) => (
                  <SelectItem key={c.id} value={c.id || ""}>
                    {c.nama_kelas}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label>No. Telepon</Label>
            <Input
              value={form.no_telepon}
              onChange={(e) =>
                setForm({
                  ...form,
                  no_telepon: e.target.value,
                })
              }
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Batal
              </Button>
            </DialogClose>

            <Button onClick={() => onSubmit(form)}>
              Tambah
              {mutation.isPending && <Loader2 className="animate-spin" />}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

type UpdateStudent = {
  buttonTrigger: React.ReactNode;
  data: Students;
};
export const UpdateStudent = ({ buttonTrigger, data }: UpdateStudent) => {
  const [form, setForm] = useState<Students>({
    id: data.id,
    nis: data.nis,
    nama_lengkap: data.nama_lengkap,
    no_telepon: data.no_telepon ?? "",
    jenis_kelamin: data.jenis_kelamin,
    class_id: data.class_id,
  });

  const { data: classes } = useGetGeneralClass();
  const { mutation } = useUpdateStudent();

  function onSubmit(dataSending: Students) {
    mutation.mutate(dataSending);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>{buttonTrigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Siswa</DialogTitle>
          <DialogDescription>Isi data siswa dengan lengkap.</DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>NIS</Label>
              <Input
                value={form.nis}
                onChange={(e) =>
                  setForm({
                    ...form,
                    nis: e.target.value,
                  })
                }
              />
            </div>

            <div className="space-y-1.5">
              <Label>Jenis Kelamin</Label>
              <Select
                value={form.jenis_kelamin}
                onValueChange={(value) =>
                  setForm({
                    ...form,
                    jenis_kelamin: value,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih jenis kelamin" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="L">Laki-laki</SelectItem>
                  <SelectItem value="P">Perempuan</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Nama Lengkap</Label>
            <Input
              value={form.nama_lengkap}
              onChange={(e) =>
                setForm({
                  ...form,
                  nama_lengkap: e.target.value,
                })
              }
            />
          </div>

          <div className="space-y-1.5">
            <Label>Kelas</Label>
            <Select
              value={form.class_id}
              onValueChange={(value) =>
                setForm({
                  ...form,
                  class_id: value,
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih kelas" />
              </SelectTrigger>

              <SelectContent>
                {classes?.data?.map((c) => (
                  <SelectItem key={c.id} value={c.id || ""}>
                    {c.nama_kelas}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label>No. Telepon</Label>
            <Input
              value={form.no_telepon}
              onChange={(e) =>
                setForm({
                  ...form,
                  no_telepon: e.target.value,
                })
              }
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Batal
              </Button>
            </DialogClose>

            <Button onClick={() => onSubmit(form)}>
              Edit 
              {mutation.isPending && <Loader2 className="animate-spin" />}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
