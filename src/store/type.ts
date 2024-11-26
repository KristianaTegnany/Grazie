import React from "react";

export interface IAction {
  type: string;
  payload: any;
}

export type IMedia = {
  urlHq: string;
  urlLq: string;
};

export type Dispatch = React.Dispatch<IAction>;
