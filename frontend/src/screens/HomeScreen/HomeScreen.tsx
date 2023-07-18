import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "./HomeScreen.module.css";

const HomeScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = async (e?) => {
    if (e) {
      e.preventDefault();
    }

    const res = await fetch(
      "http://localhost:3001/blogposts" +
        (searchTerm ? `/search?keywords=${searchTerm}` : "")
    );

    const blogPosts = await res.json();
    setBlogPosts(blogPosts);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Blog Posts</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <h1>Blog Posts</h1>
        <form className={styles.searchForm} onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </header>

      <main className={styles.main}>
        <ul className={styles.blogList}>
          {blogPosts.map((post) => (
            <li key={post._id} className={styles.blogItem}>
              <div>
                <h2>{post.title}</h2>
                <p>{post.text}</p>
                <span>Author: {post.author}</span>
                <br />
                <span>Date: {post.date}</span>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default HomeScreen;
