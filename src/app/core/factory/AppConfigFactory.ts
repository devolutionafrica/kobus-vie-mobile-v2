import { AppConfig, IAppConfig } from '../entities/AppConfig'

export abstract class AppConfigFactory {
  public static build(data: any): AppConfig {
    const jsonData: IAppConfig = data;
    if (jsonData !== null && jsonData !== undefined) {
      return new AppConfig(
        jsonData.status,
        jsonData.step
      );
    }
    return null;
  }
}
