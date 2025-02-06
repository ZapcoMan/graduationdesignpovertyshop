import dayjs from 'dayjs';
import { Controller } from 'egg';

class AnalysisController extends Controller {
  /**
   * 系统数据
   */
  async getSysData() {
    const ctx = this.ctx;
    const {} = ctx.request.body;

    const zcs = await this.app.mysql.count('userinfo', {});
    const jzts = await this.app.mysql.count('donate', {});
    const xws = await this.app.mysql.count('goods', {});
    const dds = await this.app.mysql.count('orderlist', {});

    this.ctx.body = {
      code: 200,
      data: { zcs, jzts, xws, dds },
    };
  }

  async getColumn() {
    const ctx = this.ctx;
    const {} = ctx.request.body;

    const _list_donate: any[] = await this.app.mysql.select('donate', {});
    const _list: any[] = [];

    for (let index = 0; index < 15; index++) {
      const _day = dayjs().add(-index, 'day').format('YYYY-MM-DD');

      const _item = {
        name: dayjs(_day).format('MM-DD'),
        value:
          _list_donate?.filter(
            (d) =>
              dayjs(d.updateTime).valueOf() >= dayjs(_day).startOf('day').valueOf() &&
              dayjs(d.updateTime).valueOf() < dayjs(_day).startOf('day').add(1, 'day').valueOf(),
          )?.length || 0,
      };
      _list.push(_item);
    }

    this.ctx.body = {
      code: 200,
      data: { list: _list.reverse() },
    };
  }

  async getPie() {
    const ctx = this.ctx;
    const {} = ctx.request.body;

    const _list_donatetype: any[] = await this.app.mysql.select('donatetype', {});
    const _list_donate: any[] = await this.app.mysql.select('donate', {});

    const _list: any[] = [];

    _list_donatetype.forEach((element) => {
      const _item = {
        name: element.name,
        value: _list_donate.filter((d) => d.donatetype == element.id).length || 0,
      };
      _list.push(_item);
    });

    this.ctx.body = {
      code: 200,
      data: { list: _list.reverse() },
    };
  }

  async getArea() {
    const ctx = this.ctx;
    const {} = ctx.request.body;

    const _list_donate: any[] = await this.app.mysql.select('orderlist', {});
    const _list: any[] = [];

    for (let index = 0; index < 30; index++) {
      const _day = dayjs().add(-index, 'day').format('YYYY-MM-DD');

      const _item = {
        name: dayjs(_day).format('MM-DD'),
        value:
          _list_donate?.filter(
            (d) =>
              dayjs(d.createTime).valueOf() >= dayjs(_day).startOf('day').valueOf() &&
              dayjs(d.createTime).valueOf() < dayjs(_day).startOf('day').add(1, 'day').valueOf(),
          )?.length || 0,
      };
      _list.push(_item);
    }

    this.ctx.body = {
      code: 200,
      data: { list: _list.reverse() },
    };
  }
}

export default AnalysisController;
