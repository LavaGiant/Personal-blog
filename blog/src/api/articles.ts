
import { AxiosResponse } from 'axios'
import request from '@/utils/request'

export const getArticleList = (): Promise<AxiosResponse<ArticleGlobal.Article[]>> =>
  request.get(`getArticleList`)
export const getArticleDetail = (id: number): Promise<AxiosResponse<ArticleGlobal.Article[]>> =>
  request.get(`/getArticleById/${id}`)
export const getListById = (id: number): Promise<AxiosResponse<ArticleGlobal.Article[]>> =>
  request.get(`/getListById/${id}`)