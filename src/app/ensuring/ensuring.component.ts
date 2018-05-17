import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpParams} from "@angular/common/http";
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-ensuring',
  templateUrl: './ensuring.component.html',
  styleUrls: ['./ensuring.component.css']
})
export class EnsuringComponent implements OnInit {
  type = 1;//1提讯，2离开
  opeError = false;
  opeSuccess = false;
  cardData = {
    name:'',
    registerTime:'',
    retentionTime:'',
    gender:'',
    picUrl:'',
    statusName:'',
    roomName:''
  };
  params = {
    personMagicId:'',
    roomMagicId:'',
    serialNumber:'GB8ZAWGE0A'
  };
  constructor(
    private http:HttpClient,
    private route:ActivatedRoute,
    private router:Router
  ) { }
  cancel(){
    if(this.type==1){
      this.router.navigate(['/waiting/1']);
    }else{
      this.router.navigate(['/waiting/2']);
    }
  }
  opeFn(type){
    if(type == 1){
      this.router.navigate(['/waiting/1'])
    }else{
      this.router.navigate(['/waiting/2'])
    }
  }
  ensure(){
    const params = this.params;
    const that = this;
    if(that.type==1){//提讯
      that.http.get('/case/person/distribute',{params})
        .subscribe(res=>{//success
          that.opeSuccess = true;
          that.opeError = false;
          setTimeout(()=>{
            if(typeof MainWindow !='undefined'){MainWindow.backToMain()}
          },1000);
        },error=>{
          that.opeSuccess = false;
          that.opeError = true;
          setTimeout(()=>{that.opeError = false},1000);
      });
    }else{//离开
      that.http.get('/case/room/leave/'+that.params.personMagicId,{params})
        .subscribe(res=>{//success
          that.opeSuccess = true;
          that.opeError = false;
          setTimeout(()=>{
            if(typeof MainWindow !='undefined'){MainWindow.backToMain()}
          },1000);
        },error=>{
          that.opeSuccess = false;
          that.opeError = true;
          setTimeout(()=>{that.opeError = false},1000);
      });
    }
  }
  ngOnInit() {
    this.type = this.route.params["value"].type;

    this.cardData.name = this.route.params["value"].name;
    this.cardData.registerTime = this.route.params["value"].registerTime;
    this.cardData.retentionTime = this.route.params["value"].retentionTime;
    this.cardData.gender = this.route.params["value"].gender;
    this.cardData.picUrl = this.route.params["value"].picUrl;
    this.cardData.statusName = this.route.params["value"].statusName;

    this.params.personMagicId = this.route.params["value"].personMagicId;

    if(this.type == 1){
      this.params.roomMagicId = this.route.params["value"].roomMagicId;
      this.cardData.roomName= this.route.params["value"].roomName;
    }
  }
}
