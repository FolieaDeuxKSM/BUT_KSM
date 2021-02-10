import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { FileType } from '../models/file-type';

@Injectable({
  providedIn: 'root'
})
export class FirebaseserviceService {
  private dbKayit = '/Files';
  kayitRef = null;
  constructor(
    public db: AngularFireDatabase,
    public storage: AngularFireStorage
  ) {
    this.kayitRef = db.list(this.dbKayit);
  }

  KayitEkle(file: FileType) {
    return this.kayitRef.push(file);
  }
  KayitListeleByCategory(category: string) {
    return this.db.list("/Files", q => q.orderByChild("category").equalTo(category));
  }
  KayitSil(key: string) {
    return this.kayitRef.remove(key)
  }
  deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.dbKayit);
    storageRef.child(name).delete();
  }
}
