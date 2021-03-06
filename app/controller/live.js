'use strict'

const Controller = require('egg').Controller

class LiveController extends Controller {
  /**
   * 添加礼物
   */
  async addGifts() {
    const {ctx, app} = this
    // const {livecode} = app.verifyToken(ctx)
    const {livecode} = ctx.params
    const gift = await ctx.service.live.addGift(livecode)
    if(gift.length> 0){
      ctx.helper.success({ctx, res: gift})
    } else {
      ctx.helper.fail({ctx, res:'请联系管理员！'})
    }
  }

  /**
   * 更新直播间信息
   */
  async updateLive() {
    const {ctx, app} = this
    const {livecode} = app.verifyToken(ctx)
    const value = ctx.request.body
    const live = await ctx.service.live.updateLive(value, livecode)
    if(live){
      ctx.helper.success({ctx, res:'更新成功'})
    }
  }

  /**
   * 获取所有直播间
   */
  async getAllLive() {
    const {ctx, app} = this
    const {limit, offset} = ctx.query
    const live = await this.ctx.service.live.findAllLive(limit, offset)
    ctx.helper.success({ctx, res: live})
  }

  /**
   * 根据id禁用/解禁直播间
   */
  async banLive() {
    const {ctx, app} = this
    const {id} = app.verifyToken(ctx)
    const {banId,ban} = ctx.params
    if( parseInt(id) === parseInt(banId)) {
      ctx.helper.fail({ctx, res: '请不要禁用自己'})
    } else {
      const result = await ctx.service.live.banById(banId,ban)
      if(result) {
        ctx.helper.success({ctx, res: '操作成功'})
      }
    }
  }

  /**
   * 添加标签
   */
  async addTags() {
    const {ctx, app} = this
    const {livecode} = app.verifyToken(ctx)
    console.log(livecode)
    const {name} = ctx.request.body
    const live = await ctx.service.live.findByLive(livecode)
    const result = await ctx.service.live.addTags( live.id, name )
    ctx.helper.success({ctx, res:result})
  }
}

module.exports = LiveController
