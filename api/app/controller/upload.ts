import { Controller } from 'egg';
import path from 'path';
import fs from 'fs';
import mkdirp from 'mkdirp';
import { v4 as uuidv4 } from 'uuid';

class UploadController extends Controller {
  async uploadFile() {
    const { ctx } = this;
    const { files } = ctx.request;
    const uploadDir = 'app/public/upload';

    const list: string[] = [];

    const base_url = ctx.request.href?.replace('uploadimage', '');

    try {
      await mkdirp(uploadDir);

      files.forEach((file) => {
        const f = fs.readFileSync(file.filepath);

        const extname = path.extname(file.filename); // 获取文件后缀名
        const filename = `${uuidv4()}${extname}`;
        const file_path = path.join(uploadDir, filename);

        fs.writeFileSync(file_path, f);

        list.push(`${base_url}public/upload/${filename}`);
      });
      ctx.body = { code: 200, msg: '文件上传成功', data: { list } };
    } catch (error) {
      ctx.body = { code: 201, msg: '上传出错' };
    } finally {
      await this.ctx.cleanupRequestFiles();
    }
  }
}

export default UploadController;
