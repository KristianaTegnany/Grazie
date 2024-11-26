import API from "services/utils/api";
import {url} from "services/utils/url";
import {IMapResponse} from "./type";

export class MapService {
  static async getPoints(): Promise<IMapResponse> {
    return API.get(url.map.points);
  }
}
