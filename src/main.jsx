import { Typography } from "antd";
import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import store from "../src/store/store.js";
import PostForm from "../src/components/PostForm.jsx";
import PostList from "../src/components/PostList.jsx";
import ArchivedPostList from "../src/components/ArchivedPostList.jsx";
import { TimezoneSelect } from "../src/components/TimezoneSelect.jsx";
import { LanguageButton } from "../src/components/LanguageButton.jsx";
import Kefir from 'kefir';

const { Title } = Typography;

function CreateBlogPost() {
  const { t, i18n } = useTranslation();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [archivedPosts, setArchivedPosts] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [language, setLanguage] = useState("en");
  const [time, setTime] = useState("");
  const [timezone, setTimezone] = useState("Europe/London");

  const changeLanguage = () => {
    const newLanguage = language === "en" ? "ru" : "en";
    i18n.changeLanguage(newLanguage);
    setLanguage(newLanguage);
  };

  const handleSubmit = () => {
    const publishedAt = moment().tz(timezone).format("YYYY-MM-DD HH:mm:ss");
    if (editingIndex !== null) {
      const newPosts = [...posts];
      newPosts[editingIndex] = {
        title,
        author,
        category,
        content,
        timezone,
        publishedAt,
      };
      setPosts(newPosts);
      setEditingIndex(null);
    } else {
      const newPost = {
        title,
        author,
        category,
        content,
        timezone,
        publishedAt,
      };
      setPosts([...posts, newPost]);

      store.dispatch({ type: "ADD_POST", payload: newPost });
    }

    setTitle("");
    setAuthor("");
    setCategory("");
    setContent("");
  };

  const handleDelete = (index) => {
    const newPosts = [...posts];
    const post = newPosts.splice(index, 1)[0];
    setPosts(newPosts);
    store.dispatch({ type: "DELETE_ARTICLE", payload: post });
  };

  const handleArchive = (index) => {
    const newPosts = [...posts];
    const post = newPosts.splice(index, 1)[0];
    setPosts(newPosts);
    setArchivedPosts([...archivedPosts, post]);
    store.dispatch({ type: "ADD_ARCHIVE", payload: post });
  };

  const publishFromArchive = (index) => {
    const newArchivedPosts = [...archivedPosts];
    const post = newArchivedPosts.splice(index, 1)[0];
    setArchivedPosts(newArchivedPosts);
    setPosts([...posts, post]);
    store.dispatch({ type: "PUBLISH_FROM_ARCHIVE", payload: post });
  };

  const handleEdit = (index) => {
    const post = posts[index];
    setTitle(post.title);
    setAuthor(post.author);
    setCategory(post.category);
    setContent(post.content);
    setEditingIndex(index);
    store.dispatch({ type: "EDIT_POST", payload: { index, post } });
  };

  const handleEditArchived = (index) => {
    const post = archivedPosts[index];
    setTitle(post.title);
    setAuthor(post.author);
    setCategory(post.category);
    setContent(post.content);
    setEditingIndex(index);
    store.dispatch({ type: "EDIT_ARCHIVED_POST", payload: { index, post } });
  };



  const fetchTime = (area) => {
    Kefir.fromPromise(fetch(`http://worldtimeapi.org/api/timezone/${area}`)
      .then((response) => response.json()))
      .onValue((data) => {
        if (!data || typeof data.datetime !== "string") {
          console.error("Invalid response from API");
          return;
        }
        const timeString = data.datetime.slice(11, 19);
        setTime(timeString);
      })
      .onError((error) => console.error("There was an error!", error));
  };

  const handleTimezoneChange = (value) => {
    setTimezone(value);
    Kefir.fromEvents(document, 'change')
      .debounce(1000)
      .onValue(() => fetchTime(value));
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prevTime) => {
        const momentTime = moment(prevTime, "HH:mm:ss").add(1, "seconds");
        return momentTime.format("HH:mm:ss");
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchTime(timezone);
    }, 60000);

    return () => clearInterval(intervalId);
  }, [timezone]);

  useEffect(() => {
    fetchTime(timezone);
  }, [timezone]);

  return (
    <div style={{ padding: "20px" }}>
      <LanguageButton
        currentLanguage={language}
        changeLanguage={changeLanguage}
      />
      <Title level={1}>{t("Blog")}</Title>
      <Title level={3}>
        {t("Time in")} {timezone}: {time}
      </Title>
      <TimezoneSelect
        defaultValue={timezone}
        handleTimezoneChange={handleTimezoneChange}
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ flex: 1, marginRight: "20px" }}>
          <Title level={3}>
            {editingIndex !== null ? t("Edit Post") : t("Create New Blog Post")}
          </Title>
          <PostForm
            title={title}
            setTitle={setTitle}
            author={author}
            setAuthor={setAuthor}
            category={category}
            setCategory={setCategory}
            content={content}
            setContent={setContent}
            handleSubmit={handleSubmit}
            editingIndex={editingIndex}
          />
        </div>
        <div style={{ flex: 1, marginRight: "20px" }}>
          <Title level={3}>{t("Posts")}</Title>
          <PostList
            posts={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleArchive={handleArchive}
          />
        </div>
        <div style={{ flex: 1 }}>
          <Title level={3}>{t("Archived Posts")}</Title>
          <ArchivedPostList
            archivedPosts={archivedPosts}
            handleEditArchived={handleEditArchived}
            handleDelete={handleDelete}
            publishFromArchive={publishFromArchive}
          />
        </div>
      </div>
    </div>
  );
}

export default CreateBlogPost;
