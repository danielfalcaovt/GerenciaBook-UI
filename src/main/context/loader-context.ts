/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, Dispatch, SetStateAction } from 'react'

interface LoaderContextType {
  loading: any
  setLoading: Dispatch<SetStateAction<any>>
}

const defaultContextValue: LoaderContextType = {
  loading: {},
  setLoading: () => {}
}
export const LoaderContext = createContext<LoaderContextType>(defaultContextValue)
