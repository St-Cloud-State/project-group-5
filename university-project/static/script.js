function searchCourse() {
    const rubric = document.getElementById("rubric").value

    if (rubric) {
        window.open(`/courses/search/results?rubric=${rubric}`, "_blank")
    } else {
        window.open(`/courses/search/results`, "_blank")
    }
}


function searchStudent() {
    const name = document.getElementById("name").value
    console.log(`${name}`)
    if (name) {
        window.open(`/students/search/results?name=${name}`, "_blank")
    } else {
        showSnackbar(`Enter a name`, 'error')
    }
}


async function fetchAndDisplayCourses() {
    const params = new URLSearchParams(window.location.search)
    const rubric = params.get("rubric")
    const url = rubric ? `/api/courses/${rubric}` : `/api/courses`

    try {
        const res = await fetch(url)
        const data = await res.json()

        const tbody = document.querySelector("#resultsTable tbody")
        tbody.innerHTML = ""

        if (data.courses && data.courses.length > 0) {
            data.courses.forEach(course => {
                const row = document.createElement("tr")
                row.innerHTML = `
                    <td>${course.course_id}</td>
                    <td>${course.name}</td>
                    <td>${course.credits}</td>
                `
                tbody.appendChild(row)
            })
        } else {
            const row = document.createElement("tr")
            row.innerHTML = `<td colspan="3">No courses found.</td>`
            tbody.appendChild(row)
        }
    } catch (err) {
        console.error("Failed to load courses:", err)
    }
}


function showSnackbar(message, type = '') {
    const snackbar = document.getElementById('snackbar')
    snackbar.textContent = message
    snackbar.className = 'snackbar show ' + type
    setTimeout(() => {
        snackbar.className = snackbar.className.replace('show', '')
    }, 3000)
}


function addCourse() {
    const course_id = document.getElementById('course_id').value
    const name = document.getElementById('name').value
    const credits = document.getElementById('credits').value

    const Course = { course_id, name, credits }

    fetch('/api/add_course', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Course)
    })
    .then(async response => {
        const data = await response.json()
        if (!response.ok) {
            showSnackbar(`Error: ${data.error || response.statusText}`, 'error')
        } else {
            showSnackbar(data.message || "Course added successfully", 'success')
        }
    })
    .catch(error => {
        showSnackbar(`Error adding course: ${error}`, 'error')
    })
}


function deleteCourse() {
    const course_id = document.getElementById('course_id').value

    const Course = { course_id }

    fetch('/api/delete_course', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Course)
    })
    .then(async response => {
        const data = await response.json()
        if (!response.ok) {
            showSnackbar(`Error: ${data.error || response.statusText}`, 'error')
        } else {
            showSnackbar(data.message || "Course deleted successfully", 'success')
        }
    })
    .catch(error => {
        showSnackbar(`Error deleting course: ${error}`, 'error')
    })
}


function addStudent() {
    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const address = document.getElementById('address').value

    const Student = { name, email, address }

    fetch('/api/add_student', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Student)
    })
    .then(async response => {
        const data = await response.json()
        if (!response.ok) {
            showSnackbar(`Error: ${data.error || response.statusText}`, 'error')
        } else {
            showSnackbar(data.message || "Student added successfully", 'success')
        }
    })
    .catch(error => {
        showSnackbar(`Error adding student: ${error}`, 'error')
    })
}


function deleteStudent() {
    const student_id = document.getElementById('id').value

    const Student = { student_id }

    fetch('/api/delete_student', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Student)
    })
    .then(async response => {
        const data = await response.json()
        if (!response.ok) {
            showSnackbar(`Error: ${data.error || response.statusText}`, 'error')
        } else {
            showSnackbar(data.message || "Student deleted successfully", 'success')
        }
    })
    .catch(error => {
        showSnackbar(`Error deleting student: ${error}`, 'error')
    })
}


async function fetchAndDisplayStudents() {
    const params = new URLSearchParams(window.location.search)
    const name = params.get("name")
    const url = name ? `/api/students/${name}` : `/api/students`

    try {
        const res = await fetch(url)
        const data = await res.json()

        const tbody = document.querySelector("#studentsTable tbody")
        tbody.innerHTML = ""

        if (data.students && data.students.length > 0) {
            data.students.forEach(student => {
                const row = document.createElement("tr")
                row.innerHTML = `
                    <td>${student.student_id}</td>
                    <td>${student.name}</td>
                    <td>${student.email}</td>
                    <td>${student.address}</td>
                `
                tbody.appendChild(row)
            })
        } else {
            const row = document.createElement("tr")
            row.innerHTML = `<td colspan="4">No students found.</td>`
            tbody.appendChild(row)
        }
    } catch (err) {
        console.error("Failed to load students:", err)
    }
}


function toggleDropdown(event, id) {
    event.preventDefault()
    const dropdown = document.getElementById(id)
    dropdown.style.display = (dropdown.style.display === "block") ? "none" : "block"
}


function addRegistration() {
    const student_id = document.getElementById("student_id").value
    const section_id = document.getElementById("section_id").value
    const Registration = { student_id, section_id }

    fetch("/api/add_registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Registration)
    })
    .then(async response => {
        const data = await response.json()
        if (!response.ok) {
            showSnackbar(`Error: ${data.error || response.statusText}`, "error")
        } else {
            showSnackbar(data.message || "Registration successful", "success")
        }
    })
    .catch(error => {
        showSnackbar(`Error adding registration: ${error}`, "error")
    })
}


function searchSection() {
    const section_id = document.getElementById("section_id").value
    if (section_id) {
        window.open(`/sections/search/results?section_id=${section_id}`, "_blank")
    } else {
        showSnackbar("Enter a section ID", "error")
    }
}


function updateSectionHeading() {
    const params = new URLSearchParams(window.location.search);
    const section_id = params.get("section_id");
    if (section_id) {
        const heading = document.getElementById("sectionStudentsHeading");
        heading.textContent = `Students in Section ID ${section_id}`;
    }
}


async function fetchAndDisplaySections() {
    const url = "/api/sections";
    try {
        const res = await fetch(url);
        const data = await res.json();
        const tbody = document.querySelector("#sectionsTable tbody");
        tbody.innerHTML = "";

        if (data.sections && data.sections.length > 0) {
            data.sections.forEach(sec => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${sec.section_id}</td>
                    <td>${sec.course_id}</td>
                    <td>${sec.semester}</td>
                    <td>${sec.year}</td>
                    <td>${sec.capacity}</td>
                    <td>${sec.max_capacity}</td>
                `;
                tbody.appendChild(row);
            });
        } else {
            const row = document.createElement("tr");
            row.innerHTML = `<td colspan="6">No sections found.</td>`;
            tbody.appendChild(row);
        }
    } catch (err) {
        console.error("Failed to load sections:", err);
    }
}


async function fetchAndDisplaySectionStudents() {
    const params = new URLSearchParams(window.location.search)
    const section_id = params.get("section_id")
    const url = `/api/sections/${section_id}/students`

    try {
        const res = await fetch(url)
        const data = await res.json()
        const tbody = document.querySelector("#sectionStudentsTable tbody")
        tbody.innerHTML = ""

        if (data.students && data.students.length > 0) {
            data.students.forEach(s => {
                const row = document.createElement("tr")
                row.innerHTML = `
                    <td>${s.student_id}</td>
                    <td>${s.name}</td>
                    <td>${s.email}</td>
                    <td>${s.address}</td>
                    <td>${s.grade}</td>
                `
                tbody.appendChild(row)
            })
        } else {
            const row = document.createElement("tr")
            row.innerHTML = `<td colspan="5">No students found.</td>`
            tbody.appendChild(row)
        }
    } catch (err) {
        console.error("Failed to load section students:", err)
    }
}


function searchStudentCourses() {
    const student_id = document.getElementById("student_id").value
    if (student_id) {
        window.open(`/students/courses/results?student_id=${student_id}`, "_blank")
    } else {
        showSnackbar("Enter a student ID", "error")
    }
}


async function fetchAndDisplayStudentCourses() {
    const params = new URLSearchParams(window.location.search)
    const student_id = params.get("student_id")
    const url = `/api/students/${student_id}/courses`

    try {
        const res = await fetch(url)
        const data = await res.json()
        const tbody = document.querySelector("#coursesByStudentTable tbody")
        tbody.innerHTML = ""

        if (data.courses && data.courses.length > 0) {
            data.courses.forEach(c => {
                const row = document.createElement("tr")
                row.innerHTML = `
                    <td>${c.course_id}</td>
                    <td>${c.name}</td>
                    <td>${c.credits}</td>
                    <td>${c.section_id}</td>
                    <td>${c.semester}</td>
                    <td>${c.year}</td>
                    <td>${c.grade}</td>
                `
                tbody.appendChild(row)
            })
        } else {
            const row = document.createElement("tr")
            row.innerHTML = `<td colspan="7">No courses found.</td>`
            tbody.appendChild(row)
        }
    } catch (err) {
        console.error("Failed to load student courses:", err)
    }
}


function updateStudentCoursesHeading() {
    const params = new URLSearchParams(window.location.search);
    const student_id = params.get("student_id");
    if (student_id) {
        const heading = document.getElementById("studentCoursesHeading");
        heading.textContent = `Courses for Student ID ${student_id}`;
    }
}


function addSection() {
    const course_id    = document.getElementById("course_id").value;
    const semester     = document.getElementById("semester").value;
    const year         = document.getElementById("year").value;
    const max_capacity = document.getElementById("max_capacity").value;
    const Section = { course_id, semester, year, max_capacity };

    fetch("/api/add_section", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Section)
    })
    .then(async response => {
        const data = await response.json();
        if (!response.ok) {
            showSnackbar(`Error: ${data.error || response.statusText}`, "error");
        } else {
            showSnackbar(data.message || "Section added successfully", "success");
        }
    })
    .catch(error => {
        showSnackbar(`Error adding section: ${error}`, "error");
    });
}


function searchCourseSections() {
    const course_id = document.getElementById("course_id").value;
    if (course_id) {
        window.open(`/sections/course/results?course_id=${course_id}`, "_blank");
    } else {
        showSnackbar("Enter a course ID", "error");
    }
}


function updateCourseSectionsHeading() {
    const params = new URLSearchParams(window.location.search);
    const course_id = params.get("course_id");
    if (course_id) {
        const heading = document.getElementById("courseSectionsHeading");
        heading.textContent = `Sections for Course ID ${course_id}`;
    }
}


async function fetchAndDisplayCourseSections() {
    const params = new URLSearchParams(window.location.search);
    const course_id = params.get("course_id");
    const url = `/api/sections/${course_id}`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        const tbody = document.querySelector("#courseSectionsTable tbody");
        tbody.innerHTML = "";

        if (data.sections && data.sections.length > 0) {
            data.sections.forEach(sec => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${sec.section_id}</td>
                    <td>${sec.course_id}</td>
                    <td>${sec.semester}</td>
                    <td>${sec.year}</td>
                    <td>${sec.capacity}</td>
                    <td>${sec.max_capacity}</td>
                `;
                tbody.appendChild(row);
            });
        } else {
            const row = document.createElement("tr");
            row.innerHTML = `<td colspan="6">No sections found.</td>`;
            tbody.appendChild(row);
        }
    } catch (err) {
        console.error("Failed to load course sections:", err);
    }
}
