import readline from "node:readline";
import {
    loadCaseFromFile,
    addCase,
    getAllCases,
    getCaseById,
    updateCase,
    deleteCase,
    filterByStatus,
    sortCasesByPriority
} from "./function.js";

loadCaseFromFile();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function showMenu() {
  console.log(`
╔══════════════════════════════════════════╗
║       💻 DIGITAL CASE FORENSICS          ║
║              MANAGEMENT                  ║
╠══════════════════════════════════════════╣
║                                          ║
║  CASE MANAGEMENT                         ║
║  [1] Tambah Case                         ║
║  [2] Lihat Daftar Case                   ║
║  [3] Lihat Detail Case                   ║
║  [4] Edit Case                           ║
║  [5] Hapus Case                          ║
║                                          ║
║  CASE TOOLS                              ║
║  [6] Urutkan Case berdasarkan Priority   ║
║  [7] Filter Case berdasarkan Status      ║
║                                          ║
╠══════════════════════════════════════════╣
║  [0] Keluar                              ║
╚══════════════════════════════════════════╝
`);
}

function askMenu() {
  rl.question("Pilih menu (0-7): ", (choice) => {
    switch (choice) {
      case "1":
        rl.question("Masukkan Id Case: ", (caseId) => {
          rl.question("Masukkan Nama Case: ", (caseName) => {
            rl.question("Masukkan Deskripsi: ", (description) => {
              rl.question("Masukkan Id Invertigator: ", (investigatorId) => {
                rl.question("Masukkan Priority: ", (priority) => {
                  rl.question("Masukkan Status: ", (status) => {
                    rl.question("Masukkan Waktu: ", (createdAt) => {
                      addCase({
                        caseId,
                        caseName,
                        description,
                        investigatorId,
                        priority,
                        status,
                        createdAt,
                      });
                      askMenu();
                    })
                  })
                })
              });
            });
          });
        });
        break;

      case "2":
        getAllCases();
        return askMenu();
      
      case "3":
        rl.question("Masukkan Id Case: ", (id) => {
          getCaseById(id);
          askMenu();
        });
        break;
      
      case "4":
        rl.question("Masukkan Id Case yang Ingin Diubah: ", (id) => {
          rl.question("Masukkan Status Baru (Open, In Progress, Close): ", (status) => {
            updateCase(id, { status });
            askMenu();
          });
        });
        break;

      case "5":
        rl.question("Masukkan Id Case yang Ingin Dihapus: ", (id) => {
          deleteCase(id);
          askMenu();
        });
        break;

      case "6":
        rl.question("Masukkan Status Case: ", (status) => {
          filterByStatus(status);
          askMenu();
        });
        break;

      case "7":
        sortCasesByPriority();
        askMenu();
        break;

      case "0":
        console.log("Keluar dari sistem. Terima kasih!");
        rl.close();
        showMenu();
        break;

      default:
        console.log("Pilihan tidak valid, coba lagi!");
        askMenu();
        break;
    }
  });
}

// Jalankan program
showMenu();
askMenu();