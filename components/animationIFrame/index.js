// tabs = bottom/top/disable（bottom: tab栏显示在下面/top: tab栏显示在上面/disable: 不显示tab栏）
//   language = zh/en（zh: 中文/en: 英文/zht: 繁体中文/vi: 越南语）
export const AnimationIFrame = ({ lang = 'zh', matchId, tabs = 'bottom' }) => {
  // const matchId = '33848973';
  // [
  //   'https://animation.fb6pro.com/animation/index.html?matchId=33848973',
  // ];

  const URL_SRC = `https://animation.fb6pro.com/animation/index.html?matchId=${matchId}&language=${lang}&tabs=${tabs}`;
  // 示例：得到完成地址放入Iframe中 URL_SRC = `https://animation.fb6pro.com/animation/index.html?matchId=33848973&language=zh&tabs=bottom`;
  return (
    <iframe
      style={{ width: '100%', aspectRatio: 585 / 397 }}
      name='iframe'
      allowFullScreen='allowfullscreen'
      webkitallowfullscreen='true'
      mozallowfullscreen='true'
      allowtransparency='true'
      auto='autoplay'
      // muted='muted'
      frameBorder='0'
      src={URL_SRC}
    />
  );
};
