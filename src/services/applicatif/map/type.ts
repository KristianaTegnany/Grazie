import {IResponse} from "../auth/type";

export type IMapPoint = {
  id: string;
  categoryId: string;
  isFavorite?: boolean;
  isSuggestion?: boolean;
  latitude: string;
  longitude: string;
  regionId: string;
};

export type IMapResponse = IResponse & {
  items: IMapPoint[];
};
