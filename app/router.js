'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, io } = app;
  // api
  router.post('/register', controller.user.register)                  // 注册
  router.post('/login', controller.user.login)                        // 登录
  router.get('/user', app.jwt, controller.user.getAllUser)            // 获取全部用户
  router.put('/user', app.jwt, controller.user.updateUserInfo)        // 更新用户信息
  router.delete('/user/:id', app.jwt, controller.user.deleteUserById) // 删除指定用户
  router.put('/gift', app.jwt, controller.live.addGifts)              // 添加礼物
  router.put('/live', app.jwt, controller.live.updateLive)
  // socket.io
  io.of('/').route('new message', io.controller.chat.newMessage)
  io.of('/').route('old message', io.controller.chat.oldMessage)
};