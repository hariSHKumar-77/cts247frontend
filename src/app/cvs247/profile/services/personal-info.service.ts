import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { Observable } from "rxjs";
import { PersonalInfo } from "src/app/model/personalInfo.model";

@Injectable()

export class PersonalInfoService {
    // info : PersonalInfo[] = [new PersonalInfo('jimmyyy', 'jimmy@gmail.com', 'male', 'june 25 1988', 977487386, 987787007)];
    allInfo : PersonalInfo[]=[]
    constructor(private http: HttpClient) {
    }

    getInfo() {
        // return this.info;
    }

    updateInfo(val : PersonalInfo) {
        this.http.post('https://cvs247-default-rtdb.firebaseio.com/personalInfo.json', val)
    .subscribe((res) => {
      console.log(res);
    })
    }

    fetchInfo() {
        this.http.get<{[key: string]: PersonalInfo}>('https://cvs247-default-rtdb.firebaseio.com/personalInfo.json')
        .pipe(map((res) => {
        const pInfo = [];
          for(const key in res){
            if(res.hasOwnProperty(key)) {
                pInfo.push({...res[key], id: key})
            }
          }
          return pInfo;
        }))
        .subscribe((res) => {
            console.log(res);
            this.allInfo = res;
        })
    }

    editInfo(id: Number, value: PersonalInfo) {
        // let currentVal = this.allInfo.find((p) => {return p.id === id})
        // console.log(currentVal)
        // let body = value
        // this.http.patch('https://cvs247-default-rtdb.firebaseio.com/personalInfo/'+id+'.json',body)
        // .subscribe(
        //   (res) => {
        //     console.log(id)
        //   }
        // );
    }
    
}