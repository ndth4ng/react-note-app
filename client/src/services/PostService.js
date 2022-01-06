import { apiUrl } from "../contexts/constants";
import axios from "axios";

export default class PostService {
  static myInstance = null;

  // Target post to update or delete
  post = null;
  // List post
  posts = [];

  static getInstance() {
    if (PostService.myInstance == null) {
      PostService.myInstance = new PostService();
    }
    return this.myInstance;
  }

  getPosts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/posts`);
      if (response.data.success) {
        this.posts = response.data.posts;
        return this.posts;
      }
    } catch (error) {
      return this.posts;
    }
  };

  addPost = async (newPost) => {
    try {
      const response = await axios.post(`${apiUrl}/posts`, newPost);
      if (response.data.success) {
        this.posts.push(response.data.post);
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  deletePost = async (postId) => {
    try {
      const response = await axios.delete(`${apiUrl}/posts/${postId}`);
      if (response.data.success) {
        this.posts = this.posts.filter((post) => post._id !== postId);
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  updatePost = async (updatedPost) => {
    try {
      const response = await axios.put(
        `${apiUrl}/posts/${updatedPost._id}`,
        updatedPost
      );
      if (response.data.success) return response.data;
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  setPost = (postId) => {
    const post = this.posts.find((post) => post._id === postId);
    this.post = post;
  };

  getPost() {
    return this.post;
  }
}
