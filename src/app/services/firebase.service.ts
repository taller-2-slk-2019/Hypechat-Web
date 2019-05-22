import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  ref: AngularFireStorageReference;

  constructor(private storage: AngularFireStorage) { }

  upload(file: File): AngularFireUploadTask {
    const path = `${Date.now()}_${file.name}`;
    this.ref = this.storage.ref(path);
    return this.storage.upload(path, file);
  }

  getDownloadUrl() {
    return this.ref.getDownloadURL().toPromise();
  }
}
