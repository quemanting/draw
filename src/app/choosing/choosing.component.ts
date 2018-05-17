import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpParams} from "@angular/common/http";
import { ActivatedRoute,Router } from '@angular/router';
@Component({
  selector: 'app-choosing',
  templateUrl: './choosing.component.html',
  styleUrls: ['./choosing.component.css']
})
export class ChoosingComponent implements OnInit {
  roomDataList = [];
  params = {
    personMagicId:'',
    name:'',
    registerTime:'',
    retentionTime:'',
    gender:'',
    picUrl:'',
    statusName:'',
    serialNumber:'',

    roomMagicId:'',
    roomName:'',
    type:''
  };
  constructor(
    private http:HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  returnBtn(){
    console.log(this.params.serialNumber);
    this.router.navigate(['/waiting/1/'+this.params.serialNumber]);
  }
  clickRoom(item){
    this.params.personMagicId = this.route.params["value"].personMagicId;
    this.params.name = this.route.params["value"].name;
    this.params.registerTime = this.route.params["value"].registerTime;
    this.params.retentionTime = this.route.params["value"].retentionTime;
    this.params.gender = this.route.params["value"].gender;
    this.params.picUrl = this.route.params["value"].picUrl;
    this.params.statusName = this.route.params["value"].statusName;


    this.params.roomMagicId = item.roomMagicId;
    this.params.roomName = item.roomName;

    this.params.type = this.route.params["value"].type;

    let params = this.params;
    this.router.navigate(['/ensuring',params]);
  }
  ngOnInit() {
    this.params.serialNumber = this.route.params["value"].serialNumber;
    const params = new HttpParams().set('serialNumber',this.params.serialNumber);
    this.http.get('/case/list/free/room',{params})
      .subscribe(res=>{
        this.roomDataList = (res as any).data;//res 对象被声明为any，则跳过类型检测
      },error=>{
        console.log(error)
    });
   }
}
