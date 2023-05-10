<template>
  <div class="file-upload">
    <div class="drop-zone" @dragover.prevent @drop="handleDrop" @click="handleClick">
      <p>将.nii.gz格式文件拖放到此处或单击以选择文件</p>
      <input type="file" ref="fileInput" @change="handleFileInput" accept=".nii.gz" style="display: block; width: 0; height: 0; opacity: 0;"/>
    </div>

    <div class="progress-bar">
      <div class="progress" :style="{ width: progress + '%' }"></div>
    </div>

    <button class="StartPredict">
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>开始预测！
    </button>

  </div>
</template>

<script>
import axios from 'axios'; // import axios

export default {
  name:'FileImport',
  data() {
    return {
      progress: 0,
      file: null
    }
  },
  methods: {
    handleDrop(event) {
      event.preventDefault();
      const files = event.dataTransfer.files;
      // 处理拖放的文件
      this.handleFile(files);
    },
    handleFileInput(event) {
      const files = event.target.files;
      // 处理所选文件
      this.handleFile(files);
    },
    handleClick() {
      this.$refs.fileInput.click();
      console.log('点击事件已触发'); // added to check if the click event is triggered
    },
    handleFile(files) {
      if (files[0]) { // check if files[0] exists
        const allowedTypes = ['nii', 'nii.gz', 'gz'];
        const fileType = files[0].name.split('.').pop();
        if (allowedTypes.includes(fileType)) { // check if the file type is allowed
          this.file = files[0];
          console.log('Selected file:', this.file.name);
          this.uploadFile();
        } else {
          alert('文件类型不允许，请上传 nii、nii.gz 或 gz 格式的文件');
        }
      } else {
        console.log("出错了")
      }
    },
    uploadFile() {
      if (this.file) {
        const formData = new FormData();
        formData.append('filename', this.file.name);
        formData.append('file', this.file);
        formData.append('filetype', 'original');

        console.log('FormData object:', formData.get('filename'));

        //通过axios发送ajax请求到后端数据库，保存文件
        axios.post('http://localhost:3001/save-data', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: progressEvent => {
            this.progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          },
        })
          .then(res => {
            console.log(res.data);
            alert('文件已成功上传');
          })
          .catch(err => {
            console.error(err);
            alert('上传失败，请重试');
          });
      } else {
        alert('请先选择要上传的文件');
      }
    }
  }
};
</script>

<style scoped>
@import './FileImport.css';

</style>