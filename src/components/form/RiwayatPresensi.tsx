import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";
import { useUpdateStatus } from "@/hooks/usePatch";
import { Loader2 } from "lucide-react";

export function UpdateKehadiran({
  buttonTrigger,
  data,
}: {
  buttonTrigger: React.ReactNode;
  data: { status: string; id: string };
}) {
  const [status, setStatus] = useState(data.status ?? "");

  const { mutation } = useUpdateStatus();

  const onSubmit = () => {
    mutation.mutate({ status: status, id: data.id });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{buttonTrigger}</DialogTrigger>

      <DialogContent className="sm:max-w-sm gap-5">
        <DialogHeader>
          <DialogTitle>Edit Kehadiran</DialogTitle>
          <DialogDescription>
            Ubah status kehadiran siswa di sini. Klik simpan setelah selesai
            membuat perubahan.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div className="grid ">
            <div className="space-y-1.5">
              <Label>Status Kehadiran</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih status kehadiran" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="hadir">HADIR</SelectItem>
                  <SelectItem value="izin">IZIN</SelectItem>
                  <SelectItem value="sakit">SAKIT</SelectItem>
                  <SelectItem value="alpa">ALPA</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Footer dengan susunan button yang rapi */}
        <DialogFooter className="sm:justify-end gap-2 pt-2">
          <DialogClose asChild>
            <Button variant="outline" type="button">
              Batal
            </Button>
          </DialogClose>
          <Button onClick={onSubmit} disabled={mutation.isPending} type="submit">
            Simpan {mutation.isPending && <Loader2 className="animate-spin" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
