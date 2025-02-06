import { Controller } from 'egg';
import dayjs from 'dayjs';

const _table = 'orderlist';

class ProjectController extends Controller {
  /**
   * 用户列表查询
   */
  async listByUser() {
    try {
      const { ctx, app } = this;
      const { current = 1, pageSize = 20, ...rest } = ctx.request.body;
      const token: any = ctx.request?.header?.token;
      const _data: any = app.jwt.verify(token, app.config.jwt.secret);
      const _uid = _data?.id;

      let _where = 'WHERE userinfo = ?';
      const _values: any[] = [_uid];

      Object.keys(rest).map((_key) => {
        _where += ` AND ${_key} Like ?`;
        _values.push(`%${rest[_key] || ''}%`);
      });

      const res_total = await this.app.mysql.query(`SELECT COUNT(*) as count FROM ${_table} ${_where}`, _values);

      // 分页
      _values.push((current - 1) * pageSize);
      _values.push(pageSize);

      let res_list = await this.app.mysql.query(`SELECT * FROM ${_table} ${_where} ORDER BY updateTime DESC limit ?,?`, _values);

      await Promise.all(
        res_list.map(async (element, index) => {
          const goods = await this.app.mysql.get('goods', { id: element.goods });
          res_list[index]._goods = goods;
        }),
      );

      this.ctx.body = { code: 200, data: { list: res_list, total: res_total[0]?.count } };
    } catch (error) {
      this.ctx.body = { code: 200, msg: '出错！', data: error };
    }
  }

  /**
   * 用户下单
   */
  async submitOrder() {
    const { ctx, app } = this;
    const { id, address } = ctx.request.body;
    const token: any = ctx.request?.header?.token;

    if (token) {
      const _data: any = app.jwt.verify(token, app.config.jwt.secret);
      const _uid = _data?.id;
      if (_uid) {
        const user = await this.app.mysql.get('userinfo', { id: _uid });
        const goods = await this.app.mysql.get('goods', { id: id });
        const result = await this.app.mysql.insert(_table, {
          orderNumber: 'D' + dayjs().valueOf(),
          userinfo: user.id,
          goods: goods.id,
          price: goods.price,
          createTime: new Date(),
          address,
          isPay: 1,
          payTime: new Date(),
          status: '已付款',
          updateTime: new Date(),
        });
        ctx.body = { code: 200, data: { result }, msg: '成功！' };
      } else {
        ctx.body = { code: 201, msg: 'Token失效！' };
      }
    } else {
      ctx.body = { code: 201, msg: '未登录！' };
    }
  }
}

export default ProjectController;
