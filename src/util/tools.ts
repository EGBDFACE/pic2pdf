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