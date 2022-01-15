<template>
  <el-row style="width: 80%; margin: auto">
    <h3>All students</h3>
    <el-button
      style="float: right"
      @click="addDialogVisible = true"
      type="success"
      plain
      >+ Add Student</el-button
    >
    <el-table
      :data="
        tableData.filter(
          (data) =>
            !search || data.stuname.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <el-table-column label="Student No" prop="stuno"> </el-table-column>
      <el-table-column label="Name" prop="stuname"> </el-table-column>
      <el-table-column label="Department" prop="studept"> </el-table-column>
      <el-table-column label="Age" prop="stuage"> </el-table-column>
      <el-table-column label="Director" prop="director"> </el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            scope
            size="mini"
            placeholder="Type to search"
          />
        </template>
        <template slot-scope="scope">
          <div v-if="tableData[0].stuno != ''">
            <el-button size="mini" @click="openEditPrompt(scope.row)"
              >Edit</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              >Delete</el-button
            >
          </div>
          <el-dialog
            title="Add student"
            :visible.sync="addDialogVisible"
            width="30%"
            center
          >
            <el-form
              :label-position="labelPosition"
              label-width="100px"
              ref="addForm"
              :model="addForm"
            >
              <el-form-item label="Student No">
                <el-input v-model="addForm.stuno"></el-input>
              </el-form-item>
              <el-form-item label="Name">
                <el-input v-model="addForm.stuname"></el-input>
              </el-form-item>
              <el-form-item label="Department">
                <el-input v-model="addForm.studept"></el-input>
              </el-form-item>
              <el-form-item label="Age">
                <el-input v-model="addForm.stuage"></el-input>
              </el-form-item>
              <el-form-item label="Director">
                <el-input v-model="addForm.director"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="addDialogVisible = false">Cancel</el-button>
              <el-button
                type="primary"
                @click="handleAddStudent(addForm.stuname)"
                >Confirm</el-button
              >
            </span>
          </el-dialog>
          <el-dialog
            title="Editing Student"
            :visible.sync="editDialogVisible"
            width="30%"
            center
          >
            <el-form
              :label-position="labelPosition"
              label-width="100px"
              :model="editForm"
            >
              <el-form-item label="Name">
                <el-input v-model="editForm.stuname"></el-input>
              </el-form-item>
              <el-form-item label="Department">
                <el-input v-model="editForm.studept"></el-input>
              </el-form-item>
              <el-form-item label="Age">
                <el-input v-model="editForm.stuage"></el-input>
              </el-form-item>
              <el-form-item label="Director">
                <el-input v-model="editForm.director"></el-input>
              </el-form-item>
            </el-form> 
            <span slot="footer" class="dialog-footer">
              <el-button @click="editDialogVisible = false">Cancel</el-button>
              <el-button type="primary" @click="handleEdit(editForm)"
                >Confirm</el-button
              >
            </span>
          </el-dialog>
        </template>
      </el-table-column>
     
    </el-table>
     <template v-if="tableData[0].stuno == ''">
        <h3>No Data Available</h3>
      </template>
  </el-row>
</template>

<script>
import axios from "axios";

export default {
  name: "AllStudents",
  data() {
    return {
      tableData: [],
      search: "",
      addDialogVisible: false,
      editDialogVisible: false,
      labelPosition: "left",
      editForm: {
        stuno: "",
        stuname: "",
        studept: "",
        stuage: "",
        director: "",
      },
      addForm: {
        stuno: "",
        stuname: "",
        studept: "",
        stuage: "",
        director: "",
      },
    };
  },
  methods: {
    openEditPrompt(data) {
      this.editDialogVisible = true;
      this.editForm = { ...this.editForm, ...data };
    },
    handleEdit(data) {
      console.log(data.stuno);
      this.editDialogVisible = false;
      const newData = [...this.tableData, this.editForm];

      axios
        .put(`http://localhost:3000/editStudent/${data.stuno}`, this.editForm)
        .then((res) => {
          this.tableData = res.data;
          this.addDialogVisible = false;
          this.$message({
            message: `${data.stuname} is updated successfully`,
            type: "success",
          });
        });
    },
    handleAddStudent(name) {
      const newData =
        this.tableData[0].stuno == ""
          ? [this.addForm]
          : [...this.tableData, this.addForm];
      console.log("new data", newData);
      axios
        .post("http://localhost:3000/addStudent", this.addForm)
        .then((res) => {
          this.tableData = newData;
          this.addDialogVisible = false;
          this.$message({
            message: `${this.addForm.stuname} is added successfully`,
            type: "success",
          });
          this.addForm = {}

        });
    },
    handleDelete(data) {
      axios
        .delete(`http://localhost:3000/removeStudent/${data.stuno}`)
        .then((res) => {
          console.log(res.data);
          if (res.data.length) {
            console.log(res.data);
            this.tableData = res.data;
          } else {
            this.tableData = [
              {
                stuno: "",
                stuname: "",
                studept: "",
                stuage: "",
                director: "",
              },
            ];
          }
          // this.tableData = res.data;
          this.addDialogVisible = false;
          this.$message({
            message: `${data.stuname} is deleted successfully`,
            type: "warning",
          });
        });
    },

    loadData() {
      axios
        .get("http://localhost:3000/allStudents")
        .then((res) => {
          if (res.data.length) {
            console.log(res.data);
            this.tableData = res.data;
          } else {
            this.tableData = [
              {
                stuno: "",
                stuname: "",
                studept: "",
                stuage: "",
                director: "",
              },
            ];
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.loadData();
  },
};
</script>

<style></style>
