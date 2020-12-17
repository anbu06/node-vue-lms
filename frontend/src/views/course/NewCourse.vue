<template lang="pug">
  div
    a-row(type="flex" justify="space-between")
      a-col(:span="16")
        a-form(:form="form" @submit="create" enctype="multipart/form-data")
          h1 Create a course
          a-form-item(label="Course Title")
            a-input(placeholder="Title of your new masterpiece" v-decorator="validationRules.title")
          a-form-item(label="Course Description")
            a-textarea(placeholder="Description for your new masterpiece" v-decorator="validationRules.description")
          a-form-item(label="Course Thumbnail")
            a-upload(:before-upload="() => false" v-decorator="validationRules.thumbnail" @change="handleChange" list-type="picture")
              a-button
                a-icon(type="upload")
                span Select File
          a-form-item
            a-button(html-type="submit" :loading="loading" icon="plus") Create
      a-col(:span="6")
        a-card(hoverable style="width: 300px")
          img(
            slot="cover"
            alt="Course Thumbnail"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png")

          a-card-meta(:title="form.getFieldValue('title')" :description="form.getFieldValue('description')")
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "new-course",
  data() {
    return {
      loading: false,
      validationRules: {
        title: [
          "title",
          {
            rules: [
              {
                required: true,
                message: "Course title is required.\n"
              },
              {
                min: 3,
                message:
                  "Course title should have a minimum length of 3 characters.\n"
              },
              {
                max: 200,
                message:
                  "Course title should have a maximum length of 200 characters.\n"
              }
            ]
          }
        ],
        description: [
          "description",
          {
            rules: [
              {
                required: true,
                message: "Description is required."
              },
              {
                min: 3,
                message:
                  "Course description should have a minimum length of 3 characters.\n"
              }
            ]
          }
        ],
        thumbnail: [
          "thumbnail",
          {
            getValueFromEvent: this.handleChange
          }
        ]
      },
      backendError: null
    };
  },
  methods: {
    ...mapActions("course", ["createCourse"]),
    create(e) {
      e.preventDefault();
      this.backendError = null;

      this.form.validateFieldsAndScroll(async (err, values) => {
        if (err) return;

        const formData = new FormData();

        for (let k in values) {
          formData.append(k, values[k]);
        }

        try {
          await this.createCourse(formData);
        } catch (e) {
          this.backendError = e.response.data;
        }
      });
    },
    onValuesChange() {
      this.backendError = null;
    },
    handleChange(info) {
      let fileList = [...info.fileList];
      fileList = fileList.slice(-1);
      return fileList[0].originFileObj;
    }
  },
  beforeCreate() {
    const component = this;
    this.form = this.$form.createForm(this, {
      name: "createCourse",
      onValuesChange() {
        component.backendError = null;
      }
    });
  }
};
</script>

<style lang="scss"></style>
