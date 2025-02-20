import Dexie from "dexie";

export const db = new Dexie("quizHistoryDB");

db.version(1).stores({
  attempts: "++id, score, total, percentage, date",
});