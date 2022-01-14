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
            !search || data.name.toLowerCase().includes(search.toLowerCase())
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
          <template v-if="tableData[0].id == ''">
            <el-button size="mini" @click="openEditPrompt(scope.row)"
              >Edit</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              >Delete</el-button
            >
          </template>
          <el-dialog
            title="Add student"
            :visible.sync="addDialogVisible"
            width="30%"
            center
          >
            <el-form
              :label-position="labelPosition"
              label-width="100px"
              :model="addFrom"
            >
              <el-form-item label="Student No">
                <el-input v-model="addFrom.stuno"></el-input>
              </el-form-item>
              <el-form-item label="Name">
                <el-input v-model="addFrom.stuname"></el-input>
              </el-form-item>
              <el-form-item label="Department">
                <el-input v-model="addFrom.studept"></el-input>
              </el-form-item>
              <el-form-item label="Age">
                <el-input v-model="addFrom.stuage"></el-input>
              </el-form-item>
              <el-form-item label="Director">
                <el-input v-model="addFrom.director"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="addDialogVisible = false">Cancel</el-button>
              <el-button
                type="primary"
                @click="handleAddStudent(addFrom.stuname)"
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
              :model="editFrom"
            >
              <el-form-item label="Name">
                <el-input v-model="editFrom.stuname"></el-input>
              </el-form-item>
              <el-form-item label="Department">
                <el-input v-model="editFrom.studept"></el-input>
              </el-form-item>
              <el-form-item label="Age">
                <el-input v-model="editFrom.stuage"></el-input>
              </el-form-item>
              <el-form-item label="Director">
                <el-input v-model="editFrom.director"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="editDialogVisible = false">Cancel</el-button>
              <el-button type="primary" @click="handleEdit(editFrom)"
                >Confirm</el-button
              >
            </span>
          </el-dialog>
        </template>
      </el-table-column>
      <template v-if="tableData[0].stuno == ''">
        <h3>No Data Available  </h3>
      </template>
    </el-table>
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
      editFrom: {
        stuno: "",
        stuname: "",
        studept: "",
        stuage: "",
        director: "",
      },
      addFrom: {
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
      this.editFrom = { ...this.editFrom, ...data };
    },
    handleEdit(data) {
      console.log(data.stuno);
      this.editDialogVisible = false;
      const newData = [...this.tableData, this.editFrom];

      axios
        .post(
          `http://localhost:3002/updateStudent/${data.stuno}`,
          this.editFrom
        )
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
      const newData = [...this.tableData, this.addFrom];
      console.log("new data", newData);
      axios
        .post("http://localhost:3002/addStudent", this.addFrom)
        .then((res) => {
          this.tableData = newData;
          this.addDialogVisible = false;
          this.$message({
            message: `${this.addFrom.stuname} is added successfully`,
            type: "success",
          });
        });
    },
    handleDelete(data) {
      axios
        .delete(`http://localhost:3002/DeleteStudent/${data.stuno}`)
        .then((res) => {
          this.tableData = res.data;
          this.addDialogVisible = false;
          this.$message({
            message: `${data.stuname} is deleted successfully`,
            type: "warning",
          });
        });
    },

    loadData() {
      axios
        .get("http://localhost:3002/allStudents")
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
