import { AngularFireStorage } from "@angular/fire/compat/storage";
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database'
import { Injectable } from "@angular/core";
import { Image } from "../model/image.model";
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs";
import { UserService } from "./user.service";
import { PersonalInfo } from "../model/personalInfo.model";

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {
  imageDetailList!: AngularFireList<any>;

  private basePath = '/images'

  imgArr:any[];

  constructor(private userService:UserService,private http:HttpClient,private db: AngularFireDatabase, private storage: AngularFireStorage) { }

  pushFileToStorage(fileUpload: Image,personalInfo:PersonalInfo) {
    console.log("push file to storage");
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);
  
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          personalInfo.imageUrl=downloadURL;  
          this.userService.updateUserDetails(personalInfo).subscribe((res)=>{
            if(res.status==202){
              this.userService.updateProfileImage(downloadURL);
            }
          });
          
          this.saveFileData(fileUpload);


        });
      })
    ).subscribe();

  }



  getImageDetailList() {
    this.imageDetailList = this.db.list(this.basePath);
  }


  private saveFileData(fileUpload: Image): void {

    this.imageDetailList.push(fileUpload);
  }


  //   private saveFileData(fileUpload: Image): void {

  //     this.db.list(this.basePath).push(fileUpload);
  //   }

  //   getFiles(numberItems: number): AngularFireList<Image> {
  //     return this.db.list(this.basePath, ref =>
  //       ref.limitToLast(numberItems));
  //   }

  fetchImg() {

    this.http.get<{ [key: string]: Image }>('https://cvs247-default-rtdb.firebaseio.com/images.json')

      .pipe(map((res) => {
        const pInfo = [];

        for (const key in res) {

          if (res.hasOwnProperty(key)) {

            pInfo.push({ ...res[key], id: key })

          }

        }

        return pInfo;

      }))

      .subscribe((res) => {


        this.imgArr = res;

        //console.log(this.imgArr);

      })

  }

}