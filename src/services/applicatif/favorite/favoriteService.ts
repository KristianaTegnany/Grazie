import API from "services/utils/api";
import {url} from "services/utils/url";
import {IResponse} from "../auth/type";

export class FavoriteService {
  static async addList(name: string): Promise<IResponse> {
    return API.post(url.favorites.list, {
      name: name.trim(),
    });
  }

  static async renameList(id: string, name: string): Promise<IResponse> {
    return API.patch(url.favorites.list + "/" + id, {
      name: name.trim(),
    });
  }

  static async deleteList(id: string): Promise<IResponse> {
    return API.delete(url.favorites.list + "/" + id);
  }

  static async addFavorite(id: string, lists: string[]): Promise<IResponse> {
    return API.post(url.favorites.favorite, {
      id,
      lists,
    });
  }

  static async moveFavorite(
    id: string,
    from: string,
    to: string[],
  ): Promise<IResponse> {
    return API.patch(url.favorites.favorite + "/" + id, {
      addLists: to,
      removeLists: [from],
    });
  }

  static async removeFavorite(
    id: string,
    lists?: string[],
  ): Promise<IResponse> {
    return API.delete(url.favorites.favorite + "/" + id, {
      data: lists,
    });
  }
}
