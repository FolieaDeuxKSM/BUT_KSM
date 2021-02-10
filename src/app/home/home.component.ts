import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FileType } from '../models/file-type';
import { FirebaseserviceService } from '../services/firebaseservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  Files = [];
  Pictures = [];
  Audios = [];
  constructor(
    private fbservice: FirebaseserviceService,
    private toast:ToastrService,
  ) { 
    this.GetFilesByCategory();
  }

  ngOnInit(): void {
  }
  GetAudiosByCategory(){
    this.fbservice.KayitListeleByCategory('audio').snapshotChanges().subscribe(data => {
      this.Audios = [];
      data.forEach(satir => {
        const y = { ...satir.payload.toJSON(), key: satir.key };
        this.Audios.push(y as FileType);
      });
    });
  }
  GetImagesByCategory(){
    this.fbservice.KayitListeleByCategory('picture').snapshotChanges().subscribe(data => {
      this.Pictures = [];
      data.forEach(satir => {
        const y = { ...satir.payload.toJSON(), key: satir.key };
        this.Pictures.push(y as FileType);
      });
    });
  }
  GetFilesByCategory(){
    this.fbservice.KayitListeleByCategory('pdf').snapshotChanges().subscribe(data => {
      this.Files = [];
      data.forEach(satir => {
        const y = { ...satir.payload.toJSON(), key: satir.key };
        this.Files.push(y as FileType);
      });
    });
  }

  preview(file){
    window.open(file,'_blank');
  }
  deleteFile(item : FileType){
    if(confirm('Bu Dosyayı Silmek istediğinizden emin misiniz?')){
      this.fbservice.KayitSil(item.key).then(res=>{
      this.toast.success('Dosya silindi.');
      this.fbservice.deleteFileStorage(item.realname);
    },err=>{
      this.toast.error('Bir hata oluştu daha sonra tekrar deneyiniz')
    });
    }
    
  }
  
}
