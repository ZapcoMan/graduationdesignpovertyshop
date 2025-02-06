// This file is created by egg-ts-helper@2.1.0
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportAccount from '../../../app/controller/account';
import ExportAddress from '../../../app/controller/address';
import ExportAnalysis from '../../../app/controller/analysis';
import ExportCarousel from '../../../app/controller/carousel';
import ExportDonate from '../../../app/controller/donate';
import ExportDonatetype from '../../../app/controller/donatetype';
import ExportGeneralapi from '../../../app/controller/generalapi';
import ExportGoods from '../../../app/controller/goods';
import ExportHelplist from '../../../app/controller/helplist';
import ExportOrderlist from '../../../app/controller/orderlist';
import ExportProject from '../../../app/controller/project';
import ExportRecommend from '../../../app/controller/recommend';
import ExportStudentinformation from '../../../app/controller/studentinformation';
import ExportUpload from '../../../app/controller/upload';
import ExportUserinfo from '../../../app/controller/userinfo';

declare module 'egg' {
  interface IController {
    account: ExportAccount;
    address: ExportAddress;
    analysis: ExportAnalysis;
    carousel: ExportCarousel;
    donate: ExportDonate;
    donatetype: ExportDonatetype;
    generalapi: ExportGeneralapi;
    goods: ExportGoods;
    helplist: ExportHelplist;
    orderlist: ExportOrderlist;
    project: ExportProject;
    recommend: ExportRecommend;
    studentinformation: ExportStudentinformation;
    upload: ExportUpload;
    userinfo: ExportUserinfo;
  }
}
