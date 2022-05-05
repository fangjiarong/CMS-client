<template>
  <div>
    <el-button type="primary" style="margin-bottom: 20px" @click="addBookInfo"
      >添加书籍</el-button
    >
    <el-table :data="booksList" border style="width: 100%">
      <el-table-column
        prop="date"
        label="序号"
        width="80"
        type="index"
        align="center"
      >
      </el-table-column>
      <el-table-column label="封面" width="width">
        <template slot-scope="{ row, $index }">
          <img :src="row.img" alt="" class="pic" />
        </template>
      </el-table-column>
      <el-table-column prop="title" label="姓名" width="width">
      </el-table-column>
      <el-table-column prop="name" label="详情" width="width">
        <template slot-scope="{ row, $index }">
          <el-button type="info" size="mini"> 查看章 </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作" width="200">
        <template slot-scope="{ row, $index }">
          <el-button type="success" size="mini">编辑</el-button>
          <el-button type="danger" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加书籍dialog -->
    <el-dialog title="添加" :visible.sync="dialogFormVisible" width="30%">
      <div>
        <span>上传封面：</span>
        <el-upload
          action="http://127.0.0.1:7001/api/upload"
          list-type="picture-card"
          :file-list="imgList"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          style="margin: 10px 0 30px 0"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </div>
      <el-form style="margin: 10px 0 30px 0">
        <span style="margin: 30px 0">书籍名称</span>
        <el-input
          v-model="title"
          placeholder="请输入书籍名称"
          style="margin: 10px 0 30px 0"
        ></el-input>
        <span style="margin: 10px 0">排序权重</span>
        <el-input
          v-model="orderby"
          placeholder="请输入排序权重"
          style="margin: 10px 0 30px 0"
        ></el-input>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="deleteSubmit">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Book",
  data() {
    return {
        imgList:[],
      booksList: [],
      dialogFormVisible: false,
      dialogImageUrl: "",
      dialogVisible: false,
      isEdit:false,
      //   新书需要收集的内容
       img:'',
        title: "",
        orderby: "",
        updateId:0
    };
  },
  mounted() {
    this.getBooksList();
  },
  methods: {
    //   获取所有数据的列表
    async getBooksList() {
      let result = await this.$API.book.reqBooksList();
    //   console.log(result);
      if (result.code == 20000) {
        this.booksList = result.data;
      }
    },
    // 添加书籍按钮触发的事件
    addBookInfo() {
      // 在收集之前需要清空仓库的数据
      this.title = "",
      this.imgList = []
        this.orderby = "",
        this.dialogFormVisible = true;
        this.isEdit = false;
    },
    // dalog页面保存按钮触发事件
    async save() {
      // 收集用户输入的内容然后发送给远程服务器保存
      let result = await this.$API.book.reqSaveBookOrUpdateBook(this.isEdit,this.title,this.orderby,this.img,this.updateId);
      console.log(result);
      this.dialogFormVisible = false;
    },
    deleteSubmit() {
      this.dialogFormVisible = false;
    },
    // 图片上传成功的钩子
    handleSuccess(response, file, fileList){
         this.img = response.data.file;
    },
    
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.pic {
  width: 50px;
  height: 50px;
}
</style>
