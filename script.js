const btnAddStudent = document.querySelector("#btnAddStudent")
const name = document.querySelector("#name")
const surname = document.querySelector("#surname")
const list = document.querySelector(".list-container")
const error = document.querySelector("#error")

let idCount = 0;
class Student{
    constructor(id, name, surname) {
        this.id = id
        this.name = name
        this.surname = surname
        this.grades = []
        this.avg = 0.0
    }

}
const studentList = [];

const addStudent = () =>{
    error.style.visibility = "hidden"
    if(name.value == "" || surname.value == ""){
        error.textContent = "Uzupełnij dane!"
        error.style.visibility = "visible"
        return
    }
   studentList.push(new Student(idCount, name.value, surname.value))
   idCount++;
   writeList();
}
const writeList = () =>{
    list.innerHTML = "";
    studentList.forEach(write = (obj) =>{
        list.innerHTML += `<div class="student">
                    <p>ID:${obj.id}</p>
                    <p>${obj.name}</p>
                    <p>${obj.surname}</p>
                    <p class-"avg">${obj.avg}</p>
                    <button class="btnAddGrade">Dodaj ocenę</button>
                    <button class="btnShowGrades">Pokaż oceny</button>
                    <button class="btnDelete">Usuń ucznia</button>
                </div>`
    })
    
}
const addGrade = () =>{
    console.log("dddd");
}
const showGrades = () =>{

}
const deleteStudent =() =>{

}


btnAddStudent.addEventListener('click', addStudent)