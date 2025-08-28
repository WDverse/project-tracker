const dateEL = $ ("#date")
const timeEl = $("#time") 
const projectFormEl = $ ("#project-form")
const projectNameInputEl = $("#project-name-input")
const projectTypeInputEl = $ ("#project-type-input")
const projectDateInputEl = $ ("#project-date-input")
const projectTableEl = $("#project-table")

const displayTime =  () => {
    const currDateAndTime = dayjs().format("MMM D, YYYY [at] hh:mm:ss a ")
    dateEL.text (currDateAndTime)
}

// read projects stored in localStorage and return array of project objects
const readStoredProjectData = () => {
    let projectData = localStorage.getItem('projects');
    // if there are exisiting projects in local storage, return array of project objects
    if (projectData) {
       projectData = JSON.parse(projectData);
       // otherwise return an empty array
    }else{
        projectData = [];
    }
    return projectData
}

// get projects array and save to localstorage
const storeProjectData = (projectData) => {
    localStorage.setItem('projects', JSON.stringify(projectData))
}

const handleFormSubmit = (event) => {
    event.preventDefault();
    const projectDetails = {
        name: projectNameInputEl.val().trim(),
        type: projectTypeInputEl.val(),
        date: projectDateInputEl.val()
    }

    const projects = readStoredProjectData();
    projects.push(projectDetails);

    storeProjectData(projectDetails);

clearFormInput()
}

// const printProjectToPage = () => {

//     const projectDate = dayjs(projectDetails.date)


//     const rowEl = $('<tr>');
//     const nameEl = $('<td>').text(projectDetails.name);
//     const typeEl = $('<td>').text(projectDetails.type);
//     const dateEl = $('<td>').text(projectDate.format('MM/DD/YYYY'));

//     rowEl.append(nameEl,typeEl,dateEl);
//     projectTableEl.append(rowEl)

    
// }

const clearFormInput = () => {
         projectNameInputEl.val("")
        projectTypeInputEl.val("")
        projectDateInputEl.val("")
    }

projectFormEl.on('submit', handleFormSubmit)

displayTime()
setInterval (displayTime, 1000)
