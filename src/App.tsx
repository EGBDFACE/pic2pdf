import React from 'react';
// import { Button } from 'antd';
// import logo from './logo.svg';
import { PicturesWall } from './components/upload';
import { PageHeader, Card } from 'antd';
import 'antd/dist/antd.css'
import './App.css';

function App() {
  return (
    <div className="App">
      <PageHeader
        className="site-page-header"
        title="pics2pdf"
        subTitle="convert multiple pictures to pdf file"
        backIcon={false}
      />
      <PicturesWall />
      <div className="tipInfo">
        <Card title="* support picture format (theoretically)"
          className="tipInfoContent"
          extra={<a href="https://artskydj.github.io/jsPDF/docs/modules_addimage.js.html" target="_blank" rel="noopener noreferrer">More</a>}
          style={{ width: 400}}>
            <p>jpeg</p>
            <p>png</p>
            <p>bmp</p>
            <p>webp (working on it)</p>
        </Card>
      </div>
    </div>
  );
}

export default App;
