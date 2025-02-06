import { Controller } from 'egg';

class RecommendController extends Controller {
  /**
   * 记录用户浏览记录
   */

  async add() {
    const { ctx, app } = this;
    const { category } = ctx.request.body;
    const token: any = ctx.request?.header?.token;

    if (token) {
      const _data: any = app.jwt.verify(token, app.config.jwt.secret);
      const _uid = _data?.id;
      await this.app.mysql.insert('viewlog', { userinfo: _uid, category, updateTime: new Date() });
      this.ctx.body = { code: 200, msg: '写入成功' };
    } else {
      this.ctx.body = { code: 201, msg: '未登录用户' };
    }
  }

  /**
   * 贫困生帮扶，个性化推荐
   */
  async listProject() {
    const { ctx, app } = this;

    const token: any = ctx.request?.header?.token;
    const _data: any = app.jwt.verify(token, app.config.jwt.secret);
    const _uid = _data?.id;

    const _total = 1000;

    let _category_view: any[] = [];
    // 查询用户访问日志
    const _list_viewlog: any[] = await this.app.mysql.select('viewlog', { where: { userinfo: _uid } });

    // 统计每个分类访问次数
    _list_viewlog.forEach((element) => {
      if (_category_view.find((d) => d.id == element.category)) {
        _category_view = _category_view.map((d) => {
          return {
            ...d,
            count: d.count + 1,
          };
        });
      } else {
        _category_view = _category_view.concat([
          {
            id: element.category,
            count: 1,
          },
        ]);
      }
    });

    // 过滤不是在该数据库中分类
    let _category_view_new: any[] = [];
    await Promise.all(
      _category_view.map(async (d) => {
        const count = await this.app.mysql.count('project');
        if (count > 0) {
          _category_view_new = _category_view_new.concat([d]);
        }
      }),
    );

    // 访问总日志
    const _total_log = _list_viewlog.length;
    // 按比例分配
    _category_view_new = _category_view_new.map((d) => {
      return {
        ...d,
        pageSize: Math.floor((d.count / _total_log) * _total),
      };
    });

    let _list = [];
    //分别查询每个分类
    await Promise.all(
      _category_view_new.map(async (d) => {
        const _list_res = await this.app.mysql.query(`SELECT * FROM project WHERE category=? ORDER BY updateTime DESC limit ?,?`, [d.id, 0, d.pageSize]);
        _list = _list.concat(_list_res);
      }),
    );

    this.ctx.body = { code: 200, data: { list: _list } };
  }
  /**
   * 校园物品
   */
  async listGoods() {
    const { ctx, app } = this;

    const token: any = ctx.request?.header?.token;
    const _data: any = app.jwt.verify(token, app.config.jwt.secret);
    const _uid = _data?.id;

    const _total = 1000;

    let _category_view: any[] = [];
    // 查询用户访问日志
    const _list_viewlog: any[] = await this.app.mysql.select('viewlog', { where: { userinfo: _uid } });

    // 统计每个分类访问次数
    _list_viewlog.forEach((element) => {
      if (_category_view.find((d) => d.id == element.category)) {
        _category_view = _category_view.map((d) => {
          return {
            ...d,
            count: d.count + 1,
          };
        });
      } else {
        _category_view = _category_view.concat([
          {
            id: element.category,
            count: 1,
          },
        ]);
      }
    });

    // 过滤不是在该数据库中分类
    let _category_view_new: any[] = [];
    await Promise.all(
      _category_view.map(async (d) => {
        const count = await this.app.mysql.count('goods');
        if (count > 0) {
          _category_view_new = _category_view_new.concat([d]);
        }
      }),
    );

    // 访问总日志
    const _total_log = _list_viewlog.length;
    // 按比例分配
    _category_view_new = _category_view_new.map((d) => {
      return {
        ...d,
        pageSize: Math.floor((d.count / _total_log) * _total),
      };
    });

    let _list = [];
    //分别查询每个分类
    await Promise.all(
      _category_view_new.map(async (d) => {
        const _list_res = await this.app.mysql.query(`SELECT * FROM goods WHERE category=? ORDER BY updateTime DESC limit ?,?`, [d.id, 0, d.pageSize]);
        _list = _list.concat(_list_res);
      }),
    );

    this.ctx.body = { code: 200, data: { list: _list } };
  }
  /**
   * 贫困生帮扶
   */
  async listHelp() {
    const list = await this.app.mysql.select('helplist', { where: {} });
    this.ctx.body = { code: 200, data: { list }, msg: '不支持个性化推荐' };
  }
}

export default RecommendController;
