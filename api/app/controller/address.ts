import { Controller } from 'egg';

const _table = 'address';

class AddressController extends Controller {
  /**
   * 查询用户收获地址
   */
  async get_by_user() {
    const { ctx, app } = this;
    const token: any = ctx.request?.header?.token;
    if (token) {
      const _data: any = app.jwt.verify(token, app.config.jwt.secret);
      const _uid = _data?.id;
      const list = await this.app.mysql.query(`SELECT * FROM ${_table} WHERE userinfo=?`, [_uid]);
      this.ctx.body = { code: 200, data: { list } };
    } else {
      ctx.body = { code: 201, msg: '未登录！' };
    }
  }
}

export default AddressController;
