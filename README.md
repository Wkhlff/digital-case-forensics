# SISTEM MANAJEMEN CASE

Program ini memungkinkan pengguna untuk mengelola data case digital forensics secara interaktif melalui terminal (CLI). Sistem menyediakan fitur CRUD (Create, Read, Update, Delete) serta fitur tambahan seperti validasi input, penyimpanan data ke file JSON, pengurutan case berdasarkan priority, dan filter case berdasarkan status.

## Fitur

- Menampilkan seluruh data case dalam bentuk tabel.
- Menambahkan case baru dengan validasi input otomatis.
- Menampilkan detail case tertentu berdasarkan Case ID.
- Memperbarui data case tertentu.
- Menghapus case berdasarkan Case ID.
- Mengurutkan seluruh case berdasarkan priority (Low, Medium, High).
- Menampilkan daftar case berdasarkan status (Open, In Progress, Close).
- Menyimpan seluruh data case ke file dataCase.json.
- Memuat data case dari dataCase.json saat program dijalankan.

## Cara Menjalankan
- Pastikan Node.js sudah terinstal.
- Buka terminal dan arahkan ke folder proyek.
- Ubah package.json agar menggunakan module.
- Jalankan program dengan : node main.js

## Format Data Penerbangan

Setiap data case disimpan dalam bentuk object di dalam array.

{
    caseId: "CASE-001",
    caseName: "Unauthorized Access Investigation",
    description: "Investigasi terhadap akses tidak sah pada sistem perusahaan.",
    investigatorId: "INV-001",
    priority: "High",
    status: "In Progress",
    createdAt: "2026-10-23T08:00:00"
}

## Struktur Project 
- `data.js`         -> Berisi array data case awal.
- `functions.js`    -> Berisi function CRUD dan fitur tambahan untuk pengelolaan case.
- `main.js`         -> Program utama interaktif berbasis CLI.
- `package.json`    -> Konfigurasi Node.js project.
- `dataCase.json`    -> File penyimpanan data case (otomatis dibuat).
- `README.md`       -> Penjelasan proyek.


## Penggunaan
1. Pilih menu 1-7 sesuai operasi yang diinginkan
2. Ikuti instruksi yang muncul di layar
3. Pilih 0 untuk keluar dari program

## Requirements

- Node.js v22.15.0
- Terminal/Command Prompt

## Author

- Nama: Muhammad Khalif
- Tema Proyek: Digital Case Forensics Management System.
- Kelas: Trial Study Club Backend Basic KSM Android UPNVJ 2026.
- Mentor: Nadia Jasmine Aulia