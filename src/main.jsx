import {
  Card,
  Form,
  Input,
  Button,
  Typography,
  List,
  Popconfirm,
  Select,
} from "antd";
import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import store from "../src/store/store.js";

const { Title, Text } = Typography;

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
  const { Option } = Select;

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
    fetch(`http://worldtimeapi.org/api/timezone/${area}`)
      .then((response) => response.json())
      .then((data) => {
        if (!data || typeof data.datetime !== "string") {
          console.error("Invalid response from API");
          return;
        }
        const timeString = data.datetime.slice(11, 19); // Extract time from datetime string
        setTime(timeString);
      })
      .catch((error) => console.error("There was an error!", error));
  };

  const handleTimezoneChange = (value) => {
    setTimezone(value);
    fetchTime(value);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prevTime) => {
        const momentTime = moment(prevTime, "HH:mm:ss").add(1, "seconds");
        return momentTime.format("HH:mm:ss");
      });
    }, 1000);

    return () => clearInterval(intervalId); // This clears the interval when the component unmounts
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchTime(timezone);
    }, 60000); // Fetch time from API every minute

    return () => clearInterval(intervalId);
  }, [timezone]);

  useEffect(() => {
    fetchTime(timezone);
  }, [timezone]);

  return (
    <div style={{ padding: "20px" }}>
      <Button onClick={changeLanguage}>
        {language === "en" ? t("Change to Russian") : t("Change to English")}
      </Button>
      <Title level={1}>{t("Blog")}</Title>
      <Title level={3}>
        {t("Time in")} {timezone}: {time}
      </Title>
      <Select
        defaultValue={timezone}
        style={{ width: 200 }}
        onChange={handleTimezoneChange}
      >
        <Option value="Europe/London">London</Option>
        <Option value="Europe/Moscow">Moscow</Option>
        <Option value="America/New_York">New York</Option>
        <Option value="Asia/Tokyo">Tokyo</Option>
      </Select>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ flex: 1, marginRight: "20px" }}>
          <Title level={3}>
            {editingIndex !== null ? t("Edit Post") : t("Create New Blog Post")}
          </Title>
          <Form onFinish={handleSubmit}>
            <Form.Item>
              <Input
                placeholder={t("Title")}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Item>
            <Form.Item>
              <Input
                placeholder={t("Author")}
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
              />
            </Form.Item>
            <Form.Item>
              <Input
                placeholder={t("Category")}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </Form.Item>
            <Form.Item>
              <Input.TextArea
                placeholder={t("Content")}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {editingIndex !== null ? t("Update Post") : t("Create Post")}
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div style={{ flex: 1, marginRight: "20px" }}>
          <Title level={3}>{t("Posts")}</Title>
          <List
            itemLayout="vertical"
            dataSource={posts}
            renderItem={(post, index) => (
              <List.Item key={index}>
                <Card
                  title={post.title}
                  extra={<Text type="secondary">{post.category}</Text>}
                  style={{ maxWidth: "100%", overflowWrap: "break-word" }}
                >
                  <Text>{post.content}</Text>
                  <br />
                  <Text type="secondary">{post.author}</Text>
                  <br />
                  <Text type="secondary">{`${t("Timezone")}: ${
                    post.timezone
                  }`}</Text>
                  <br />
                  <Text type="secondary">{`${t("Published at")}: ${
                    post.publishedAt
                  }`}</Text>
                  <div style={{ marginTop: "10px" }}>
                    <Button
                      style={{ marginRight: "10px" }}
                      onClick={() => handleEdit(index)}
                    >
                      {t("Edit")}
                    </Button>
                    <Popconfirm
                      title={t("Delete ADV")}
                      onConfirm={() => handleDelete(index)}
                    >
                      <Button style={{ marginRight: "10px" }}>
                        {t("Delete")}
                      </Button>
                    </Popconfirm>
                    <Button onClick={() => handleArchive(index)}>
                      {t("Move to Archive")}
                    </Button>
                  </div>
                </Card>
              </List.Item>
            )}
          />
        </div>
        <div style={{ flex: 1 }}>
          <Title level={3}>{t("Archived Posts")}</Title>
          <List
            itemLayout="vertical"
            dataSource={archivedPosts}
            renderItem={(post, index) => (
              <List.Item key={index}>
                <Card
                  title={post.title}
                  extra={<Text type="secondary">{post.category}</Text>}
                  style={{ maxWidth: "100%", overflowWrap: "break-word" }}
                >
                  <Text>{post.content}</Text>
                  <br />
                  <Text type="secondary">{post.author}</Text>
                  <br />
                  <Text type="secondary">{`Timezone: ${post.timezone}`}</Text>
                  <br />
                  <Text type="secondary">{`Published at: ${post.publishedAt}`}</Text>
                  <div style={{ marginTop: "10px" }}>
                    <Button
                      style={{ marginRight: "10px" }}
                      onClick={() => handleEditArchived(index)}
                    >
                      {t("Edit")}
                    </Button>
                    <Popconfirm
                      title={t("Delete ADV")}
                      onConfirm={() => handleDelete(index)}
                    >
                      <Button style={{ marginRight: "10px" }}>
                        {t("Delete")}
                      </Button>
                    </Popconfirm>
                    <Button onClick={() => publishFromArchive(index)}>
                      {t("Publish")}
                    </Button>
                  </div>
                </Card>
              </List.Item>
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default CreateBlogPost;
