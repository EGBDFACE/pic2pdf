import React from 'react';
// import { Button } from 'antd';
// import logo from './logo.svg';
import { PicturesWall } from './components/upload';
import { PageHeader, Card } from 'antd';
import 'antd/dist/antd.css'
import './App.css';
import { GithubOutlined } from '@ant-design/icons';

function App() {
  return (
    <div className="App">
      <PageHeader
        className="site-page-header"
        title="pics2pdf"
        subTitle="convert multiple pictures to pdf file Locally"
        backIcon={false}
        extra={[
        <a href="https://github.com/EGBDFACE/pic2pdf"
          target="_blank"
          rel="noopener noreferrer"
          ><GithubOutlined /></a>
        ]}
      />
      <PicturesWall />
      <div className="tipInfo">
        <Card title="* support picture format (theoretically)"
          className="tipInfoContent"
          extra={
            <a href="https://artskydj.github.io/jsPDF/docs/modules_addimage.js.html"
              target="_blank"
              rel="noopener noreferrer"
            >More</a>
          }
          style={{ width: 400}}>
            <p>jpeg</p>
            <p>png</p>
            <p>bmp</p>
            <p>webp</p>
        </Card>
      </div>
    </div>
  );
}

export default App;
