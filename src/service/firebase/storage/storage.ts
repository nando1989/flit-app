import { getDownloadURL, deleteObject, uploadBytesResumable, UploadTask } from 'firebase/storage';

import { firebaseStorage, firebaseStorageRef } from '../configs';

interface IProps {
  file: File;
  path: string;
}

interface ICallbackProgress {
  callback(progress: number): void;
}

export const uploadTaskPromise = async (uploadTask: UploadTask, dataProgress?: ICallbackProgress) =>
  new Promise<string>((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

        if (dataProgress?.callback) {
          dataProgress.callback(progress);
        }
      },
      (err) => {
        reject(err.code);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          resolve(url);
        });
      },
    );
  });

export async function uploadFileStorageFirebase({ file, path }: IProps): Promise<string> {
  const storageRef = firebaseStorageRef(firebaseStorage, path);

  try {
    const uploadTask = uploadBytesResumable(storageRef, file);

    const urlStorage = await uploadTaskPromise(uploadTask, {
      callback: (progress) => console.log(`Progress Storage: ${progress}`),
    });

    return urlStorage;
  } catch (error) {
    console.log(error, 'Error upload firebase');
    return '';
  }
}

export async function deleteFileStorageFirebase(filePath: string): Promise<void> {
  const fileRef = firebaseStorageRef(firebaseStorage, filePath);

  try {
    await deleteObject(fileRef);
    console.log(`File deleted successfully: ${filePath}`);
  } catch (error) {
    console.error(`Error deleting file: ${filePath}`, error);
  }
}
