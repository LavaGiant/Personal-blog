import { AxiosResponse } from 'axios'
import request from '@/utils/request'

export const getArticleList = (data: any): Promise<AxiosResponse<any>> =>
  request.post(`checkLogin`, data)