import { Controller } from 'egg';

const _table = 'helplist';

class ProjectController extends Controller {
  /**
   * 列表查询
   */
  async list() {
    const ctx = this.ctx;
    const { current = 1, pageSize = 20, ...rest } = ctx.request.body;

    let _where = 'WHERE TRUE';
    const _values: any[] = [];

    Object.keys(rest).map((_key) => {
      _where += ` AND ${_key} Like ?`;
      _values.push(`%${rest[_key] || ''}%`);
    });

    const res_total = await this.app.mysql.query(`SELECT COUNT(*) as count FROM ${_table} ${_where}`, _values);

    // 分页
    _values.push((current - 1) * pageSize);
    _values.push(pageSize);

    const res_list = await this.app.mysql.query(`SELECT * FROM ${_table} ${_where} ORDER BY updateTime DESC limit ?,?`, _values);

    this.ctx.body = { code: 200, data: { list: res_list, total: res_total[0]?.count } };
  }
  /**
   * 修改
   */
  async edit() {
    const ctx = this.ctx;
    const { id, ...rest } = ctx.request.body;
    if (id) {
      const result = await this.app.mysql.update(_table, { ...rest }, { where: { id } });
      this.ctx.body = { code: 200, data: { result } };
    } else {
      const result = await this.app.mysql.insert(_table, { ...rest });
      this.ctx.body = { code: 200, data: { result } };
    }
  }

  /**
   * 删除
   */
  async delete() {
    const ctx = this.ctx;
    const { id } = ctx.request.body;
    const result = await this.app.mysql.delete(_table, { id });
    ctx.body = { code: 200, msg: '删除成功！', data: { result } };
  }
}

export default ProjectController;
