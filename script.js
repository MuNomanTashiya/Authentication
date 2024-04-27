import { getStorage, Sref, uploadBytesResumable, getDownloadURL, ref , db,push , set, auth,
    createUserWithEmailAndPassword,
    sendEmailVerification} from './firebase/firebaseConfig.js'
    
    window.onload = function () {
        // var user = JSON.parse(localStorage.getItem('user'))
        // if (user === null) {
            //     window.location.pathname = '/pages/login'
            // }
        }
        
        var profileImage = null;
        
        
        var fName = document.getElementById('fName')
        var lName = document.getElementById('lName')
        var fatherName = document.getElementById('fatherName')
        var cnicInput = document.getElementById('cnicInput')
        var cityInput = document.getElementById('cityInput')
        var provinceInput = document.getElementById('provinceInput')
        var email = document.getElementById('email')
        var password = document.getElementById('pass')
        var cPassword = document.getElementById('cPass')
        
var registrationForm = document.getElementById('registrationForm')


var displayImage = document.getElementById('image-display')
var browseBtn = document.getElementById('browse-btn')
var role = "user";



browseBtn.addEventListener('click', browseImage)


registrationForm.addEventListener(
    'submit',
    handleSubmit
)

function browseImage() {
    console.log("clicked");

    var input = document.createElement('input')
    input.type = "file"
    input.click()



    input.onchange = function (e) {
        var files = e.target.files
        var imageReader = new FileReader()

        profileImage = files[0]

        imageReader.readAsDataURL(files[0])
        imageReader.onload = function () {

            displayImage.innerHTML = `
                <img src=${imageReader.result} alt="profile" />
            `

        }

    }
}


function handleSubmit(e) {
    e.preventDefault()
    if (password.value !== cPassword.value) {
        alert('Password does not matches')
        return
    }

    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((response) => {
            alert('successfully registered check email for verification')
            handleVerifyEmail(response.user)
        })
        .catch((error) => {
            console.error("error", error);
        })
    var storage = getStorage()
    var profileRef = Sref(storage, `profileImages/${profileImage.name}`);
    var uploadTask = uploadBytesResumable(profileRef, profileImage);
    uploadTask.on('state_changed',
        (snapshot) => {
            console.log("first observer");
        },
        (error) => {
            // Handle unsuccessful uploads
            console.error("error");
        },
        () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                var data = {
                    first_name: fName.value,
                    last_name: lName.value,
                    father_name: fatherName.value,
                    cnic: cnicInput.value,
                    role: role,
                    email: email.value,
                    profile_image : downloadURL
                }

                var registrationRef = ref(db, 'registrations')
                var registetUniqueRef = push(registrationRef)

                set(ref(db,`registrations/${registetUniqueRef.key}`), data)
                .then(res => {
                    window.location.pathname = '/pages/login'
                })
                .catch(err => {
                    console.error("error", err)
                })





            });
        }
    );
}



function handleVerifyEmail(user) {
    console.log("USER" , user)
    sendEmailVerification(user)
    .then(() => {
            //email send successfully
            console.log("EMAIL SEND SUCCESS")
            
        })
        .catch((error) => {
            console.error('error', error);
        })
    }
    
    
    
    
    
    
    
    
    // function handleRegister(e) {
    //     e.preventDefault()
    
    //     if (password.value !== cPassword.value) {
    //         alert('Password does not matches')
    //         return
    //     }
    
    //     createUserWithEmailAndPassword(auth, email.value, password.value)
    //         .then((response) => {
    //             alert('successfully registered check email for verification')
    //             handleVerifyEmail(response.user)
    //         })
    //         .catch((error) => {
    //             console.error("error", error);
    //         })
    // }
    
    
    
    
    
    // var Files = null
    // var browseBtn = document.getElementById('browse-btn')
    // // input references
    // var fName = document.getElementById('fName')
    // var lName = document.getElementById('lName')
    // var fatherName = document.getElementById('fatherName')
    // var cnicInput = document.getElementById('cnicInput')
    // var cityInput = document.getElementById('cityInput')
    // var provinceInput = document.getElementById('provinceInput')
    // var registrationForm = document.getElementById('registrationForm')
    
    // browseBtn.addEventListener('click', browseImage)
    // registrationForm.addEventListener('submit', handleSumbit)

// function browseImage() {
//     var input = document.createElement('input')
//     input.type = 'file'
//     input.accept = "image/png,image/gif,image/jpeg"
//     input.onchange = (e) => {
//         const files = e.target.files
//         Files = files[0]
//         displayImage()
//     }
//     input.click()
// }

// function displayImage() {
//     var imageReader = new FileReader()

//     imageReader.onload = function () {
//         var displayImage = document.getElementById('image-display')
//         displayImage.innerHTML = `<img src=${imageReader.result} alt='profileImage' />`
//     }

//     imageReader.readAsDataURL(Files)
// }

// function handleSumbit(e) {
//     e.preventDefault()
//     const registrationRef = ref(db, `registrations`);

//     const newRegistrationRef = push(registrationRef);

//     var data = {
//         name : ''
//     }

//     set(ref(db, `registrations/${newRegistrationRef.key}`), product)
//         .then(res => {
//             alert('data added successfully')
//         })
//         .catch(err => {
//             console.error("error", err)
//         })
// }