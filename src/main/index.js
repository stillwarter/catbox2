import { mdMainList } from "./MDmain/mdmain";
import { fishMainList } from "./Fishpi/fishmain";
import { gitSynMainList } from "./Git/gitsynmain";
import { planMainList } from "./Plan/planmain";
import { worklogMainList } from "./Worklog/worklogmain";
export const MainEventList = [
  {
    channel: "get-system-info",
    type: "answer",
    description: "获取系统信息",
    handler: async () => {
      return {
        more: {
          des: "更多",
          value: JSON.stringify(process),
        },
      };
    },
  },
  ...mdMainList,
  ...fishMainList,
  ...gitSynMainList,
  ...planMainList,
  ...worklogMainList,
];
