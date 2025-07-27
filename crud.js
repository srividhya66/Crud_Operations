const apiUrl = "http://localhost:5000";

// Fetch Data
async function displayData() {
    const response = await fetch(`${apiUrl}/students`);
    const students = await response.json();

    const studentList = document.getElementById("studentList");
    studentList.innerHTML = students.length
        ? students.map(student => `<li>${student.registerNumber} - CGPA: ${student.cgpa}</li>`).join("")
        : "<li>No data available</li>";
}

// Insert Data
document.getElementById("insertForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    const registerNumber = document.getElementById("registerNumber").value;
    const cgpa = document.getElementById("cgpa").value;

    await fetch(`${apiUrl}/insert`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registerNumber, cgpa }),
    });

    this.reset();
    displayData();
});

// Update Data
document.getElementById("updateForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    const registerNumber = document.getElementById("updateRegisterNumber").value;
    const cgpa = document.getElementById("updateCgpa").value;

    await fetch(`${apiUrl}/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registerNumber, cgpa }),
    });

    this.reset();
    displayData();
});

// Delete Data
document.getElementById("deleteForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    const registerNumber = document.getElementById("deleteRegisterNumber").value;

    await fetch(`${apiUrl}/delete/${registerNumber}`, { method: "DELETE" });

    this.reset();
    displayData();
});

displayData();
