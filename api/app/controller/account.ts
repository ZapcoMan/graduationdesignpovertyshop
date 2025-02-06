import { Controller } from 'egg';

const _table = 'userinfo';

class AccountController extends Controller {
  /**
   * 用户名密码登录
   */
  async login_by_username() {
    const ctx = this.ctx;
    const { username, password } = ctx.request.body;
    const user = await this.app.mysql.get(_table, { username });
    if (user && user?.id) {
      if (password == user.password) {
        if (user.isAdmin) {
          const token = this.app.jwt.sign({ id: user.id }, this.app.config.jwt.secret);
          ctx.body = { code: 200, msg: '登录成功！', data: { token, username: user.username } };
        } else {
          ctx.body = { code: 201, msg: '您不是管理员，不能登录！' };
        }
      } else {
        ctx.body = { code: 101, msg: '密码错误，请重新输入！' };
      }
    } else {
      ctx.body = { code: 101, msg: '用户名不存在，请检查！' };
    }
  }
  /**
   * 微信登录
   */
  async login_by_weixin() {
    const ctx = this.ctx;
    const { openid, ...rest } = ctx.request.body;
    let user = await this.app.mysql.get(_table, { openid });
    if (!user?.id) {
      await this.app.mysql.insert(_table, { openid, ...rest });
      user = await this.app.mysql.get(_table, { openid });
    }
    const token = this.app.jwt.sign({ id: user?.id }, this.app.config.jwt.secret);
    ctx.body = { code: 200, data: { token, id: user?.id, username: user.username }, msg: '登录成功！' };
  }
  /**
   * 获取用户信息
   */
  async getUserInfo() {
    const { ctx, app } = this;
    const token: any = ctx.request?.header?.token;
    if (token) {
      const _data: any = app.jwt.verify(token, app.config.jwt.secret);
      const _uid = _data?.id;
      if (_uid) {
        const user = await this.app.mysql.get(_table, { id: _uid });
        const { password, ...rest } = user;
        ctx.body = { code: 200, data: { userinfo: { ...rest } }, msg: '成功！' };
      } else {
        ctx.body = { code: 201, msg: 'Token失效！' };
      }
    } else {
      ctx.body = { code: 201, msg: '未登录！' };
    }
  }
  /**
   * 更新用户
   */
  async update() {
    const ctx = this.ctx;
    const { id, avatar, username, updateTime } = ctx.request.body;
    const result = await this.app.mysql.update(_table, { avatar, username, updateTime }, { where: { id } });
    ctx.body = { code: 200, data: { result }, msg: '成功！' };
  }
}

export default AccountController;
