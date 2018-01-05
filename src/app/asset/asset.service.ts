import { Injectable } from '@angular/core';
import { Asset } from "./asset";
import { Http, Response } from "@angular/http";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { Observable } from "rxjs/Observable";
 
@Injectable()
export class AssetService {
 
  private apiUrl = 'http://localhost:8092/assets';
 
  constructor(private http: Http) {
  }
 
  findAll(): Observable<Asset[]>  {
    return this.http.get(this.apiUrl)
      .map((res:Response) => res.json())
     .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    //const c= new Asset(
    //   1,"Phone","Talking","Fail"
    // );
    // return Observable.of([c]);
  }
 
  findById(id: number): Observable<Asset> {
    return this.http.get(this.apiUrl + '/' + id)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Error'));
  }
 
  saveAsset(asset: Asset): Observable<Asset> {
    //console.log(asset);
    return this.http.post(this.apiUrl, asset)
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
 
  }
 
  deleteAssetById(id: number): Observable<boolean> {
    return this.http.delete(this.apiUrl + '/' + id)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
 
  updateAsset(asset: Asset): Observable<Asset> {
    return this.http.put(this.apiUrl, asset)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
 
}