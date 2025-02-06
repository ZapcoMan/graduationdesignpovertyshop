/*
 Navicat Premium Data Transfer

 Source Server         : 10.0.0.218
 Source Server Type    : MySQL
 Source Server Version : 100432
 Source Host           : 10.0.0.218:3306
 Source Schema         : shop

 Target Server Type    : MySQL
 Target Server Version : 100432
 File Encoding         : 65001

 Date: 18/04/2024 18:37:43
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for address
-- ----------------------------
DROP TABLE IF EXISTS `address`;
CREATE TABLE `address`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'uuid()',
  `userinfo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `text` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `userinfo`(`userinfo`) USING BTREE,
  CONSTRAINT `address_ibfk_1` FOREIGN KEY (`userinfo`) REFERENCES `userinfo` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of address
-- ----------------------------
INSERT INTO `address` VALUES ('8297baff-fb22-11ee-9fb5-005056b8f968', '189f3f74-fa44-11ee-9fb5-005056b8f968', '中国阿斯顿啊撒旦发生大');
INSERT INTO `address` VALUES ('f98045d7-fb94-11ee-8a76-005056b8f968', '189f3f74-fa44-11ee-9fb5-005056b8f968', '的说法傻瓜啊十大高手');
INSERT INTO `address` VALUES ('fb889106-fb94-11ee-8a76-005056b8f968', '189f3f74-fa44-11ee-9fb5-005056b8f968', '阿桑的歌发给对方');

-- ----------------------------
-- Table structure for carousel
-- ----------------------------
DROP TABLE IF EXISTS `carousel`;
CREATE TABLE `carousel`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'uuid()',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `pic` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `updateTime` datetime(0) NULL DEFAULT NULL,
  `isEnable` int(1) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of carousel
-- ----------------------------
INSERT INTO `carousel` VALUES ('b932e9ac-fa63-11ee-9fb5-005056b8f968', '幻灯片2', 'http://127.0.0.1:7001/public/upload/651d56fe-51af-4b8e-94ba-bbecdd43d9fc.png', NULL, '2024-04-14 13:40:23', 1);
INSERT INTO `carousel` VALUES ('c6327c83-fa63-11ee-9fb5-005056b8f968', '幻灯片3', 'http://127.0.0.1:7001/public/upload/6086bfaf-a9ab-43a3-b786-a8c114119a41.png', NULL, '2024-04-14 13:40:44', 1);
INSERT INTO `carousel` VALUES ('f841aa71-fa61-11ee-9fb5-005056b8f968', '幻灯片1', 'http://127.0.0.1:7001/public/upload/7fa04e09-d332-4ac0-b82f-cff8e0c3ff98.png', '', '2024-04-14 13:40:10', 1);

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'uuid()',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `updateTime` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES ('0b99c4be-fbda-11ee-b4d4-005056b8f968', '残疾人帮扶', '2024-04-16 10:14:01');
INSERT INTO `category` VALUES ('1b06b4bc-fbda-11ee-b4d4-005056b8f968', '校园求助', '2024-04-16 10:14:26');
INSERT INTO `category` VALUES ('2547815a-fbda-11ee-b4d4-005056b8f968', '二手书籍', '2024-04-16 10:14:44');
INSERT INTO `category` VALUES ('261a67c0-fbd9-11ee-b4d4-005056b8f968', '乡村帮扶', '2024-04-16 10:07:36');
INSERT INTO `category` VALUES ('2c02b358-fbd9-11ee-b4d4-005056b8f968', '校园跑腿', '2024-04-16 10:07:45');
INSERT INTO `category` VALUES ('cfea6e24-fbd7-11ee-b4d4-005056b8f968', '民生工程', '2024-04-16 09:58:01');

-- ----------------------------
-- Table structure for donate
-- ----------------------------
DROP TABLE IF EXISTS `donate`;
CREATE TABLE `donate`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'uuid()',
  `userinfo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `donatetype` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `info` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `updateTime` datetime(0) NULL DEFAULT NULL,
  `startTime` datetime(0) NULL DEFAULT NULL,
  `endTime` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `userinfo`(`userinfo`) USING BTREE,
  INDEX `donatetype`(`donatetype`) USING BTREE,
  CONSTRAINT `donate_ibfk_1` FOREIGN KEY (`userinfo`) REFERENCES `userinfo` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `donate_ibfk_2` FOREIGN KEY (`donatetype`) REFERENCES `donatetype` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of donate
-- ----------------------------
INSERT INTO `donate` VALUES ('161b2676-fbf4-11ee-b4d4-005056b8f968', '189f3f74-fa44-11ee-9fb5-005056b8f968', '0448af9c-fbf4-11ee-b4d4-005056b8f968', '我提供志愿者服务', '已通过', '2024-04-16 13:20:51', '2010-01-01 08:00:00', '2010-01-03 08:00:00');
INSERT INTO `donate` VALUES ('2fa54a9a-fbcb-11ee-b4d4-005056b8f968', '189f3f74-fa44-11ee-9fb5-005056b8f968', '4bcdabf9-f8e7-11ee-82fe-005056b8f968', '100', '已提交', '2024-04-16 08:27:39', '2010-04-30 16:00:00', '2010-05-06 16:00:00');
INSERT INTO `donate` VALUES ('3cc86b96-fbf4-11ee-b4d4-005056b8f968', '189f3f74-fa44-11ee-9fb5-005056b8f968', '485e871f-f8e7-11ee-82fe-005056b8f968', '我有衣服，请联系xxxx\n地址：撒地方哈师大会尽快发撒对话框', '拒绝', '2024-04-16 13:23:00', '2024-04-16 05:21:30', '2024-04-16 05:21:30');
INSERT INTO `donate` VALUES ('4d678598-fbcb-11ee-b4d4-005056b8f968', '189f3f74-fa44-11ee-9fb5-005056b8f968', '485e871f-f8e7-11ee-82fe-005056b8f968', '阿斯顿噶噶昂贵的给撒大噶是', '已提交', '2024-04-16 08:28:29', '2013-04-30 16:00:00', '2028-04-30 16:00:00');
INSERT INTO `donate` VALUES ('6d712428-fbcd-11ee-b4d4-005056b8f968', '189f3f74-fa44-11ee-9fb5-005056b8f968', '4bcdabf9-f8e7-11ee-82fe-005056b8f968', '【在线捐款】：1005', '已完成', '2024-04-16 08:43:41', '2024-04-16 08:43:41', '2024-04-16 08:43:41');
INSERT INTO `donate` VALUES ('94037663-fbcb-11ee-b4d4-005056b8f968', '189f3f74-fa44-11ee-9fb5-005056b8f968', '485e871f-f8e7-11ee-82fe-005056b8f968', '登革热歌热舞', '已完成', '2024-04-16 08:30:54', '2010-05-31 08:00:00', '2010-07-31 08:00:00');
INSERT INTO `donate` VALUES ('99ecbe3f-fbcb-11ee-b4d4-005056b8f968', '189f3f74-fa44-11ee-9fb5-005056b8f968', '4bcdabf9-f8e7-11ee-82fe-005056b8f968', '在线捐赠人民币：500', '已完成', '2024-04-16 08:30:37', '2024-04-16 08:30:37', '2024-04-16 08:30:37');
INSERT INTO `donate` VALUES ('a74f8072-f8e7-11ee-82fe-005056b8f968', 'f02a5d0c-f8e5-11ee-82fe-005056b8f968', '485e871f-f8e7-11ee-82fe-005056b8f968', 'fgdf', '进行中', '2024-04-12 16:15:20', '2024-04-11 00:00:00', '2024-04-06 00:06:00');
INSERT INTO `donate` VALUES ('ac4e78c0-f8e7-11ee-82fe-005056b8f968', 'f02a5d0c-f8e5-11ee-82fe-005056b8f968', '485e871f-f8e7-11ee-82fe-005056b8f968', 'sadfsadfasd', '进行中', '2024-04-12 16:15:40', '2024-04-20 00:04:00', '2024-04-06 00:00:00');
INSERT INTO `donate` VALUES ('ae48dd5c-f8e7-11ee-82fe-005056b8f968', 'f02a5d0c-f8e5-11ee-82fe-005056b8f968', '485e871f-f8e7-11ee-82fe-005056b8f968', 'adsfasdf', '大事发生大', '2024-04-12 16:16:09', '2024-04-13 00:05:00', '2024-04-13 00:00:02');
INSERT INTO `donate` VALUES ('b001b688-f8e7-11ee-82fe-005056b8f968', 'f02a5d0c-f8e5-11ee-82fe-005056b8f968', '485e871f-f8e7-11ee-82fe-005056b8f968', 'asdfsad', '已同意', '2024-04-15 11:13:14', '2024-04-12 16:00:05', '2024-04-12 16:00:04');

-- ----------------------------
-- Table structure for donatetype
-- ----------------------------
DROP TABLE IF EXISTS `donatetype`;
CREATE TABLE `donatetype`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'uuid()',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `isOnlinePayment` int(1) NULL DEFAULT NULL,
  `isEnable` int(1) NULL DEFAULT NULL,
  `updateTime` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of donatetype
-- ----------------------------
INSERT INTO `donatetype` VALUES ('0448af9c-fbf4-11ee-b4d4-005056b8f968', '志愿者服务', 0, 1, '2024-04-16 13:19:55');
INSERT INTO `donatetype` VALUES ('485e871f-f8e7-11ee-82fe-005056b8f968', '捐赠物资', 0, 1, '2024-04-15 11:12:45');
INSERT INTO `donatetype` VALUES ('4bcdabf9-f8e7-11ee-82fe-005056b8f968', '在线捐款', 1, 1, '2024-04-15 11:12:24');

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'uuid()',
  `thumbnail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `price` decimal(10, 2) NULL DEFAULT NULL,
  `updateTime` datetime(0) NULL DEFAULT NULL,
  `category` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES ('6db1c113-fb13-11ee-9fb5-005056b8f968', 'http://127.0.0.1:7001/public/upload/cbf9ccfc-ec21-4bfd-8014-7a84a0278123.png', '花花公子格子长袖衬衫男士2024夏季潮流宽松免烫衬衣休闲外套男上衣服男装 G42浅蓝色 XL', '<p><img src=\"http://127.0.0.1:7001/public/upload/ceb7a7b0-2718-4186-8589-5d913577d915.jpg\"></p><p><img src=\"http://127.0.0.1:7001/public/upload/ceb7a7b0-2718-4186-8589-5d913577d915.jpg\"></p>', 698.10, '2024-04-15 10:38:07', NULL);
INSERT INTO `goods` VALUES ('71e382dc-fb18-11ee-9fb5-005056b8f968', 'http://127.0.0.1:7001/public/upload/410a9bec-f513-4db2-a55c-6f559645c5f3.png', '撒旦发生大受到惩罚的撒稍等', '<p><br></p><p>啊手动阀卡萨丁可立即回复卡萨丁和；法撒旦艰苦回复；撒旦很快两极分化的撒客户发的是<img src=\"http://127.0.0.1:7001/public/upload/58fea38f-a2fb-42fa-8647-e3595aba3914.jpg\"></p>', 0.54, '2024-04-16 13:08:05', 'cfea6e24-fbd7-11ee-b4d4-005056b8f968');
INSERT INTO `goods` VALUES ('7bec4381-fb13-11ee-9fb5-005056b8f968', 'http://127.0.0.1:7001/public/upload/eab7fceb-46f5-4d0f-8a02-69c6b55c2693.png', '花花公子格子长袖衬衫男士2024夏季潮流宽松免烫衬衣休闲外套男上衣服男装 G42浅蓝色 XL', '<p><img src=\"http://127.0.0.1:7001/public/upload/e977013f-f4ac-4893-908a-eca4a646383f.jpg\"></p><p><img src=\"http://127.0.0.1:7001/public/upload/ceb7a7b0-2718-4186-8589-5d913577d915.jpg\"></p>', 100.10, '2024-04-15 10:40:28', NULL);
INSERT INTO `goods` VALUES ('869df56c-fb13-11ee-9fb5-005056b8f968', 'http://127.0.0.1:7001/public/upload/c325fbb1-2ade-4f35-ac8b-b3d2c6a6439d.png', '花花公子格子长袖衬衫男士2024夏季潮流宽松免烫衬衣休闲外套男上衣服男装 G42浅蓝色 XL', '<p><img src=\"http://127.0.0.1:7001/public/upload/c508f672-21f0-4e4c-901b-956e34f78b60.jpg\"><img src=\"http://127.0.0.1:7001/public/upload/c508f672-21f0-4e4c-901b-956e34f78b60.jpg\"></p>', 977.65, '2024-04-16 13:08:15', '0b99c4be-fbda-11ee-b4d4-005056b8f968');
INSERT INTO `goods` VALUES ('9bb60de5-fb12-11ee-9fb5-005056b8f968', 'http://127.0.0.1:7001/public/upload/6610e72b-2740-44a2-aa46-d837ea8a88e9.png', '海尔（Haier）直驱精华洗 云溪176 超薄滚筒洗衣机全自动家用 10公斤大容量 智能投放 以旧换新 EG100BD176PROW', '<p><img src=\"http://127.0.0.1:7001/public/upload/83462ac8-4492-4632-9b98-7be78cec295c.jpg\"><img src=\"http://127.0.0.1:7001/public/upload/c508f672-21f0-4e4c-901b-956e34f78b60.jpg\"></p>', 54.64, '2024-04-16 13:07:59', '0b99c4be-fbda-11ee-b4d4-005056b8f968');
INSERT INTO `goods` VALUES ('b61793f6-fb12-11ee-9fb5-005056b8f968', 'http://127.0.0.1:7001/public/upload/a838c985-c241-4fab-a7fb-42437b1bcf9f.png', '长虹电视55D55 55英寸4K超高清 免遥控语音 全景屏 2+16GB 四大投屏 平板液晶LED电视机 以旧换新', '<p><img src=\"http://127.0.0.1:7001/public/upload/8dda8cef-8814-4fbc-b881-be1ea86d9270.jpg\"><img src=\"http://127.0.0.1:7001/public/upload/c508f672-21f0-4e4c-901b-956e34f78b60.jpg\"></p>', 125.84, '2024-04-16 13:30:59', '2c02b358-fbd9-11ee-b4d4-005056b8f968');
INSERT INTO `goods` VALUES ('d7cc5dab-fb12-11ee-9fb5-005056b8f968', 'http://127.0.0.1:7001/public/upload/7d659f55-b2fa-4b70-8fa0-26e5bbaea9ab.png', '公牛（BULL）新国标插座/插线板/插排/排插/接线板/拖线板 GN-B2040 4位总控全长3米', '<p><img src=\"http://127.0.0.1:7001/public/upload/9dd277fe-cef8-4419-928d-f6131aacfd98.jpg\"><img src=\"http://127.0.0.1:7001/public/upload/c508f672-21f0-4e4c-901b-956e34f78b60.jpg\"></p>', 24.50, '2024-04-16 13:08:53', 'cfea6e24-fbd7-11ee-b4d4-005056b8f968');

-- ----------------------------
-- Table structure for helplist
-- ----------------------------
DROP TABLE IF EXISTS `helplist`;
CREATE TABLE `helplist`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'uuid()',
  `userinfo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `pic` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `acceptor` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `receiveTime` datetime(0) NULL DEFAULT NULL,
  `finishTime` datetime(0) NULL DEFAULT NULL,
  `results` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `createTime` datetime(0) NULL DEFAULT NULL,
  `updateTime` datetime(0) NULL DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `bzphone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of helplist
-- ----------------------------
INSERT INTO `helplist` VALUES ('05072d91-f9b1-11ee-9382-005056b8f968', 'f02a5d0c-f8e5-11ee-82fe-005056b8f968', '俺说的克己复礼哦陪我', 'http://127.0.0.1:7001/public/upload/99724201-2a05-4cb9-92ad-526e6cc0e3a3.png,http://127.0.0.1:7001/public/upload/db8bf1e9-7e9b-4f9d-870a-390f84ca78bb.jpg', '的萨芬萨的；浪费空间那都是', '189f3f74-fa44-11ee-9fb5-005056b8f968', '2024-04-16 04:49:17', '2024-04-16 04:49:17', '萨达阿四搞定撒', '已完成', '2024-04-15 20:36:17', '2024-04-16 04:49:17', '51654656', '18158468745');
INSERT INTO `helplist` VALUES ('86b4d419-fb9e-11ee-8a76-005056b8f968', '189f3f74-fa44-11ee-9fb5-005056b8f968', '啊撒旦发生大', 'http://127.0.0.1:7001/public/upload/409b2fc5-5ee7-40e4-8d1b-14292e3dc3d9.jpg', '阿斯顿发生当时法国萨嘎是', '189f3f74-fa44-11ee-9fb5-005056b8f968', '2024-04-16 05:18:48', '2024-04-16 05:18:48', '打开撒娇回复啦第九十六号的时空几何饭卡里说的还是单身的科技孵化是的空间划分撒加快了对话框', '待帮助', '2024-04-16 13:19:04', '2024-04-16 13:19:04', '18158475424', '15478956547');
INSERT INTO `helplist` VALUES ('c3e4992a-fbf3-11ee-b4d4-005056b8f968', '189f3f74-fa44-11ee-9fb5-005056b8f968', '我需要上面帮助', 'http://127.0.0.1:7001/public/upload/c199a15c-7148-49f3-a723-46931b2a48e8.jpg,http://127.0.0.1:7001/public/upload/1c3ca877-2809-4445-9008-08731cf33aef.jpg', '啊手动阀来得及卡萨活佛阿斯顿回复Lasik的', NULL, NULL, NULL, NULL, '待帮助', '2024-04-16 13:18:07', NULL, '18725689875', NULL);

-- ----------------------------
-- Table structure for orderlist
-- ----------------------------
DROP TABLE IF EXISTS `orderlist`;
CREATE TABLE `orderlist`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'uuid()',
  `orderNumber` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `userinfo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `goods` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `price` decimal(10, 2) NULL DEFAULT NULL,
  `createTime` datetime(0) NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `isPay` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `payTime` datetime(0) NULL DEFAULT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `updateTime` datetime(0) NULL DEFAULT NULL,
  `kdgs` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `kddh` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `userinfo`(`userinfo`) USING BTREE,
  INDEX `goods`(`goods`) USING BTREE,
  CONSTRAINT `orderlist_ibfk_1` FOREIGN KEY (`userinfo`) REFERENCES `userinfo` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `orderlist_ibfk_2` FOREIGN KEY (`goods`) REFERENCES `goods` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of orderlist
-- ----------------------------
INSERT INTO `orderlist` VALUES ('02cc4731-fb2f-11ee-9fb5-005056b8f968', 'D1713189334484', '189f3f74-fa44-11ee-9fb5-005056b8f968', '7bec4381-fb13-11ee-9fb5-005056b8f968', 100.10, '2024-04-15 21:55:34', '阿斯蒂芬噶撒大噶是的撒打算', '1', '2024-04-15 21:55:34', '已付款', '2024-04-15 21:55:34', NULL, NULL);
INSERT INTO `orderlist` VALUES ('0867ecc8-fb8c-11ee-8c1c-005056b8f968', 'D1713228935012', '189f3f74-fa44-11ee-9fb5-005056b8f968', '6db1c113-fb13-11ee-9fb5-005056b8f968', 698.10, '2024-04-16 08:55:35', '阿斯蒂芬噶撒大噶是的撒打算', '1', '2024-04-16 08:55:35', '已付款', '2024-04-16 08:55:35', NULL, NULL);
INSERT INTO `orderlist` VALUES ('2dbcc4c1-fb2f-11ee-9fb5-005056b8f968', 'D1713189406524', '189f3f74-fa44-11ee-9fb5-005056b8f968', '71e382dc-fb18-11ee-9fb5-005056b8f968', 0.54, '2024-04-15 21:56:46', '阿斯蒂芬噶撒大噶是的撒打算', '1', '2024-04-15 21:56:46', '已付款', '2024-04-15 21:56:46', NULL, NULL);
INSERT INTO `orderlist` VALUES ('3126dbab-fb2f-11ee-9fb5-005056b8f968', 'D1713189412251', '189f3f74-fa44-11ee-9fb5-005056b8f968', '71e382dc-fb18-11ee-9fb5-005056b8f968', 0.54, '2024-04-15 21:56:52', '阿斯蒂芬噶撒大噶是的撒打算', '1', '2024-04-15 21:56:52', '已付款', '2024-04-15 21:56:52', NULL, NULL);
INSERT INTO `orderlist` VALUES ('81c2a0ce-fbf3-11ee-b4d4-005056b8f968', 'D1713273376659', '189f3f74-fa44-11ee-9fb5-005056b8f968', 'b61793f6-fb12-11ee-9fb5-005056b8f968', 125.84, '2024-04-16 13:16:16', '的说法傻瓜啊十大高手', '1', '2024-04-16 13:16:16', '已发货', '2024-04-16 13:16:56', '申通快递', '32266654654564646');
INSERT INTO `orderlist` VALUES ('8aa252d3-fb2d-11ee-9fb5-005056b8f968', 'D1713188703382', '189f3f74-fa44-11ee-9fb5-005056b8f968', '6db1c113-fb13-11ee-9fb5-005056b8f968', 698.10, '2024-04-13 21:45:03', '阿斯蒂芬噶撒大噶是的撒打算', '1', '2024-04-13 21:45:03', '已取消', '2024-04-15 13:46:01', NULL, NULL);
INSERT INTO `orderlist` VALUES ('8e5e1c8f-fb2d-11ee-9fb5-005056b8f968', 'D1713188709648', '189f3f74-fa44-11ee-9fb5-005056b8f968', '6db1c113-fb13-11ee-9fb5-005056b8f968', 698.10, '2024-04-14 21:45:09', '阿斯蒂芬噶撒大噶是的撒打算', '1', '2024-04-14 21:45:09', '已取消', '2024-04-15 13:46:00', NULL, NULL);
INSERT INTO `orderlist` VALUES ('8ecb67b4-fb2d-11ee-9fb5-005056b8f968', 'D1713188710364', '189f3f74-fa44-11ee-9fb5-005056b8f968', '6db1c113-fb13-11ee-9fb5-005056b8f968', 698.10, '2024-04-13 21:45:10', '阿斯蒂芬噶撒大噶是的撒打算', '1', '2024-04-13 21:45:10', '已发货', '2024-04-15 13:48:58', '是的给士大夫敢死队', '的式风格士大夫');
INSERT INTO `orderlist` VALUES ('8f4ce771-fb2d-11ee-9fb5-005056b8f968', 'D1713188711213', '189f3f74-fa44-11ee-9fb5-005056b8f968', '6db1c113-fb13-11ee-9fb5-005056b8f968', 698.10, '2024-04-15 13:45:11', '阿斯蒂芬噶撒大噶是的撒打算', '1', '2024-04-15 13:45:11', '已取消', '2024-04-15 13:45:23', NULL, NULL);
INSERT INTO `orderlist` VALUES ('8fb30420-fb2d-11ee-9fb5-005056b8f968', 'D1713188711882', '189f3f74-fa44-11ee-9fb5-005056b8f968', '6db1c113-fb13-11ee-9fb5-005056b8f968', 698.10, '2024-04-15 13:45:11', '阿斯蒂芬噶撒大噶是的撒打算', '1', '2024-04-15 13:45:11', '已取消', '2024-04-15 13:45:24', NULL, NULL);
INSERT INTO `orderlist` VALUES ('900568a3-fb2d-11ee-9fb5-005056b8f968', 'D1713188712422', '189f3f74-fa44-11ee-9fb5-005056b8f968', '6db1c113-fb13-11ee-9fb5-005056b8f968', 698.10, '2024-04-15 13:45:12', '阿斯蒂芬噶撒大噶是的撒打算', '1', '2024-04-15 13:45:12', '已取消', '2024-04-15 13:45:22', NULL, NULL);
INSERT INTO `orderlist` VALUES ('bfbce355-fb2d-11ee-9fb5-005056b8f968', 'D1713188792478', '189f3f74-fa44-11ee-9fb5-005056b8f968', '6db1c113-fb13-11ee-9fb5-005056b8f968', 698.10, '2024-04-15 13:46:32', '阿斯蒂芬噶撒大噶是的撒打算', '1', '2024-04-15 13:46:32', '已发货', '2024-04-15 13:48:43', '换个方式是', '35135136');
INSERT INTO `orderlist` VALUES ('ed32f7ae-fb2e-11ee-9fb5-005056b8f968', 'D1713189298246', '189f3f74-fa44-11ee-9fb5-005056b8f968', '71e382dc-fb18-11ee-9fb5-005056b8f968', 0.54, '2024-04-15 21:54:58', '阿斯蒂芬噶撒大噶是的撒打算', '1', '2024-04-15 21:54:58', '已付款', '2024-04-15 21:54:58', NULL, NULL);

-- ----------------------------
-- Table structure for project
-- ----------------------------
DROP TABLE IF EXISTS `project`;
CREATE TABLE `project`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'uuid()',
  `thumbnail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `intro` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `user` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `startTime` datetime(0) NULL DEFAULT NULL,
  `endTime` datetime(0) NULL DEFAULT NULL,
  `updateTime` datetime(0) NULL DEFAULT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `category` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of project
-- ----------------------------
INSERT INTO `project` VALUES ('0db10356-fafe-11ee-9fb5-005056b8f968', 'http://127.0.0.1:7001/public/upload/c84114e5-71e3-49c1-98ab-7ab6901bc973.png', 'aklsjdkas阿萨的开发老家安徽速度快；案例卡萨丁和疯狂拉升是的发射点干撒', '阿桑的歌范德萨给但反过来看；老阿斯顿啊手动阀手动阀打发手动阀手动阀宋大哥撒贵师大光辐射大概三点豆腐干士大夫发生十大发射点师打', '<p>的撒发生打开叫啥到了卡萨丁和观看了啥都会；失控大喊 第三方v快乐和撒地方喀什的框架和啊手动阀手动阀莉萨的撒地方伦敦皇家狂扫<img src=\"http://127.0.0.1:7001/public/upload/2c028792-61b8-4058-89d8-264c29ef7cc9.jpg\"></p>', '张三丰', '2024-04-18 16:00:00', '2024-04-01 16:04:00', '2024-04-16 13:29:17', '已完成', '2547815a-fbda-11ee-b4d4-005056b8f968');
INSERT INTO `project` VALUES ('fe54c2a7-f8e6-11ee-82fe-005056b8f968', 'http://127.0.0.1:7001/public/upload/6e02efb9-05d6-426f-ab2f-e8cff5668c58.png', 'asdfsa', '项目简介简介啊手动阀卡拉是否啊深刻搭街坊哈卡萨丁和flash的利夫卡河上的', '<p>asdfasdfsdafsadfsd项目联系：565456456<img src=\"http://127.0.0.1:7001/public/upload/9b516bd2-6fd5-413e-b266-63dd186088c6.jpg\"></p>', 'asdafasd（18554554xxx）', '2024-04-03 16:00:00', '2024-04-23 16:06:00', '2024-04-16 13:28:49', '进行中', '261a67c0-fbd9-11ee-b4d4-005056b8f968');

-- ----------------------------
-- Table structure for studentinformation
-- ----------------------------
DROP TABLE IF EXISTS `studentinformation`;
CREATE TABLE `studentinformation`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'uuid()',
  `studentnumber` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `idCard` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `sex` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `family` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `updateTime` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of studentinformation
-- ----------------------------
INSERT INTO `studentinformation` VALUES ('1a253d33-fb18-11ee-9fb5-005056b8f968', '56564', '5456456', '阿斯顿发大水', '男', '3652+656+', '354564', '35654', '2024-04-15 11:11:35');
INSERT INTO `studentinformation` VALUES ('e747cea3-61a8-49cb-8260-0c7bcec7174c', 'asdfasd', 'asdfsad', 'asdfsad', '未知', 'sadfsad', 'asdf', 'sadfsad', '2024-04-12 16:05:48');

-- ----------------------------
-- Table structure for userinfo
-- ----------------------------
DROP TABLE IF EXISTS `userinfo`;
CREATE TABLE `userinfo`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'uuid()',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `openid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `isAdmin` int(1) NULL DEFAULT NULL,
  `updateTime` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of userinfo
-- ----------------------------
INSERT INTO `userinfo` VALUES ('189f3f74-fa44-11ee-9fb5-005056b8f968', 'http://tmp/6vmEGf1xYszZ306a8cb6f3688e4be031cdc81b505489.jpeg', 'ozeoE7W-jJypeCw0BH9oDCVTzDsE', 'kgjgl', '', 0, '2024-04-15 07:31:45');
INSERT INTO `userinfo` VALUES ('6b070e26-f8e8-11ee-82fe-005056b8f968', 'http://127.0.0.1:7001/public/upload/225c86b6-a668-4db7-b8a0-d4690cd2908d.png', NULL, 'admin色的发射点', 'adminsadfsad ', 0, '2024-04-12 16:19:20');
INSERT INTO `userinfo` VALUES ('f02a5d0c-f8e5-11ee-82fe-005056b8f968', 'http://127.0.0.1:7001/public/upload/4c93b492-95a4-4d73-8edc-f61baf50f757.jpeg', NULL, 'admin', 'admin', 1, '2024-04-12 16:18:03');

-- ----------------------------
-- Table structure for viewlog
-- ----------------------------
DROP TABLE IF EXISTS `viewlog`;
CREATE TABLE `viewlog`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'uuid()',
  `userinfo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `category` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `updateTime` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `userinfo`(`userinfo`) USING BTREE,
  INDEX `category`(`category`) USING BTREE,
  CONSTRAINT `viewlog_ibfk_1` FOREIGN KEY (`userinfo`) REFERENCES `userinfo` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `viewlog_ibfk_2` FOREIGN KEY (`category`) REFERENCES `category` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of viewlog
-- ----------------------------
INSERT INTO `viewlog` VALUES ('482039ec-fbf5-11ee-b4d4-005056b8f968', '189f3f74-fa44-11ee-9fb5-005056b8f968', '261a67c0-fbd9-11ee-b4d4-005056b8f968', '2024-04-16 21:28:58');
INSERT INTO `viewlog` VALUES ('61838eb5-fbf5-11ee-b4d4-005056b8f968', '189f3f74-fa44-11ee-9fb5-005056b8f968', '0b99c4be-fbda-11ee-b4d4-005056b8f968', '2024-04-16 21:29:41');
INSERT INTO `viewlog` VALUES ('62f2c5ef-fbf5-11ee-b4d4-005056b8f968', '189f3f74-fa44-11ee-9fb5-005056b8f968', 'cfea6e24-fbd7-11ee-b4d4-005056b8f968', '2024-04-16 21:29:43');
INSERT INTO `viewlog` VALUES ('91635760-fbf8-11ee-b4d4-005056b8f968', '189f3f74-fa44-11ee-9fb5-005056b8f968', 'cfea6e24-fbd7-11ee-b4d4-005056b8f968', '2024-04-16 21:52:30');
INSERT INTO `viewlog` VALUES ('96122dac-fbf5-11ee-b4d4-005056b8f968', '189f3f74-fa44-11ee-9fb5-005056b8f968', '2c02b358-fbd9-11ee-b4d4-005056b8f968', '2024-04-16 21:31:09');
INSERT INTO `viewlog` VALUES ('eba55ea1-fd6e-11ee-b5d5-005056b8f968', '189f3f74-fa44-11ee-9fb5-005056b8f968', '0b99c4be-fbda-11ee-b4d4-005056b8f968', '2024-04-18 18:32:13');

SET FOREIGN_KEY_CHECKS = 1;
