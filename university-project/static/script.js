function searchCourse() {
    const rubric = document.getElementById("rubric").value
  
    if (rubric) {
        window.open(`/courses/search/results?rubric=${rubric}`, "_blank")
    }
    else {
        window.open(`/courses/search/results`, "_blank")
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
      tbody.innerHTML = "";

      if (data.courses && data.courses.length > 0) {
        data.courses.forEach(course => {
          const row = document.createElement("tr")
          row.innerHTML = `
            <td>${course.course_id}</td>
            <td>${course.name}</td>
            <td>${course.credits}</td>
          `;
          tbody.appendChild(row);
        });
      } else {
        const row = document.createElement("tr");
        row.innerHTML = `<td colspan="3">No courses found.</td>`
        tbody.appendChild(row);
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

    const Course = {
        "course_id": course_id,
        "name": name,
        "credits": credits
    }

    fetch('/api/add_course', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
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

    const Course = {
        "course_id": course_id
    }

    fetch('/api/delete_course', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
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

function toggleDropdown(event, id) {
    event.preventDefault()
    const dropdown = document.getElementById(id)
    dropdown.style.display = (dropdown.style.display === "block") ? "none" : "block"
  }
