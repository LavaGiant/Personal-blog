'use strict';

const Controller = require('egg').Controller

class MainController extends Controller {
  async index() {
    this.ctx.body = 'hello admin'
  }
  async checkLogin() {
    let username = this.ctx.request.body.username
    let password = this.ctx.request.body.password
    const sql = `SELECT username FROM admin_user WHERE username = '${username}' AND password='${password}'`
    const res = await this.app.mysql.query(sql)
    if (res.length > 0) {
      let openId = new Date().getTime()
      this.ctx.session.openId = openId
      this.ctx.body = { code: 1, msg: '登陆成功', openId }
    } else {
      this.ctx.body = { code: 0, msg: '登陆失败' }
    }
  }
  async getTypeInfo() {
    const resType = await this.app.mysql.select('type')
    this.ctx.body = resType
  }
  async addArticle() {
    let tmpArticle = this.ctx.request.body
    const result = await this.app.mysql.insert('article', tmpArticle)
    const insertSuccess = result.affectedRows === 1
    const { insertId } = result
    this.ctx.body = {
      insertSuccess,
      insertId
    }
  }
  async updateArticle() {
    let tmpArticle = this.ctx.request.body
    const result = await this.app.mysql.update('article', tmpArticle)
    const updateSuccess = result.affectedRows === 1
    this.ctx.body = {
      updateSuccess
    }
  }
  async getArticleList() {
    let sql = 'SELECT article.id as id,' +
      'article.title as title,' +
      'article.view_count as viewCount,' +
      'article.introduce as introduce,' +
      "FROM_UNIXTIME(article.add_time,'%Y-%m-%d' ) as addTime," +
      'type.type_name as typeName ' +
      'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
      'ORDER BY article.id DESC '
    const result = await this.app.mysql.query(sql)
    this.ctx.body = result
  }
  async delArticle() {
    let id = this.ctx.params.id
    const result = this.app.mysql.delete('article', { id })
    this.ctx.body = result
  }
  async getArticleById() {
    let id = this.ctx.params.id
    let sql = 'SELECT article.id as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
      'article.article_content as articleContent,' +
      "FROM_UNIXTIME(article.add_time,'%Y-%m-%d' ) as addTime," +
      'article.view_count as viewCount ,' +
      'type.type_name as typeName ,' +
      'type.id as typeId ' +
      'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
      'WHERE article.id=' + id
    const result = await this.app.mysql.query(sql)
    this.ctx.body = result
  }
}
module.exports = MainController