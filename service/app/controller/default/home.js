'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'api, hi';
  }
  async getArticleList() {
    let sql = 'SELECT article.id as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
      "FROM_UNIXTIME(article.add_time,'%Y-%m-%d %H:%i:%s' ) as addTime," +
      'article.view_count as viewCount ,' +
      '.type.type_name as type_name ' +
      'FROM article LEFT JOIN type ON article.type_id = type.Id'
    const results = await this.app.mysql.query(sql)
    this.ctx.body = results
  }
  async getArticleById() {
    //先配置路由的动态传值，然后再接收值
    let id = this.ctx.params.id
    let sql = 'SELECT article.id as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
      'article.article_content as articleContent,' +
      "FROM_UNIXTIME(article.add_time,'%Y-%m-%d %H:%i:%s' ) as addTime," +
      'article.view_count as viewCount ,' +
      'type.type_name as typeName ,' +
      'type.id as typeId ' +
      'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
      'WHERE article.id=' + id
    const result = await this.app.mysql.query(sql)
    this.ctx.body = result
  }
  async getTypeName() {
    const result = await this.app.mysql.select('type')
    this.ctx.body = result
  }
  async getListById() {
    let id = this.ctx.params.id
    let sql = 'SELECT article.id as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
      "FROM_UNIXTIME(article.add_time,'%Y-%m-%d %H:%i:%s' ) as addTime," +
      'article.view_count as viewCount ,' +
      'type.type_name as typeName ' +
      'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
      'WHERE type_id=' + id
    const result = await this.app.mysql.query(sql)
    this.ctx.body = result
  }
}

module.exports = HomeController;
