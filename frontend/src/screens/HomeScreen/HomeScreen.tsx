import { useEffect, useState } from "react";
import Head from "next/head";
import styles from "./HomeScreen.module.css";
import { useRouter } from "next/router";

const HomeScreen = () => {
  const [searchTermInput, setSearchTermInput] = useState("");
  const [blogPosts, setBlogPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm]);

  const handleSearch = async (keywords) => {
    const res = await fetch(
      "http://localhost:3001/blogposts" +
        (searchTermInput ? `/search?keywords=${keywords}` : "")
    );

    const blogPosts = await res.json();
    setBlogPosts(blogPosts);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    setSearchTerm(searchTermInput);
  };

  const highlightKeywords = (text) => {
    const keywords = searchTerm.split(" ");
    return keywords.reduce((result, keyword) => {
      const regex = new RegExp(keyword, "gi");
      return result.replace(
        regex,
        `<span class="${styles.highlighted}">${keyword}</span>`
      );
    }, text);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Blog Posts</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <h1>Blog Posts</h1>
        <button
          className={styles.button}
          type="button"
          onClick={() => {
            router.push("/add-blog");
          }}
        >
          Add new blog
        </button>
        <br />
        <br />
        <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTermInput}
            onChange={(e) => setSearchTermInput(e.target.value)}
          />
          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
      </header>

      <main className={styles.main}>
        <ul className={styles.blogList}>
          {blogPosts.map((post) => (
            <li key={post._id} className={styles.blogItem}>
              <div>
                <h2
                  dangerouslySetInnerHTML={{
                    __html: highlightKeywords(post.title),
                  }}
                />
                <p
                  dangerouslySetInnerHTML={{
                    __html: highlightKeywords(post.text),
                  }}
                />
                <span>
                  Author:{" "}
                  <span
                    dangerouslySetInnerHTML={{
                      __html: highlightKeywords(post.author),
                    }}
                  />
                </span>
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
