import fs from "fs";
import { cases } from "./data.js";

function isValidStatus(statusStr) {
  if (typeof statusStr !== "string") return false;
  
  const validStatuses = ["open", "close", "in progress"];
  return validStatuses.includes(statusStr.trim().toLowerCase());
}

function isValidDateTime(dateTimeStr) {
  return !isNaN(Date.parse(dateTimeStr));
}

export function saveCaseToFile() {
  fs.writeFileSync("dataCase.json", JSON.stringify(cases, null, 2));
  console.log("Data case berhasil disimpan ke dataCase.json");
}

export function loadCaseFromFile() {
  if (fs.existsSync("dataCase.json")) {
    const data = fs.readFileSync("dataCase.json");
    const loaded = JSON.parse(data);
    cases.splice(0, cases.length, ...loaded); // replace isi array
    console.log("Data case berhasil dimuat dari file.");
  } else {
    console.log("Belum ada file data yang tersimpan.");
  }
}

// Add Case
export function addCase(newCase) {
    if (
        !newCase.caseId ||
        !newCase.caseName ||
        !newCase.description ||
        !newCase.investigatorId ||
        !newCase.priority ||
        !newCase.status ||
        !newCase.createdAt
    ) {
        console.log("Semua field wajib diisi!");
        return;
    }

    if (!isValidStatus(newCase.status)) {
        console.log("Status tidak valid! Gunakan: open, close, atau in progress.");
        return;
    }

    if (!isValidDateTime(newCase.createdAt)) {
        console.log("Format waktu tidak valid! Gunakan format: YYYY-MM-DDTHH:MM:SS");
        return;
    }

    const exists = cases.find(c => c.caseId === newCase.caseId);
    if (exists) {
        console.log(`ID Case ${newCase.caseId} sudah ada!`);
        return;
    }

    cases.push(newCase);
    saveCaseToFile();

    console.log(`Case ${newCase.caseId} berhasil ditambahkan.`);
}

//Read All Case
export function getAllCases() {
    console.log("Daftar Semua Case:");

    const caseList = cases.map(c => ({
        caseId: c.caseId,
        caseName: c.caseName,
        status: c.status
    }));

    console.table(caseList);

    return caseList;
}

//Get Case by Id
export function getCaseById(id) {
  const caseFound = cases.find(f => 
    f.caseId.toLocaleLowerCase() === id.toLocaleLowerCase());
  if (!caseFound) {
    console.log(`Case dengan Id ${id} tidak ditemukan.`);
    return null;
  }
  console.table([caseFound]);
  return caseFound;
}

//Update Case
export function updateCase(id, updatedData) {
  const index = cases.findIndex(f => 
    f.caseId.toLocaleLowerCase() === id.toLocaleLowerCase());
  if (index === -1) {
    console.log(`Tidak ada case id dengan id ${id}.`);
    return;
  }

  if (updatedData.status && !isValidStatus(updatedData.status)) {
    console.log("Format status tidak valid!");
    return;
  }

  cases[index] = { ...cases[index], ...updatedData };
  saveCaseToFile();
  console.log(`Data Case ${id} berhasil diperbarui.`);
}

//Delete Case
export function deleteCase(id) {
  const index = cases.findIndex(f => f.caseId === id);
  if (index === -1) {
    console.log(`Tidak ada case dengan id ${id}.`);
    return;
  }
  cases.splice(index, 1);
  saveCaseToFile();
  console.log(`Case ${id} berhasil dihapus.`);
}

// Filter by Status
export function filterByStatus(inputStatus) {
    const filtered = cases.filter(f =>
        f.status.toLowerCase() === inputStatus.toLowerCase()
    );

    const caseList = filtered.map(c => ({
        caseId: c.caseId,
        caseName: c.caseName,
        description: c.description,
        status: c.status
    }));

    console.log(`Daftar Status Case ${inputStatus}:`);
    console.table(caseList);

    return caseList;
}

// Sort by Priority
export function sortCasesByPriority() {
    const priorityOrder = {
        low: 3,
        medium: 2,
        high: 1
    };

    const sorted = [...cases].sort((a, b) => {
        const priorityA = priorityOrder[a.priority.trim().toLowerCase()];
        const priorityB = priorityOrder[b.priority.trim().toLowerCase()];

        return priorityA - priorityB;
    });

    console.log("Case diurutkan berdasarkan priority:");
    console.table(sorted);

    return sorted;
}