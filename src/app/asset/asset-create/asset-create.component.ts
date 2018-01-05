import { Component,OnDestroy, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AssetService} from "../asset.service";
import {Asset} from "../asset";
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-asset-create',
  templateUrl: './asset-create.component.html',
  styleUrls: ['./asset-create.component.css'],
  providers: [AssetService]
})
export class AssetCreateComponent implements OnInit,OnDestroy {
id: number;
asset: Asset;
assetForm: FormGroup;
private sub: any;
 
constructor(private route: ActivatedRoute,
              private router: Router,
              private assetService: AssetService) { }
 
ngOnInit() {
       this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.assetForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required)
    });

    if (this.id) { //edit form
      this.assetService.findById(this.id).subscribe(
        asset => {
            this.id = asset.id;
            this.assetForm.patchValue({
            name: asset.name,
            description: asset.description,
            status: asset.status,
          });
         },error => {
          console.log(error);
         }
      );
 
    }
  }
  ngOnDestroy(): void {
     this.sub.unsubscribe();
  }
 
  onSubmit() {
    if (this.assetForm.valid) {
        if (this.id) {
        let asset: Asset = new Asset(this.id,
          this.assetForm.controls['name'].value,
          this.assetForm.controls['description'].value,
          this.assetForm.controls['status'].value);
        this.assetService.updateAsset(asset).subscribe();
      } else {
        let asset: Asset = new Asset(null,
          this.assetForm.controls['name'].value,
          this.assetForm.controls['description'].value,
          this.assetForm.controls['status'].value);
        this.assetService.saveAsset(asset).subscribe();
 
      }
 
      this.assetForm.reset();
      this.router.navigate(['/asset']);
    }
 }
 
  redirectAssetPage() {
    this.router.navigate(['/asset']);
 
  }
}
