CREATE TABLE "student" (
    "id" INTEGER,
    "name" TEXT NOT NULL,
    "email" TEXT UNIQUE,
    "address" TEXT,
    PRIMARY KEY("id")
);

CREATE TABLE "course" (
    "id" TEXT,
    "name" TEXT NOT NULL,
    "credits" INTEGER NOT NULL,
    PRIMARY KEY("id")
);

CREATE TABLE "section" (
    "id" INTEGER,
    "course_id" TEXT,
    "semester" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "capacity" INTEGER NOT NULL DEFAULT 0,
    "max_capacity" INTEGER NOT NULL,
    PRIMARY KEY("id"),
    FOREIGN KEY("course_id") REFERENCES "course"("id"),
    CHECK (capacity <= max_capacity)
);

CREATE TABLE "registration" (
    "student_id" INTEGER,
    "section_id" INTEGER,
    "Grade" TEXT,
    PRIMARY KEY ("student_id", "section_id"),
    FOREIGN KEY("student_id") REFERENCES "student"("id"),
    FOREIGN KEY("section_id") REFERENCES "section"("id")
);

CREATE TRIGGER "prevent_over_enrollment"
BEFORE INSERT ON "registration"
FOR EACH ROW
BEGIN
    SELECT
        RAISE(ABORT, 'Section is full')
    WHERE
        (SELECT "capacity" FROM "section" WHERE id = NEW.section_id)
        >=
        (SELECT "max_capacity" FROM "section" WHERE id = NEW.section_id);
END;

CREATE TRIGGER "increment_capacity"
AFTER INSERT ON "registration"
FOR EACH ROW
BEGIN
    UPDATE "section" SET "capacity" = "capacity" + 1
    WHERE "id" = NEW.section_id;
END;
