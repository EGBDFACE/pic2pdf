import React from 'react';
import { Button, Input, Upload, Modal, message } from 'antd';
import { DownloadOutlined, FilePdfOutlined, PlusOutlined } from '@ant-design/icons';
import { UploadFile, RcCustomRequestOptions } from 'antd/lib/upload/interface';

import { jsPDF } from 'jspdf';

import { fileObjToFile, getCommonString, getFileName } from '../util/tools'
import { IPDFPageObj } from '../util/type';

import './upload.css';

function getBase64(file: File | Blob | undefined) : Promise<IPDFPageObj | undefined>{
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    if (!file) {
      console.log(file);
      message.error('file load fail');
      return resolve()
    }
    reader.readAsDataURL(file);
    reader.onload = () => {
      const img = new Image()
      img.src = String(reader.result)
      img.onload = () => {
        const resolveResult = {
          imgUrlBase64: String(reader.result),
          imgWidth: img.width,
          imgHeight: img.height,
          canvasEle: undefined
        }
        const canvasEle = document.createElement('canvas');
        const canvasContext = canvasEle.getContext('2d');
        canvasEle.width=img.width;
        canvasEle.height=img.height;
        if (canvasContext) {
          canvasContext.drawImage(img, 0, 0);
          return resolve({
            ...resolveResult,
            canvasEle
          })
        }
        return resolve(resolveResult);
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
    pdfFileName: ''
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
    const { fileList, pdfFileName } = this.state
    const uidList = fileList.map((v: UploadFile) => v.uid)
    if (uidList.includes(file.uid)) return
    if (!fileObjToFile(file)) return;
    file.originFileObj = fileObjToFile(file);
    const commonName = pdfFileName ? getCommonString(pdfFileName, getFileName(file.name)) : getFileName(file.name);
    this.setState({ 
      fileList: [...fileList, file],
      pdfFileName: commonName.trim()
    })
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
        if (v.canvasEle) {
          pdf.addImage(v.canvasEle, 0, 0, v.imgWidth, v.imgHeight)
        } else {
          message.warning('webp pic may have some unknow problem here, please change chrome to have a try')
          pdf.addImage(v.imgUrlBase64, 0, 0, v.imgWidth, v.imgHeight);
        }
      })
      pdf.save(this.state.pdfFileName)
    } catch (err) {
      console.log(err)
      message.error('some unknown errors happen')
    }
  }

  handleFileName = (e: any) => {
    e.persist();
    this.setState({ pdfFileName: e.target.value })
  }

  render() {
    const { previewVisible, previewImage, fileList, previewTitle, pdfFileName } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}><p>Add pic</p><p>click or drag</p></div>
      </div>
    );
    return (
      <>
        <Upload
          className="pic-upload"
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
            value={pdfFileName}
            size="large"
            prefix={<FilePdfOutlined />}
            className="pdf-filename-input"
            // style={{width: '150px', marginRight: '10px'}}
            onChange={this.handleFileName}
            onPressEnter={this.handleOutputWithImg}
          />
          <Button type="primary"
            onClick={this.handleOutputWithImg}
            shape="round"
            icon={<DownloadOutlined />}
            size="large"
            >Get PDF</Button>
        </div>
      </>
    );
  }
}
