"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bun_sqlite_1 = require("bun:sqlite");
const fs_1 = require("fs");
const db = new bun_sqlite_1.Database('database/tasks.db');
const schema_file = (0, fs_1.readFileSync)('database/db_schema.sql', 'utf8');
db.run(schema_file);
exports.default = db;
