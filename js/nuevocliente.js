// SELECTORS.
const inputName = document.querySelector("#nombre")
const inputEmail = document.querySelector("#email")
const inputPhone = document.querySelector("#telefono")
const inputCompanyName = document.querySelector("#empresa")
const formulario = document.querySelector("#formulario")

// VARIABLES.

let id = 0

// REGEX.
const nameRegex = /^[A-Za-zñÑÁáÉéÍíÓóÚú ]{3,}$/ // La usaremos para name y para companyName.
const emailRegex = /^[A-Za-zñÑÁáÉéÍíÓóÚú0-9_\.\-]{3,}@[A-Za-zñÑÁáÉéÍíÓóÚú0-9_\.\-]{3,}\.(com|es)$/
const phoneRegex = /^[0-9]{9}$/

// FUNCTIONS.

const checkName = () => {
    if(!nameRegex.test(inputName.value)){
        console.error("ERROR. The name isn't valid.")
        inputName.style.border = "2px solid red"
    } else {
        inputName.style.border = "1px solid #e2e8f0"
        return true
    }
}

const checkEmail = () => {
    if(!emailRegex.test(inputEmail.value)){
        console.error("ERROR. The email isn't valid.")
        inputEmail.style.border = "2px solid red"
    } else {
        inputEmail.style.border = "1px solid #e2e8f0"
        return true
    } 
}

const checkPhone = () => {
    if(!phoneRegex.test(inputPhone.value)){
        console.error("ERROR. The phone number isn't valid.")
        inputPhone.style.border = "2px solid red"
    } else {
        inputPhone.style.border = "1px solid #e2e8f0"
        return true
    } 
}

const checkCompanyName = () => {
    if(!nameRegex.test(inputCompanyName.value)){ // Usamos nameRegex para no duplicar expresiones regulares.
        console.error("ERROR. The company name isn't valid.")
        inputCompanyName.style.border = "2px solid red"
    } else {
        inputCompanyName.style.border = "1px solid #e2e8f0"
        return true
    } 
}

// LISTENERS.

inputName.addEventListener("blur", checkName)

inputEmail.addEventListener("blur", checkEmail)

inputPhone.addEventListener("blur", checkPhone)

inputCompanyName.addEventListener("blur", checkCompanyName)

formulario.addEventListener("submit", (e) => {
    e.preventDefault()
    const isNameValid = checkName()
    const isEmailValid = checkEmail()
    const isPhoneValid = checkPhone()
    const isCompanyNameValid = checkCompanyName()
    if(isNameValid && isEmailValid && isPhoneValid && isCompanyNameValid){
        const client = {
            name: inputName.value,
            email: inputEmail.value,
            phone: inputPhone.value,
            companyName: inputCompanyName.value
        }
        
        addClientToDB(client)
    }
})
