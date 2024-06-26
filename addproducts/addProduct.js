import { Sref, db, set, ref, push, getStorage, uploadBytesResumable, getDownloadURL, onChildAdded } from '../firebase/firebaseConfig.js'

var Files = []
var FileReaders = []

var imagesDiv = document.getElementById('imagesDiv')
var imagesLinkArray = []

var pnameInput = document.getElementById('pnameInput')
var priceInput = document.getElementById('priceInput')
var addProductBtn = document.getElementById('addBtn')
var selectImgBtn = document.getElementById('selectImagesBtn')
// var stoclInput = document.getElementById('stoclInput')
// var categoriesInput = document.getElementById('categoriesInput')
var descriptionInput = document.getElementById('descriptionInput')



function openFileDialog() {
    let input = document.createElement('input')
    input.type = 'file'
    input.multiple = 'multiple'

    input.onchange = (e) => {
        createFilesArray(e.target.files)
        createImgTags()
    }
    input.click()
}

function createFilesArray(files) {
    for (var i = 0; i < files.length; i++) {
        Files.push(files[i])
    }
}
function createImgTags() {
    imagesDiv.innerHTML = ''
    console.log(Files)
    for (let i = 0; i < Files.length; i++) {
        FileReaders[i] = new FileReader()
        console.log(';', FileReaders)
        FileReaders[i].onload = function () {
            var imgDiv = document.createElement('div')
            imgDiv.classList.add('col-4')
            imgDiv.classList.add('imageDiv')
            imgDiv.id ='delDiv'
            imagesDiv.append(imgDiv)
            var img = document.createElement('img')
            img.id = `imgNo${i}`
            img.classList.add('productImage')
            img.src = FileReaders[i].result
            imgDiv.append(img)
        }

        FileReaders[i].readAsDataURL(Files[i])
    }
}

function isAllImagesUploaded() {
    return imagesLinkArray.length === Files.length ? true : false
}

function uploadAnImage(image, num) {
    const metaData = {
        contentType: image.type
    }

    const storage = getStorage()

    const imageAddress = `images/img#${num}-${image.name}`

    const storageRef = Sref(storage, imageAddress)

    const uploadTask = uploadBytesResumable(storageRef, image, metaData)

    uploadTask.on('state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
        },
        (error) => {
            console.error('error uploading files')
        },
        () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                imagesLinkArray.push(downloadURL)


                if (isAllImagesUploaded()) {
                    const productRef = ref(db, `products`);

                    const newProductRef = push(productRef);

                    const product = {
                        key: newProductRef.key,
                        name: pnameInput.value,
                        price: priceInput.value,
                        description: descriptionInput.value,
                        images: imagesLinkArray
                    }
                    debugger
                    set(ref(db, `products/${newProductRef.key}`), product)
                        .then(res => {
                            debugger
                            pnameInput.value = ""
                            priceInput.value = ""
                            descriptionInput.value = ""
                            var delDiv = document.getElementById('delDiv');
                            var removePicDiv = delDiv.parentNode.parentNode;
                            removePicDiv.parentNode.removeChild(removePicDiv)
                            alert('data added successfully')
                        })
                        .catch(err => {
                            console.error("error", err)
                        })
                }
            });
        }
    );
}

selectImgBtn.addEventListener('click', openFileDialog)

addProductBtn.addEventListener('click', () => {
    if (Files && Files.length && Files.length > 0) {
        for (let i = 0; i < Files.length; i++) {
            uploadAnImage(Files[i], i)
        }
    } else {
        alert("Please upload an Image")
    }
})

const productsRef = ref(db, 'products/');
onChildAdded(productsRef, (snapshot) => {
    console.log('SNAP', snapshot)
})