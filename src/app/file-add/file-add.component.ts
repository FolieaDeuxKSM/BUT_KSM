import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { FileType } from '../models/file-type';
import { map, finalize } from "rxjs/operators";
import { FirebaseserviceService } from '../services/firebaseservice.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-file-add',
  templateUrl: './file-add.component.html',
  styleUrls: ['./file-add.component.scss']
})
export class FileAddComponent implements OnInit {
  file : FileType = new FileType(); 
  uploadProgress$: Observable<number>
  downloadURL: Observable<string>;
  constructor(
    private storage:AngularFireStorage,
    private fbservice:FirebaseserviceService,
    private toast:ToastrService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  UploadFile(){
    if(!(this.file.name?.length >1)){
      this.toast.error('Lütfen bir dosya isim giriniz.','Eksik')
      return
    }else if(!(this.file.file?.length >0)){
      this.toast.error('Lütfen bir dosya yükleyiniz.','Eksik')
      return
    }else if(!(this.file.category?.length >0)){
      this.toast.error('Lütfen bir kategori belirleyiniz.','Hata')
      return
    }
    var tarih = new Date();
    this.file.createdate = tarih.getTime();
    console.log(this.file);
    this.fbservice.KayitEkle(this.file).then(res=>{
      this.toast.success('Dosyanız başarılı bir şekilde yüklendi.','Tebrikler')
      this.router.navigateByUrl('/home');
      },err=>{
        this.toast.error('Bir hata ile karşılaşıldı lütfen daha sonra tekrar deneyiniz.','Hata')
        console.log(JSON.stringify(err));
      })
  }
  fileSelect(event){
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `Files/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`Files/${n}`, file);
    this.uploadProgress$ = task.percentageChanges();
    task
      
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.file.file = url;
              this.file.realname = n.toString();
            }
            
          });
        })
      )
      .subscribe(url => {
        if (url) {
        }
      });
  }
}
