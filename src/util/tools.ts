import { message } from "antd";
import { RcFile } from "antd/lib/upload";

export function fileObjToFile (fileObj: any) : RcFile | undefined {

  try {
    const result: any = new File([fileObj], fileObj.name, { type: fileObj.type })
    result.uid = fileObj.uid
    
    if (!(fileObj instanceof Blob) && !(fileObj instanceof File)) {
      message.error('some error happen')
      console.error(`fileObjToFile wrong: \n fileObj \n ${fileObj}`)
      return
    }

    return result
    
  } catch (err) {
    console.log(err)
  }
}

export function getCommonString (firstS: string, secondS: string) : string {
  let dp = []
  for (let i=0; i<=firstS.length; i++) { // 注意这里数组的大小
    dp[i] = new Array(secondS.length+1)
    dp[i].fill(0)
  }
  let ans = 0, as = 0;
  for (let i=firstS.length-1; i>=0; i--) {
    for (let j=secondS.length-1; j>=0; j--) {
      dp[i][j] = firstS[i] === secondS[j] ? dp[i+1][j+1]+1 : 0
      if (ans < dp[i][j]) {
        ans = dp[i][j]
        as = i
      }
    }
  }
  return firstS.substr(as, ans)
}

export function getFileName (filename: string) : string {
  let last = filename.lastIndexOf('.');
  // 将特殊字符换成空格
  return filename.slice(0, last === -1 ? undefined : last)
    .replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, ' ')
    .trim()
}