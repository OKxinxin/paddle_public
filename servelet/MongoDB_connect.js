const mongoose = require('mongoose');
const zlib = require('zlib');
const fs = require('fs');

// 连接 MongoDB 数据库
const connectMongoDB = () => {
  mongoose.connect('mongodb://localhost:27017/', { useNewUrlParser: true });
};

// 创建 GridFS 存储实例
const conn = mongoose.createConnection('mongodb://localhost:27017/');
let gfs;
conn.once('open', () => {
  gfs = new mongoose.mongo.GridFSBucket(conn.db);
});

const saveData = (filename, path, type, callback) => {
  const writestream = gfs.openUploadStream(filename, {metadata: {type}});

  // 读取文件流
  const readstream = fs.createReadStream(path);

  // 将文件流管道传入写入流
  readstream.pipe(writestream);

  // 监听写入流的完成事件
  writestream.on('finish', (file) => {
    // 调用回调函数通知保存成功
    callback(null, { success: true, file: file });
  });

  // 监听写入流的错误事件
  writestream.on('error', (err) => {
    // 调用回调函数通知保存失败
    callback(err);
  });
};
  

// 从数据库中读取 .nii.gz 格式数据
const getData = (filename, type, res) => {
  // 创建 GridFS 存储的读取流
  const readStream = gfs.openDownloadStreamByName(filename);

  // 获取文件类型
  const fileType = type || 'application/octet-stream';

  // 设置响应头
  res.set('Content-Type', fileType);

  // 创建解压流
  const decompress = zlib.createGunzip();

  // 读取流 -> 解压流 -> 响应流
  readStream.pipe(decompress).pipe(res);

  // 监听读取流的错误事件
  readStream.on('error', (err) => {
    console.error(err);
    res.status(500).send('Error reading file');
  });

  // 监听解压流的错误事件
  decompress.on('error', (err) => {
    console.error(err);
    res.status(500).send('Error decompressing file');
  });
};

module.exports = {
  connectMongoDB,
  saveData,
  getData,
};
