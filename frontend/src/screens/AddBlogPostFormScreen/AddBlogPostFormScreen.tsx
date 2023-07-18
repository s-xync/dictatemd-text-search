import React, { useState } from "react";
import styles from "./AddBlogPostFormScreen.module.css";
import { useRouter } from "next/router";

const AddBlogPostForm = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/blogposts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, text, author }),
      });

      if (response.ok) {
        console.log("Blog post added successfully");
        router.push("/");
      } else {
        console.error("Failed to add blog post");
      }
    } catch (error) {
      console.error("Failed to add blog post", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.addBlogPostForm}>
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="title">
          Title:
        </label>
        <input
          className={styles.input}
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="text">
          Text:
        </label>
        <textarea
          className={styles.textarea}
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        ></textarea>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="author">
          Author:
        </label>
        <input
          className={styles.input}
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>
      <button type="submit" className={styles.submitBtn}>
        Submit
      </button>
    </form>
  );
};

export default AddBlogPostForm;
