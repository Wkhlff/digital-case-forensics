import fs from "fs";
import { cases } from "./data.js";

function isValidStatus(statusStr) {
  if (typeof statusStr !== "string") return false;
  
  const validStatuses = ["open", "close", "in progress"];
  return validStatuses.includes(statusStr.trim().toLowerCase());
}

function isValidPriority(priorityStr) {
  if (typeof priorityStr !== "string") return false;
  
  const validStatuses = ["low", "medium", "high"];
  return validStatuses.includes(priorityStr.trim().toLowerCase());
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
export const addCase = ({
    caseId,
    caseName,
    description,
    investigatorId,
    priority,
    status,
    createdAt
}) => {
    if (
        !caseId?.trim() ||
        !caseName?.trim() ||
        !description?.trim() ||
        !investigatorId?.trim() ||
        !priority?.trim() ||
        !status?.trim() ||
        !createdAt?.trim()
    ) {
        console.log("Semua field wajib diisi!");
        return;
    }

    if (!isValidStatus(status)) {
        console.log("Status tidak valid! Gunakan: Open, Close, atau In Progress.");
        return;
    }

    if (!isValidPriority(priority)) {
        console.log("Priority tidak valid! Gunakan: Low, Medium, atau High.");
        return;
    }

    if (!isValidDateTime(createdAt)) {
        console.log("Format waktu tidak valid! Gunakan format tanggal yang valid.");
        return;
    }

    const exists = cases.some(
        (item) => item.caseId.toLowerCase() === caseId.trim().toLowerCase()
    );

    if (exists) {
        console.log(`ID Case ${caseId} sudah ada!`);
        return;
    }

    cases.push({
        caseId: caseId.trim(),
        caseName: caseName.trim(),
        description: description.trim(),
        investigatorId: investigatorId.trim(),
        priority: priority.trim(),
        status: status.trim(),
        createdAt: createdAt.trim()
    });

    saveCaseToFile();
    console.log(`Case ${caseId} berhasil ditambahkan.`);
};

//Read All Case
export const getAllCases = () => {
    if (cases.length === 0) {
        console.log("Belum ada data case.");
        return [];
    }

    const caseList = [];

    for (const { caseId, caseName, status } of cases) {
        caseList.push({ caseId, caseName, status });
    }

    console.log("Daftar Semua Case:");
    console.table(caseList);
    return caseList;
};

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
export const updateCase = (id, updatedData) => {
    const index = cases.findIndex(
        (item) => item.caseId.toLowerCase() === id.trim().toLowerCase()
    );

    if (index === -1) {
        console.log(`Case dengan ID ${id} tidak ditemukan.`);
        return;
    }

    const cleanedData = Object.fromEntries(
        Object.entries(updatedData)
            .filter(([, value]) => typeof value === "string" && value.trim() !== "")
            .map(([key, value]) => [key, value.trim()])
    );

    if (Object.keys(cleanedData).length === 0) {
        console.log("Tidak ada perubahan yang dimasukkan.");
        return;
    }

    if (cleanedData.status && !isValidStatus(cleanedData.status)) {
        console.log("Status tidak valid! Gunakan: Open, Close, atau In Progress.");
        return;
    }

    if (cleanedData.priority && !isValidPriority(cleanedData.priority)) {
        console.log("Priority tidak valid! Gunakan: Low, Medium, atau High.");
        return;
    }
  }

//Delete Case
export function deleteCase(id) {
  const index = cases.findIndex(f => f.caseId.toLowerCase() === id.toLocaleLowerCase());
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