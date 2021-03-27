import fs from 'fs';


async function importGradesJSON () {
    let grades = await fs.promises.readFile('./db/grades.json', (err, res) => {
        return res;
    });
    return JSON.parse(grades);
    
}

async function saveNewGradesJSON (dataObj) {
    fs.promises.writeFile('./db/grades.json', JSON.stringify(dataObj));
}

const gradesGetAll = async (req, res, next) => {
    let data = await importGradesJSON()
    res.send(data);
}

const gradesInsert = async (req, res, next) => {
    let data = await importGradesJSON();
    let gradeToInsert = {
        id:  data.nextId + 1,
        student: req.query.student,
        subject: req.query.subject,
        type: req.query.type,
        value: parseInt(req.query.value),
        timestamp: new Date()
    }
    data.grades.push(gradeToInsert);
    data.nextId += 1
    saveNewGradesJSON(data);
    res.send(gradeToInsert)
}

const gradesUpdate = async (req, res, next) => {
    let idToUpdate = parseInt(req.query.id);
    let data = await importGradesJSON();
    let elementToUpdate = data.grades.filter((grade) => grade.id === idToUpdate);
    data.grades = data.grades.filter(grade => grade.id !== idToUpdate);
    if (elementToUpdate.length > 0){
        let elementToUpdate = {
            id: req.query.id,
            student: req.query.student,
            subject: req.query.subject,
            type: req.query.type,
            value: parseInt(req.query.value),
            timestamp: new Date()
        }
        data.grades.push(elementToUpdate);
        saveNewGradesJSON(data);
        res.send(data)
    } else {
        res.send('Elemento não encontrado');
    }
}

const gradesRemove = async (req, res, next) => {
    let idToRemove = parseInt(req.query.id);
    let data = await importGradesJSON();
    data.grades = data.grades.filter(grade => grade.id !== idToRemove);
    saveNewGradesJSON(data);
    res.send(data);
}

const gradesSearch = async (req, res, next) => {
    let idToSearch = parseInt(req.query.id);
    let data = await importGradesJSON();
    let searchedElement = data.grades.filter(grade => grade.id === idToSearch);
    res.send(searchedElement);
}

const sumStudentGrades = async (req, res, next) => {
    let acummulatedGrades = 0;
    let objToSearch = {
        student: req.query.student,
        subject: req.query.subject
    };
    let data = await importGradesJSON();
    let searchedElements = await data.grades.filter(grade => grade.student === objToSearch.student && grade.subject === objToSearch.subject);
    await searchedElements.forEach(element => {
        acummulatedGrades += element.value
    });
    console.log(acummulatedGrades)
    res.send(acummulatedGrades.toString());
}

const avgSubjectType = async (req, res, next) => {
    let acummulatedGrades = 0;
    let objToSearch = {
        subject: req.query.subject,
        type: req.query.type
    };
    let data = await importGradesJSON();
    let searchedElements = await data.grades.filter(grade => grade.type === objToSearch.type && grade.subject === objToSearch.subject);
    await searchedElements.forEach(element => {
        acummulatedGrades += element.value
    });
    let avgGrades = acummulatedGrades / searchedElements.length;
    res.send(avgGrades.toString());
}

const topSubjectTypeGrades = async (req, res, next) => {
    let objToSearch = {
        subject: req.query.subject,
        type: req.query.type
    };
    let data = await importGradesJSON();
    let searchedElements = await data.grades.filter(grade => grade.type === objToSearch.type && grade.subject === objToSearch.subject);
    let sortedByValue = await searchedElements.sort((a, b) => b.value - a.value);
    res.send(sortedByValue.slice(0, 3));
}

export { gradesGetAll, gradesInsert, gradesUpdate, gradesRemove, gradesSearch, sumStudentGrades, avgSubjectType, topSubjectTypeGrades };