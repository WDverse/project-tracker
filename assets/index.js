const dateEL = $ ("#date")
const timeEl = $("#time") 
const projectFormEl = $ ("#project-form")

const displayTime =  () => {
    const currDateAndTime = dayjs().format("MMM D, YYYY [at] hh:mm:ss a ")
    dateEL.text (currDateAndTime)
}
displayTime()
setInterval (displayTime, 1000)
