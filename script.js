const btnAddStudent = document.querySelector("#btnAddStudent")
const name = document.querySelector("#name")
const surname = document.querySelector("#surname")
const list = document.querySelector(".list-container")
const error = document.querySelector("#error")
const dialogSelect = document.querySelector('.grade-selection')
const gradeInput = dialogSelect.querySelector('#grade')
const submitGrade = dialogSelect.querySelector('#submitGrade')
const closeSelection = dialogSelect.querySelector('#close');
const gradeSubmitError = dialogSelect.querySelector('#dialog-error')
const dialogShow = document.querySelector(".grade-showcase")
const showName = dialogShow.querySelector("#show-name")
const showGradesText = dialogShow.querySelector("#show-grades-text")
const closeShowcase = dialogShow.querySelector("#close")

class Student{
    constructor(id, name, surname) {
        this.id = id
        this.name = name
        this.surname = surname
        this.grades = []
        this.avg = 0.0
    }

}
let currentId = 0;
let studentList = JSON.parse(localStorage.getItem('students') || "[]");

const addStudent = () =>{
    error.style.visibility = "hidden"
    if(name.value == "" || surname.value == ""){
        error.textContent = "Uzupełnij dane!"
        error.style.visibility = "visible"
        return
    }

   studentList.push(new Student(new Date().getTime(), name.value, surname.value))
   localStorage.setItem('students', JSON.stringify(studentList));
   writeList();
}
const writeList = () =>{
    list.innerHTML = `<div class="list-description">
                <p>Imię:</p>
                <p>Nazwisko:</p>
                <p>Średnia:</p>
                <div></div>
                <div></div>
            </div>`;
    studentList.forEach(write = (obj) =>{
        list.innerHTML += `<div class="student">
                    <p>${obj.name}</p>
                    <p>${obj.surname}</p>
                    <p class-"avg">${obj.avg.toFixed(2)}</p>
                    <button class="btnAddGrade" onclick="showGradeSelector(${obj.id})">Dodaj ocenę</button>
                    <button class="btnShowGrades" onclick="showGrades(${obj.id})">Pokaż oceny</button>
                    <button class="btnDelete" onclick="deleteStudent(${obj.id})">Usuń ucznia</button>
                </div>`
    })
    
}
const addGrade = () =>{
    gradeSubmitError.style.visibility = "hidden"
    if(gradeInput.value == ""){
        gradeSubmitError.textContent = "Wprowadź ocenę!"
        gradeSubmitError.style.visibility = "visible"
        return
    }
    studentList.find(e => e.id === currentId).grades.push(parseInt(gradeInput.value));
    let sum = 0.0;
    studentList.find(e => e.id === currentId).grades.forEach(getAvg = (num) =>{
        sum += num
    })
    studentList.find(e => e.id === currentId).avg = sum / studentList.find(ee => ee.id === currentId).grades.length;
    localStorage.setItem('students', JSON.stringify(studentList));
    writeList();
    closeGradeSelection()
}
const closeGradeSelection = () =>{
    dialogSelect.close();
    gradeSubmitError.style.visibility = "hidden"
    gradeInput.value = ""
}
const showGradeSelector = (id) =>{
    currentId = id
    dialogSelect.showModal()
}
const closeGradeShowcase = () =>{
    dialogShow.close();
}
const showGrades = (id) =>{
    showGradesText.textContent = ""
    let text = ""
    showName.textContent = `${studentList.find(e => e.id === id).name} ${studentList.find(e => e.id === id).surname}`
    studentList.find(e => e.id === id).grades.forEach(writeGrades = (grade) =>{
        text += `${grade}, `
    })
    showGradesText.textContent = text.slice(0, text.length - 2)
    dialogShow.showModal();
}

const deleteStudent =(id) =>{
    studentList = studentList.filter(e => e.id !== id);
    localStorage.setItem('students', JSON.stringify(studentList));
    writeList();
}

writeList();
btnAddStudent.addEventListener('click', addStudent)