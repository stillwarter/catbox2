/**
 * md文件操作-主进程
 */
import {
  handle_getMdMarkList,
  handle_createDirectroyRoot,
  handle_createDirectroy,
  handle_createFile,
  handle_delDirectory,
  handle_delMdFile,
  handle_renamedirectory,
  handle_renamefile,
  handle_setMdContent,
  handle_getMdContent,
  handle_uploadImg
} from './mdhandler'
export const mdMainList = [
  {
    channel: 'get-mdlist-info',
    type: 'answer',
    description: '获取md记录文件数结构',
    handler: async () => {
      const list = await handle_getMdMarkList()
      return list
    }
  },
  {
    channel: 'set-mdDirectoryRoot-add',
    type: 'answer',
    description: '根文件夹增加',
    handler: async pathname => {
      const result = await handle_createDirectroyRoot(pathname)
      return result
    }
  },
  {
    channel: 'set-mdDirectory-add',
    type: 'answer',
    description: '文件夹增加',
    handler: async pathname => {
      const result = await handle_createDirectroy(pathname)
      return result
    }
  },
  {
    channel: 'set-mdflie-add',
    type: 'answer',
    description: 'md文件增加',
    handler: async pathname => {
      const result = await handle_createFile(pathname)
      return result
    }
  },
  {
    channel: 'set-directory-rename',
    type: 'answer',
    description: '文件夹重命名',
    handler: async ({ oldpath, newpath }) => {
      const result = await handle_renamedirectory({ oldpath, newpath })
      return result
    }
  },
  {
    channel: 'set-mdflie-rename',
    type: 'answer',
    description: 'md文件重命名',
    handler: async ({ oldpath, newpath }) => {
      const result = await handle_renamefile({ oldpath, newpath })
      return result
    }
  },
  {
    channel: 'set-directory-delete',
    type: 'answer',
    description: '文件夹删除',
    handler: async pathname => {
      const result = await handle_delDirectory(pathname)
      return result
    }
  },
  {
    channel: 'set-mdflie-delete',
    type: 'answer',
    description: 'md文件删除',
    handler: async pathname => {
      const result = await handle_delMdFile(pathname)
      return result
    }
  },
  {
    channel: 'set-mdfile',
    type: 'answer',
    description: '设置md文件内容',
    handler: async ({ pathname, content, meta }) => {
      const result = await handle_setMdContent({ pathname, content, meta })
      return result
    }
  },
  {
    channel: 'get-mdfile',
    type: 'answer',
    description: '获取md文件内容',
    handler: async pathname => {
      const result = await handle_getMdContent(pathname)
      return result
    }
  },
  {
    channel: 'upload-mdImg',
    type: 'answer',
    description: 'md文件图片上传',
    handler: async ({ content, imgtype }) => {
      const result = await handle_uploadImg({ content, imgtype })
      return result
    }
  }
]


function filterTree(tree) {
    // 如果不是数组，直接返回空数组或原数据
    if (!Array.isArray(tree)) {
        return [];
    }
    
    // 递归处理每个节点
    return tree.reduce((result, node) => {
        // 检查节点是否符合过滤条件
        const isNameValid = node.name 
            && !node.name.startsWith('.')  // 排除以'.'开头的名字
            && !node.name.endsWith('sh');  // 排除以'sh'结尾的名字
        
        // 如果当前节点有效
        if (isNameValid) {
            // 递归处理子节点（如果有）
            const children = node.children ? filterTree(node.children) : [];
            
            // 创建新节点，保留原节点的所有属性，替换处理后的子节点
            const newNode = {
                ...node,
                children  // 如果子节点全部被过滤，这里会是一个空数组
            };
            
            result.push(newNode);
        }
        
        return result;
    }, []);
}
