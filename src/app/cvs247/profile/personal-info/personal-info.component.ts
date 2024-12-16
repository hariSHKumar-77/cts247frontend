import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PersonalInfoService } from '../services/personal-info.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Image } from 'src/app/model/image.model';
import { FirebaseService } from '../../../services/firebase.service';
import { map } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { PersonalInfo } from 'src/app/model/personalInfo.model';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {

  piForm: NgForm;
  personalInfo: PersonalInfo=new PersonalInfo();
  
  btnStatus={firstname:true,lastname:true,email:true,gender:true,dateOfBirth:true,emergencyContact:true};



  // img

  urlImg: any;
  userImg: any;
  isUploded = false;

  selectedFiles?: FileList;
  currentFileUpload?: Image;
  fileUploads?: any[];

  imageList: any[]

  image:Image;

  constructor(private personalInfoService: PersonalInfoService,private userService:UserService,
    private fireStorage: AngularFireStorage,
    private firebaseService: FirebaseService) { }


  ngOnInit(): void {

    
    this.userService.getUserDetails().subscribe((response: any) => {

        if(response.status==200){
          
          this.personalInfo=response.body;
          if(this.personalInfo.emergencyContact==null)this.personalInfo.emergencyContact="Null";
          
          
        }


    }); 

    //this.infos = this.personalInfoService.getInfo();
    // this.personalInfoService.fetchInfo();
    // this.infos = this.personalInfoService.allInfo;


    // this.uploadService.getImageDetailList();
    // this.personalInfoService.fetchInfo();
    // this.infos = this.personalInfoService.allInfo;
    // this.uploadService.fetchImg();
    // this.imageList = this.uploadService.imgArr;



  }

 

  onClick(field:string) {
    if (this.btnStatus[field]) {
      this.btnStatus[field] = !this.btnStatus[field];
    } else {
      this.btnStatus[field] = !this.btnStatus[field];
      // console.log(this.piForm.value);
      console.log(this.personalInfo);
      // this.userService.generateOTP(this.personalInfo.phNumber);
      this.userService.updateUserDetails(this.personalInfo).subscribe((response:any)=>{
        if(response.status==202){
          console.log(response.body);
          this.userService.updateFirstname(response.body.firstname);
          this.userService.updateLastname(response.body.lastname);
          
        }
      });
      // this.personalInfoService.editInfo(id, this.piForm.value);
    }
  }
  

  // img 



  // async onFileChange(event) {
  //   const file = event.target.files[0]
  //   if(file){
  //     const path = `yt/${file.name}`
  //     const uploadTask = await this.fireStorage.upload(path,file)
  //     const url = await uploadTask.ref.getDownloadURL()
  //     console.log(url)
  //     this.urlImg = url

  //   }
  // }

  uploadImage(event: any) {
    console.log("uploading image");
    this.selectedFiles = event.target.files;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;

      if (file) {
        this.currentFileUpload = new Image(file);
        this.firebaseService.pushFileToStorage(this.currentFileUpload,this.personalInfo);
        console.log(this.image.url);
        
        // this.image=this.firebaseService.image;
        // this.personalInfo.imageUrl=
      }
    }
  }

  getImage(){
    return sessionStorage.getItem("imageUrl");
  }

}




