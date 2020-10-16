import React from 'react';
import { Button, Input, Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { UploadFile, RcCustomRequestOptions } from 'antd/lib/upload/interface';

import { jsPDF } from 'jspdf';

import { fileObjToFile } from '../util/tools'
import { IPDFPageObj } from '../util/type';

function getBase64(file: File | Blob | undefined) : Promise<IPDFPageObj> | undefined{
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    if (!file) {
      console.log(file);
      message.error('unknown type file');
      return;
    }
    reader.readAsDataURL(file);
    reader.onload = () => {
      const img = new Image()
      img.src = String(reader.result)
      img.onload = function (){
        const that : any = this
        return resolve({
          imgUrlBase64 : String(reader.result),
          imgWidth: that.width,
          imgHeight: that.height
        });
      }
    }
    reader.onerror = error => reject(error);
  });
}

export class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [],
    pdfFileName: 'new'
  };

  handleCancel = () => this.setState({ previewVisible: false });
  // 点击预览
  handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      const data = await getBase64(file.originFileObj);
      file.preview = data?.imgUrlBase64 || ''
    }
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name,
    });
  };

  // 点击移除
  handleRemove = (file: UploadFile) => {
    const fileList = [...this.state.fileList];
    let i: number = -1;
    fileList.some((ele: UploadFile, index) => {
      if (ele.uid === file.uid) {
        i = index;
        return true;
      }
      return false
    })
    if (i === -1) {
      message.error('could not find index')
      return
    }
    fileList.splice(i,1)
    this.setState({ fileList })
  }

  // 自定义上传逻辑
  handleUpload = (param: RcCustomRequestOptions) => {
    const file: UploadFile = param.file
    const { fileList } = this.state
    const uidList = fileList.map((v: UploadFile) => v.uid)
    if (uidList.includes(file.uid)) return
    if (!fileObjToFile(file)) return;
    file.originFileObj = fileObjToFile(file)
    console.log(file)
    this.setState({ fileList: [...fileList, file] })
  }

  _getPdfData = async (): Promise<IPDFPageObj[]> => {
    const { fileList } = this.state
    if (fileList.length < 1) {
      message.info('please upload one pic at lease')
      return []
    }
    const pdfData: IPDFPageObj[] = []
    for (let i=0; i<fileList.length; i++) {
      const transImgData = await getBase64(fileList[i])
      if (transImgData) {
        pdfData.push(transImgData)
      }
    }
    return pdfData
  }

  handleOutputWithImg = async () => {
    const pdfData: IPDFPageObj[] = await this._getPdfData()
    if (pdfData.length < 1) return

    try {
      const pdf = new jsPDF('p', 'px', [pdfData[0].imgWidth, pdfData[0].imgHeight])
      pdfData.forEach((v,i) => {
        if (i !== 0) pdf.addPage([v.imgWidth, v.imgHeight])
        pdf.addImage(v.imgUrlBase64, 0, 0, v.imgWidth, v.imgHeight)
      })
      pdf.save(this.state.pdfFileName)
    } catch (err) {
      console.log(err)
      message.error('some unknown errors happen')
    }
  }

  handleFileName = (e: any) => {
    e.persist();
    this.setState({ pdfFileName: e.target.value || 'new' })
  }

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}><p>Add pic</p><p>click or drag</p></div>
      </div>
    );
    return (
      <>
        <Upload
          multiple
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          customRequest={this.handleUpload}
          onRemove={this.handleRemove}
        >
          {fileList.length >= 108 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
        <div>          
          <Input placeholder="pdf filename"
            maxLength={25}
            style={{width: '150px', marginRight: '10px'}}
            onChange={this.handleFileName}
          />
          <Button type="primary" onClick={this.handleOutputWithImg}>Get PDF</Button>
        </div>
      </>
    );
  }
}
