/* Card DB */
CREATE TABLE IF NOT EXISTS cards (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    descript TEXT NOT NULL,
    deadline TEXT NOT NULL,
    prioriti TEXT NOT NULL
);

/* Reminder DB */
CREATE TABLE IF NOT EXISTS reminders (
    r_id TEXT PRIMARY KEY,
    r_title TEXT NOT NULL,
    r_desc TEXT NOT NULL,
    r_color TEXT NOT NULL,
    r_remove_date DATE NOT NULL
);

/* Routine DB */
CREATE TABLE IF NOT EXISTS routine (
    ru_id TEXT PRIMARY KEY,
    ru_name TEXT NOT NULL,
    ru_desc TEXT NOT NULL,
    ru_time HOUR NOT NULL
);