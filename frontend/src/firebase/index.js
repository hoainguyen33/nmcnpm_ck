import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";


export const getUrlFromFirebase = (e, callback) => {
    const image = e.target.files[0];
    const storage = getStorage();

    const storageRef = ref(storage, image.name);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadBytes(storageRef, image).then((snapshot) => {
        if(!snapshot) {
          return callback({success: false, message: 'error'});
        }
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            return callback({success: true, image: downloadURL});
        });
    });
}