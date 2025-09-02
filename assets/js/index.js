const dateEl = $("#date");
const timeEl = $("#time");
const projectFormEl = $("#project-form");
const projectNameInputEl = $("#project-name-input");
const projectTypeInputEl = $("#project-type-input");
const projectDateInputEl = $("#project-date-input");
const projectTableEl = $("#project-table");

const displayTime = () => {
  const currDateAndTime = dayjs().format("MMM D, YYYY [at] hh:mm:ss a ");
  dateEl.text(currDateAndTime);
};

// read projects stored in localStorage and return array of project objects
const readStoredProjectData = () => {
  let projectData = localStorage.getItem("projects");
  // if there are exisiting projects in local storage, return array of project objects
  if (projectData) {
    projectData = JSON.parse(projectData);
    // otherwise return an empty array
  } else {
    projectData = [];
  }
  return projectData;
};

// get projects array and save to localstorage
const storeProjectData = (projectData) => {
  localStorage.setItem("projects", JSON.stringify(projectData));
};


const printProjectToPage = () => {
    projectTableEl.empty();
    
    const projects = readStoredProjectData();
    
    for (let i = 0; i < projects.length; i++) {
        let project = projects[i];
        let projectDate = dayjs(project.date);
        let today = dayjs().startOf("day");
        
        const rowEl = $("<tr>");
        const nameEl = $("<td>");
        const typeEl = $("<td>");
        const projectDateEl = $("<td>");
        const deleteBtnEl = $(`<td><button  class="btn btn-sm btn-delete-project custom-dlt-btn" data-index = "${i}">X</button></td>`);
        
        nameEl.text(project.name);
        typeEl.text(project.type);
        projectDateEl.text(projectDate.format("MM/DD/YYYY"));
        
        rowEl.append(nameEl, typeEl, projectDateEl, deleteBtnEl);
        
        projectTableEl.append(rowEl);
        
        if (projectDate.isBefore(today)) {
            rowEl.addClass("late");
        } else if (projectDate.isSame(today)) {
            rowEl.addClass("due-today");
        }
    }
};

const handleDeleteProject =  (event) =>  {
  const {target} = event;
    const projectIndex = parseInt(target.getAttribute('data-index'));
    const projects = readStoredProjectData();
    projects.splice(projectIndex, 1);
    storeProjectData(projects);
    printProjectToPage()
}

const handleFormSubmit = (event) => {
  event.preventDefault();
  
  const projectName = projectNameInputEl.val().trim();
  const projectType = projectTypeInputEl.val();
  const projectDate = projectDateInputEl.val();

  const projectDetails = {
    name: projectName,
    type: projectType,
    date: projectDate
  };

  const projects = readStoredProjectData();
  projects.push(projectDetails);

  storeProjectData(projects);

  clearFormInput();
  printProjectToPage();
};

const clearFormInput = () => {
  projectNameInputEl.val("");
  projectTypeInputEl.val("");
  projectDateInputEl.val("");
};

projectFormEl.on("submit", handleFormSubmit);

projectTableEl.on ('click', '.btn-delete-project', handleDeleteProject)

displayTime();
setInterval(displayTime, 1000);
printProjectToPage();
