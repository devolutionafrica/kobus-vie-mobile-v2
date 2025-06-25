import { Observable } from "rxjs";
import { AppConfig } from "../entities/AppConfig";

export interface IAppConfigAdapter {
  clean():void;
  load():Observable<AppConfig>
  update(config: AppConfig):Observable<AppConfig>
  save(configObj: AppConfig):Observable<AppConfig>;
}
