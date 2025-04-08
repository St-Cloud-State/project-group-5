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

    cursor.execute("INSERT INTO student (name, email, address) VALUES (?, ?, ?)", (name, email, address))
    conn.commit()
    conn.close()

    return jsonify({'message': 'student added successfully'})
  except Exception as e:
    return jsonify({"error": str(e)})


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
      student_dict = {
        "student_id": student[0],
        "name": student[1],
        "email": student[2],
        "address": student[3]
      }

      student_list.append(student_dict)

    return jsonify({"students": student_list})

  except Exception as e:
    return jsonify({"error": str(e)})


@app.route("/api/add_course", methods=["POST"])
def add_course():
  try:
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()

    data = request.get_json()
    course_id = data.get("course_id")
    name = data.get("name")
    credits = data.get("credits")

    cursor.execute("INSERT INTO course (id, name, credits) VALUES (?, ?, ?)", (course_id, name, credits))
    conn.commit()
    conn.close()

    return jsonify({'message': 'course added successfully'})
  except Exception as e:
    return jsonify({"error": str(e)})


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
      course_dict = {
        "course_id": course[0],
        "name": course[1],
        "credits": course[2]
      }

      course_list.append(course_dict)

    return jsonify({"courses": course_list})

  except Exception as e:
    return jsonify({"error": str(e)})


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

    cursor.execute("INSERT INTO section (course_id, semester, year, max_capacity) VALUES (?, ?, ?, ?)", (course_id, semester, year, max_capacity))
    conn.commit()
    conn.close()

    return jsonify({'message': 'section added successfully'})
  except Exception as e:
    return jsonify({"error": str(e)})


@app.route("/api/sections", methods=["GET"])
def get_all_section():
  try:
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM section")
    sections = cursor.fetchall()
    conn.close()

    section_list = []

    for section in sections:
      section_dict = {
        "section_id": section[0],
        "course_id": section[1],
        "semester": section[2],
        "year": section[3],
        "capacity": section[4],
        "max_capacity": section[5]
      }

      section_list.append(section_dict)

    return jsonify({"sections": section_list})

  except Exception as e:
    return jsonify({"error": str(e)})

@app.route("/")
def hello():
  return render_template("index.html")

if __name__ == "__main__":
  app.run()
