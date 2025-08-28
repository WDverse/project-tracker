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

const printProjectToPage = (event) => {
    event.preventDefault();
    const projectDetails = {
        name: projectNameInputEl.val().trim(),
        type: projectTypeInputEl.val(),
        date: projectDateInputEl.val()
    }

    const projectDate = dayjs(projectDetails.date)


    const rowEl = $('<tr>');
    const nameEl = $('<td>').text(projectDetails.name);
    const typeEl = $('<td>').text(projectDetails.type);
    const dateEl = $('<td>').text(projectDate.format('MM/DD/YYYY'));

    rowEl.append(nameEl,typeEl,dateEl);
    projectTableEl.append(rowEl)

}

projectFormEl.on('submit', printProjectToPage)

displayTime()
setInterval (displayTime, 1000)
