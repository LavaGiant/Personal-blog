import { AxiosResponse } from 'axios'
import request from '@/utils/request'
export const getHeaderType = (): Promise<AxiosResponse<HeaderGlobal.HeaderType[]>> => request.get('getTypeName')