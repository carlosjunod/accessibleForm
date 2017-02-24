var submit = document.querySelector('#form button');
var fullName = document.querySelector('#fullName');
var email = document.querySelector('#email');
var password = document.querySelector('#password');
var phone = document.querySelector('#phone');
var country = document.querySelector('#country').selected;



class InputValidator{
    constructor(input, type, errors){
        this.input = input;
        this.type = type;
        this.errors = [];
    }

    addError(error){
        this.errors.push(error);
    }

    getErrors(){
        var status = this.input.validity;

        if (status.tooLong) {
            this.addError("the value is too long");
        }

        if(status.tooShort){
            this.addError("the value is too short");
        }

        if (status.typeMismatch) {
            this.addError("please check your answer");
        }

        if (status.valueMissing) {
            this.addError("this value is required");
        }

        if (status.patternMismatch){
            if (!this.input.value.match(/[A-Z]/g)) {
                this.addError("this should have at least one cappital letter");
            }
            if (!this.input.value.match(/[0-9]/g)) {
                this.addError("this should have at least one number");
            }
            if (!this.input.value.match(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/g)) {
                this.addError("this should have at least one symbol");
            }

        }

    }



}


submit.addEventListener('click', (el)=> {
    el.preventDefault();

    var fullNameValidate = new InputValidator(fullName, "text");
    var emailValidate = new InputValidator(email, "email");
    var passwordValidate = new InputValidator(password, "password");
    var phoneValidate = new InputValidator(phone, "tel");

    fullNameValidate.getErrors();
    emailValidate.getErrors();
    passwordValidate.getErrors();
    phoneValidate.getErrors();

    console.log("name Errors:");
    console.log(fullNameValidate.input.validity);
    console.log(fullNameValidate.errors);
    console.log("----------");

    console.log("email Errors:");
    console.log(emailValidate.input.validity);
    console.log(emailValidate.errors);
    console.log("----------");

    console.log("password Errors:");
    console.log(passwordValidate.input.validity);
    console.log(passwordValidate.errors);
    console.log("----------");
    console.log("phone Errors:");
    console.log(phoneValidate.input.validity);
    console.log(phoneValidate.errors);
    console.log("----------");

    // fullNameValidate.input.validity.forEach((error)=>{
    //     fullNameValidate.errors.push(error);
    //     console.log(error + " into the array");
    // })

})
