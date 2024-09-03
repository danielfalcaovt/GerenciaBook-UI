/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, Dispatch, SetStateAction } from "react";

interface DataContextType {
  data: any;
  setData: Dispatch<SetStateAction<any>>;
}

const defaultContextValue: DataContextType = {
  data: {},
  setData: () => {}
};

export const DataContext = createContext<DataContextType>(defaultContextValue)