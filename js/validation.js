var submit = document.querySelector('#form button');
var form = document.querySelector('#form');
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
        var toList = '<li>' + error + '</li>';
        this.errors.push(toList);
    }

    getErrors(){
        var status = this.input.validity;

        if (status.valueMissing) {
            this.addError("this value is required");
        } else if (this.type == 'tel') {
            if (this.input.value != '') {
                if (!this.input.value.match(/((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}/g)) {
                    this.addError("this is not a valid phone number");
                }
            }
        }

        if (this.type == 'text' || this.type == 'password') {
            if (status.tooLong) {
                this.addError('the value is too long');
            }

            if(status.tooShort){
                this.addError('the value is too short');
            }
        }

        if(this.type == 'password'){
            if (!this.input.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/g)){
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

        if(this.type == 'email'){
            if(!this.input.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)){
                this.addError('this is not a valid format (eg. name@domain.dot)');
            }
        }
    }
}


submit.addEventListener('click', (el)=> {

    el.preventDefault();

    console.log("REACHED");

    //Creating objects
    var fullNameValidate = new InputValidator(fullName, 'text');
    var emailValidate = new InputValidator(email, 'email');
    var passwordValidate = new InputValidator(password, 'password');
    var phoneValidate = new InputValidator(phone, 'tel');
    var messages = document.querySelectorAll('.message');

    // adding class alert for the messages containers
    messages.forEach((messages)=>{
        if (!messages.classList.contains('alert')) {
                messages.className += ' alert';
        }

    })

    //messages containers
    var msgName = document.querySelector('[data-name]');
    var msgEmail = document.querySelector('[data-email]');
    var msgPass = document.querySelector('[data-password]');
    var msgPhone = document.querySelector('[data-phone]');
    var msgCountry = document.querySelector('[data-country]');

    //getting te errors
    fullNameValidate.getErrors();
    emailValidate.getErrors();
    passwordValidate.getErrors();
    phoneValidate.getErrors();


    // printing messages
    msgName.innerHTML = fullNameValidate.errors.join('');
    msgEmail.innerHTML = emailValidate.errors.join('');
    msgPass.innerHTML = passwordValidate.errors.join('');
    msgPhone.innerHTML = phoneValidate.errors.join('');
    msgPass.innerHTML = passwordValidate.errors.join('');

    console.log(messages);

    // check if messages are empty.
    if (msgName.innerHTML === '' && msgEmail.innerHTML === '' && msgPass.innerHTML === '' && msgPhone.innerHTML === '') {
        console.log("IS EMPTY");
        submit.removeEventListener('click', this);
        submit.addEventListener('click', done());
    }

})

function done(){

    form.innerHTML = `
    <div id="submited">
    <img src="images/circle-check.svg" alt="ok" />
    <h2>Awesome, you're registered</h2>
    </h1>`

}
