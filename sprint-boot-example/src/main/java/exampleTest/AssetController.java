package exampleTest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value = "/assets")
public class AssetController {

	private List<Asset> assets = new ArrayList<Asset>();

	AssetController() {
		this.assets = buildAssets();
	}

	@RequestMapping(method = RequestMethod.GET)
	public List<Asset> getAssets() {
		return this.assets;
	}
	
	@Autowired  
    JdbcTemplate jdbc;    
    @RequestMapping("/insert")  
    public String index(){  
        jdbc.execute("insert into asset(name,descrition,status)values('CPU','central processing unit','Passed')");  
        return"data inserted Successfully";  
    }  

	@RequestMapping(value = "/{Id}", method = RequestMethod.GET)
	public Asset getAsset(@PathVariable("Id") int Id) {
		return this.assets.stream().filter(asset -> asset.getId() == Id).findFirst().orElse(null);
	}

	@RequestMapping(method = RequestMethod.POST)
	public Asset saveAsset(@RequestBody Asset asset) {
		int nextId = 0;
		if (this.assets.size() != 0) {
			Asset lastAsset = this.assets.stream().skip(this.assets.size() - 1).findFirst().orElse(null);
			nextId = lastAsset.getId() + 1;
		}

		asset.setId(nextId);
		this.assets.add(asset);
		return asset;
	}

	@RequestMapping(method = RequestMethod.PUT)
	public Asset updateAsset(@RequestBody Asset asset) {
		Asset modifiedAsset = this.assets.stream().filter(u -> u.getId() == asset.getId()).findFirst().orElse(null);
		modifiedAsset.setName(asset.getName());
		modifiedAsset.setDescription(asset.getDescription());
		modifiedAsset.setStatus(asset.getStatus());
		return modifiedAsset;
	}

	@RequestMapping(value = "/{Id}", method = RequestMethod.DELETE)
	public boolean deleteAsset(@PathVariable int id) {
		Asset deleteAsset = this.assets.stream().filter(asset -> asset.getId() == id).findFirst().orElse(null);
		if (deleteAsset != null) {
			this.assets.remove(deleteAsset);
			return true;
		} else  {
			return false;
		}


	}

	List<Asset> buildAssets() {
		List<Asset> assets = new ArrayList<>();

		Asset asset1 = buildAsset(1, "Phone", "Talking", "Fail");
		Asset asset2 = buildAsset(2, "TV", "Watching", "Fail");
		Asset asset3 = buildAsset(3, "Sofa", "Sitting", "Pass");
		Asset asset4 = buildAsset(4, "Table", "Putting", "Fail");
		Asset asset5 = buildAsset(5, "Iron", "Shirting", "Pass");

		assets.add(asset1);
		assets.add(asset2);
		assets.add(asset3);
		assets.add(asset4);
		assets.add(asset5);

		return assets;

	}

	Asset buildAsset(int id, String name, String description, String status) {
		Asset asset = new Asset();
		asset.setId(id);
		asset.setName(name);
		asset.setDescription(description);
		asset.setStatus(status);
		return asset;
	}
	
}