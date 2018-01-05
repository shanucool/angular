import { Component, OnInit } from '@angular/core';
import { Asset } from "../asset";
import { AssetService } from "../asset.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.css'],
  providers: [AssetService]
})
export class AssetListComponent implements OnInit {
 
  private assets: Asset[];
 
  constructor(private router: Router,private assetService: AssetService) { }
 
  ngOnInit() { //when component loading get all assets and set the assets[]
    this.getAllAssets();
  }
 
  getAllAssets() {
    this.assetService.findAll().subscribe(
      assets => {
        this.assets = assets;
      },
      err => {
        console.log(err);
      }
 
    );
  }
 redirectNewAssetPage() {
    this.router.navigate(['/asset/create']);
  }
 
  editAssetPage(asset: Asset) {
    if (asset) {
      this.router.navigate(['/asset/edit', asset.id]);
    }
  }
 
  deleteAsset(asset: Asset) {
    if (asset) {
      this.assetService.deleteAssetById(asset.id).subscribe(
        res => {
          this.getAllAssets();
          this.router.navigate(['/asset']);
          console.log('done');
        }
      );
    }
  }
  
}
