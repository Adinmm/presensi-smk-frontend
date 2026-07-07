# Presensi SMK

Aplikasi presensi/kehadiran siswa untuk Sekolah Menengah Kejuruan. Dibangun dengan **React + Vite + TypeScript + Tailwind CSS + shadcn-style UI**.

## Fitur

- 🔐 **Login** (role Admin & Guru) dengan akun demo
- 📊 **Dashboard** statistik kehadiran hari ini
- ✅ **Presensi Harian** per kelas — Hadir / Izin / Sakit / Alpa, plus aksi massal
- 📜 **Riwayat Presensi** dengan filter (kelas, status, tanggal, pencarian)
- 👨‍🎓 **Manajemen Siswa** (CRUD lengkap)
- 🏫 **Manajemen Kelas** (CRUD lengkap)
- 📈 **Laporan Bulanan** rekap per siswa + persentase kehadiran
- 📤 **Export CSV** untuk riwayat & laporan
- 💾 **Backup & Reset Data**
- 📱 **Responsif** desktop & mobile

## Akun Demo

| Role  | Username | Password   |
| ----- | -------- | ---------- |
| Admin | `admin`  | `admin123` |
| Guru  | `guru`   | `guru123`  |

## Menjalankan

```bash
npm install
npm run dev
```

Build produksi:
```bash
npm run build
npm run preview
```

## Catatan

Data disimpan di **localStorage** browser — tidak ada backend. Cocok sebagai demo / starter. Untuk produksi, sambungkan ke backend (mis. Supabase, REST API, dsb.).
