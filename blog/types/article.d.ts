declare namespace ArticleGlobal {
  interface Article {
    id: number
    title: string
    articleContent?:string
    introduce?: string
    addTime: string
    viewCount: number
    typeName: string
    typeId:number
  }
}