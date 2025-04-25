from flask import Flask, jsonify, render_template, request
import sqlite3

app = Flask(__name__)

DATABASE = "./university.db"


@app.route("/api/add_student", methods=["POST"])
def add_student():
    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()

        data = request.get_json()
        name = data.get("name")
        email = data.get("email")
        address = data.get("address")

        if not (name and email and address):
            raise ValueError("All fields are required")

        cursor.execute(
            "INSERT INTO student (name, email, address) VALUES (?, ?, ?)",
            (name, email, address)
        )
        conn.commit()
        conn.close()

        return jsonify({'message': 'Student added successfully'}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.route("/api/students", methods=["GET"])
def get_all_students():
    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM student")
        students = cursor.fetchall()
        conn.close()

        student_list = []
        for student in students:
            student_list.append({
                "student_id": student[0],
                "name": student[1],
                "email": student[2],
                "address": student[3]
            })

        return jsonify({"students": student_list}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.route("/api/students/<name>", methods=["GET"])
def get_students_by_name(name):
    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        cursor.execute(
            "SELECT * FROM student WHERE name LIKE ?",
            (f"{name}%",)
        )
        students = cursor.fetchall()
        conn.close()

        student_list = []
        for student in students:
            student_list.append({
                "student_id": student[0],
                "name": student[1],
                "email": student[2],
                "address": student[3]
            })

        return jsonify({"students": student_list}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.route("/api/delete_student", methods=["DELETE"])
def delete_student():
    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()

        data = request.get_json()
        student_id = data.get("student_id")
        if not student_id:
            raise ValueError("Student ID was not entered")

        cursor.execute("DELETE FROM student WHERE id = ?", (student_id,))
        conn.commit()
        conn.close()

        return jsonify({'message': 'Student deleted successfully'}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.route("/api/add_course", methods=["POST"])
def add_course():
    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()

        data = request.get_json()
        course_id = data.get("course_id")
        name = data.get("name")
        credits = data.get("credits")

        if not (course_id and name and credits):
            raise ValueError("All fields are required")

        cursor.execute(
            "INSERT INTO course (id, name, credits) VALUES (?, ?, ?)",
            (course_id, name, credits)
        )
        conn.commit()
        conn.close()

        return jsonify({'message': 'Course added successfully'}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.route("/api/courses", methods=["GET"])
def get_all_courses():
    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM course")
        courses = cursor.fetchall()
        conn.close()

        course_list = []
        for course in courses:
            course_list.append({
                "course_id": course[0],
                "name": course[1],
                "credits": course[2]
            })

        return jsonify({"courses": course_list}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.route("/api/courses/<rubric>", methods=["GET"])
def get_courses_by_rubric(rubric):
    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        cursor.execute(
            "SELECT * FROM course WHERE id LIKE ?",
            (f"{rubric}%",)
        )
        courses = cursor.fetchall()
        conn.close()

        course_list = []
        for course in courses:
            course_list.append({
                "course_id": course[0],
                "name": course[1],
                "credits": course[2]
            })

        return jsonify({"courses": course_list}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.route("/api/delete_course", methods=["DELETE"])
def delete_course():
    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()

        data = request.get_json()
        course_id = data.get("course_id")
        if not course_id:
            raise ValueError("Course ID was not entered")

        cursor.execute("DELETE FROM course WHERE id = ?", (course_id,))
        conn.commit()
        conn.close()

        return jsonify({'message': 'Course deleted successfully'}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.route("/api/add_section", methods=["POST"])
def add_section():
    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()

        data = request.get_json()
        course_id = data.get("course_id")
        semester = data.get("semester")
        year = data.get("year")
        max_capacity = data.get("max_capacity")

        cursor.execute(
            "INSERT INTO section (course_id, semester, year, max_capacity) VALUES (?, ?, ?, ?)",
            (course_id, semester, year, max_capacity)
        )
        conn.commit()
        conn.close()

        return jsonify({'message': 'Section added successfully'}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.route("/api/sections", methods=["GET"])
def get_all_sections():
    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM section")
        sections = cursor.fetchall()
        conn.close()

        section_list = []
        for section in sections:
            section_list.append({
                "section_id": section[0],
                "course_id": section[1],
                "semester": section[2],
                "year": section[3],
                "capacity": section[4],
                "max_capacity": section[5]
            })

        return jsonify({"sections": section_list}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.route("/api/sections/<course_id>", methods=["GET"])
def get_sections_by_course(course_id):
    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        cursor.execute(
            "SELECT * FROM section WHERE course_id = ?",
            (course_id,)
        )
        sections = cursor.fetchall()
        conn.close()

        section_list = []
        for section in sections:
            section_list.append({
                "section_id": section[0],
                "course_id": section[1],
                "semester": section[2],
                "year": section[3],
                "capacity": section[4],
                "max_capacity": section[5]
            })

        return jsonify({"sections": section_list}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.route("/api/add_registration", methods=["POST"])
def add_registration():
    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()

        data = request.get_json()
        student_id = data.get("student_id")
        section_id = data.get("section_id")

        if not (student_id and section_id):
            raise ValueError("Both student_id and section_id are required")

        cursor.execute(
            "INSERT INTO registration (student_id, section_id) VALUES (?, ?)",
            (student_id, section_id)
        )
        conn.commit()
        conn.close()

        return jsonify({"message": "Registration successful"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.route("/api/sections/<int:section_id>/students", methods=["GET"])
def get_students_by_section(section_id):
    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        cursor.execute("""
            SELECT s.id, s.name, s.email, s.address, r.Grade
            FROM student s
            JOIN registration r ON s.id = r.student_id
            WHERE r.section_id = ?
        """, (section_id,))
        rows = cursor.fetchall()
        conn.close()

        student_list = []
        for row in rows:
            student_list.append({
                "student_id": row[0],
                "name": row[1],
                "email": row[2],
                "address": row[3],
                "grade": row[4]
            })

        return jsonify({"students": student_list}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.route("/api/students/<int:student_id>/courses", methods=["GET"])
def get_courses_by_student(student_id):
    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        cursor.execute("""
            SELECT c.id, c.name, c.credits,
                   sec.id AS section_id, sec.semester, sec.year,
                   r.Grade
            FROM course c
            JOIN section sec ON c.id = sec.course_id
            JOIN registration r ON sec.id = r.section_id
            WHERE r.student_id = ?
        """, (student_id,))
        rows = cursor.fetchall()
        conn.close()

        course_list = []
        for row in rows:
            course_list.append({
                "course_id": row[0],
                "name": row[1],
                "credits": row[2],
                "section_id": row[3],
                "semester": row[4],
                "year": row[5],
                "grade": row[6]
            })

        return jsonify({"courses": course_list}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/courses/search")
def search_course():
    return render_template("search_course.html")


@app.route("/courses/search/results")
def search_course_results():
    return render_template("search_course_results.html")


@app.route("/courses/add")
def course_add():
    return render_template("add_course.html")


@app.route("/courses/remove")
def remove_course():
    return render_template("remove_course.html")


@app.route("/students/add")
def student_add():
    return render_template("add_student.html")


@app.route("/students/remove")
def remove_student():
    return render_template("remove_student.html")


@app.route("/students/")
def students():
    return render_template("student_view.html")


@app.route("/students/search")
def search_student():
    return render_template("search_student.html")


@app.route("/students/search/results")
def search_student_results():
    return render_template("search_student_results.html")


@app.route("/registrations/add")
def registration_add():
    return render_template("add_registration.html")


@app.route("/sections")  
def sections_view():
    """New view-all-sections page"""
    return render_template("sections_view.html")


@app.route("/sections/search")
def search_section():
    return render_template("search_section.html")


@app.route("/sections/search/results")
def search_section_results():
    return render_template("search_section_results.html")


@app.route("/students/courses")
def search_student_courses():
    return render_template("search_student_courses.html")


@app.route("/students/courses/results")
def student_courses_results():
    return render_template("search_student_courses_results.html")


if __name__ == "__main__":
    app.run()
