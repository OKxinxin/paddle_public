const express = require('express');
const bodyParser = require('body-parser');
const importMongo = require('./MongoDB_connect.js');
const multer = require('multer');

const app = express();

// 设置允许跨域访问
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// 解析请求体的中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 设置文件上传限制
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024} // 100MB
});

app.use(upload.single('file'));


// 连接 MongoDB 数据库
importMongo.connectMongoDB();

app.post('/save-data', (req, res) => {
  const file = req.file;
  const filename = req.body.filename;
  const filetype = req.body.filetype;
  console.log(filetype);
  if (!file) {
    res.status(400).send('No file uploaded');
    return;
  }

  console.log(filename);

    importMongo.saveData(filename, file.path, filetype, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error saving file');
      } else {
        res.send('Data saved successfully!');
      }
    });

});

// 路由：从数据库中读取数据
app.get('/get-data/:filename/:type?', (req, res) => {
    const { filename, type } = req.params;
    importMongo.getData(filename, type, res);
  });
  

// 路由：从数据库中读取上一次保存的数据
app.get('/get-last-nii-gz', (req, res) => {
  importMongo.getLastNiiGz(res);
});

// 启动服务器
app.listen(3001, () => {
  console.log('Server started on port 3001');
});

