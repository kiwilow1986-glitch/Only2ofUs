# 「两人的空间」需求清单 / Project Spec — LOWandFUM
> 需求管家档案：Kiwi 说过的每一条效果要求。任何改动前必读；交付前由监工对照检查。
> The requirements keeper's file: every effect Kiwi has specified. Read before any change; the supervisor checks deliveries against it.
> 最后更新 / Last updated: 2026-11-16

## 1. 开场 / Opening
- 每次重新打开 app，先播一次 8 秒开场影片 `INTRO.mp4`（原速、原色、内容零改动）
- 开场结尾定格 = **小字**状态（这是后续一切缩放逻辑的起点）
- 影片比例 19.5:9（1080x2340），在 iPhone 上铺满全屏，底部**不需要**任何补块/模糊/变淡

## 2. 版面 / Layout
- Posts 顶部 = 标题底部 + **2mm**
- 小字状态 posts 起点系数 0.368；大字状态 0.435；横幅高度 0.361（均 × 画面宽）
- 适配任何手机屏幕宽度（所有尺寸按画面宽等比）

## 3. 标题缩放 / Title shrink & grow
- 开场后**第一次往下 scroll：不播任何影片**（字本来就是小的），只把窗口收成横幅
- **第一次 scroll 回到最顶：才正式启动 `TITLE_GROW.mp4`**（小→大，播一次，定格在大字）
- 完成第一次之后：缩放进度**直接绑定 scroll 位置**（`TITLE_SHRINK.mp4`，全关键帧逐帧拖动）
  - scroll 快 → 缩放快；scroll 慢 → 缩放慢；方向可逆，完全跟手
- 动作必须顺滑，不允许突然换图/两套字重影

## 4. 背景 / Backdrop
- 看 posts 时（进度过半）背景切换成**无字**日落图 `BG_POSTS.jpg`，posts 是重点
- scroll 回顶时恢复完整画面
- 纯装饰层一律 pointer-events:none（点到不能有任何反应、不能卡顿）

## 5. 帖子 Emoji 效果 / Post reactions
- 点击 emoji：对应 MASTER 影片从按钮位置飞到 post **可见区域**的中央偏上
- 透明度 **75%**；整段（飞入+播放+收尾）**3 秒内完成**
- 结尾效果：**像风吹走一样**——往右上飘、旋转、缩小、淡出消失
- 影片黑色背景用 canvas 逐帧去除（高解析度，不能模糊）
- 同一个 post 同时只有一个在播，换点别的立即替换；按钮小跳动 + 音效保留
- 两人可各自对同一 post 选不同 emoji（各自储存，互不覆盖）
- 5 个 MASTER mp4 档案**绝对不改动**

## 6. 留言 Emoji / Comment reactions
- 选择后延迟 **10 秒**才写入数据库（10 秒内换选/取消则重新计时/取消），避免手滑乱发通知

## 7. 通知 / Notifications（Cloud Functions, `C:\Users\user\functions`）
- 会通知对方：**发新帖、新留言、帖子 emoji（新按+换按）、留言 emoji（新按+换按）**
- 收回 emoji 不通知；通知点开跳 `https://lowandfum.web.app`
- 改动 functions 后必须 `firebase deploy --only functions`

## 8. 在线状态 / Online presence
- 左下角小 bar：对方 70 秒内活跃时亮起「XX 在线 / online」（绿点），离线自动消失

## 9. 素材纪律 / Asset rules
- 用户提供的影片和图片：**不改颜色、不改内容、不裁画面**（除非 Kiwi 明确要求）
- 必要的剪切/重封装用最高画质（crf≤17）且零色彩调整，剪切点需逐帧核对接缝
- 登入限定两个 email；照片影片数据在 Firestore/Storage，部署 Hosting 永不影响数据

## 10. 工作流程 / Workflow
- 改动 → 本机测试 → GitHub（web上传）→ `firebase deploy` → 手机实测
- Claude 无 GitHub push 权限：一律由 Kiwi 在网页上传
- **每次交付前：监工 Agent 对照本清单逐条检查，过关才交付**
