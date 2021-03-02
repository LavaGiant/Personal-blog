import { AxiosResponse } from 'axios'
import request from '@/utils/request'
export interface ArticleContext {
  id?: number
  type_id: number
  title: string
  article_content: string
  introduce?: string
  add_time: number
  view_count?: number
}
export interface TypeInfo {
  readonly id:number
  readonly icon:string
  readonly order_num :string
  readonly type_name:string
}
export type TypeData = TypeInfo[] | string
export interface ArticleInfo {
  readonly id: number
  typeName: string
  title: string
  introduce: string
  addTime: string
  viewCount: number
}
export interface ArticleDetail extends ArticleInfo {
  articleContent: string
  [propname: string]: any
}
export const getTypeInfo = (): Promise<AxiosResponse<TypeData>> =>
  request.get(`getTypeInfo`)
export const addArticle = (data: ArticleContext): Promise<AxiosResponse<any>> =>
  request.post(`addArticle`, data)
export const updateArticle = (data: ArticleContext): Promise<AxiosResponse<any>> =>
  request.post(`updateArticle`, data)
export const getArticleList = (): Promise<AxiosResponse<ArticleInfo[]>> =>
  request.get(`getArticleList`)
export const delArticle = (id: number): Promise<AxiosResponse<ArticleInfo[]>> =>
  request.get(`delArticle/${id}`)
export const getArticleById = (id: number): Promise<AxiosResponse<ArticleDetail[]>> =>
  request.get(`getArticleById/${id}`)