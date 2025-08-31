import daytime from "../utils/time";

export const Stconfig = {
  projname: "摸鱼笔记",
  layout: {
    headerheight: "35px",
    footerheight: "35px",
  },
  stwords: true,
  markpath: "Mark",
  defaultMeta: {
    auth: "stillwarter",
    fristdate: daytime.format(daytime.now()),
    isSyn2Fishpi: false,
    isSyn2Stblog: false,
    fishimgurllist: {},
    update: null,
  },
  staticImgPort: 8283,
  proxyFishPort: 3001,
};
