import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpParams} from "@angular/common/http";
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-waiting',
  templateUrl: './waiting.component.html',
  styleUrls: ['./waiting.component.css']
})
export class WaitingComponent implements OnInit {
  type = 1;//1提讯，2离开
  cardDataList = [];
  constructor(
    private http:HttpClient,
    private router: Router,
    private route: ActivatedRoute,
  ) {}
  returnBtn(){
    if(typeof MainWindow !='undefined'){MainWindow.JSInvokeQt()}
  }
  cliclCard(item){
    item.type = this.type;
    if(this.type == 1){
      this.router.navigate(['/choosing',item]);
    }else{
      this.router.navigate(['/ensuring',item]);
    }
  }
  ngOnInit() {
    const type = this.route.params["value"].type;
    this.type = type;
    const params = new HttpParams().set('serialNumber','GB8ZAWGE0A');
    this.http.get('/case/list/room/person',{params})
      .subscribe(res=>{//success
        this.cardDataList = (res as any).data;
      },error=>{
        console.log(error)
      });
   }

}
