import React, { useState } from "react";
import { Card, Form, Input, Button, Typography, List, Popconfirm } from "antd";
import { useTranslation } from 'react-i18next';

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
  const [language, setLanguage] = useState('en');

  const changeLanguage = () => {
    const newLanguage = language === 'en' ? 'ru' : 'en';
    i18n.changeLanguage(newLanguage);
    setLanguage(newLanguage);
  };

  const handleSubmit = () => {
    if (editingIndex !== null) {
      const newPosts = [...posts];
      newPosts[editingIndex] = { title, author, category, content };
      setPosts(newPosts);
      setEditingIndex(null);
    } else {
      setPosts([
        ...posts,
        {
          title,
          author,
          category,
          content,
        },
      ]);
    }

    setTitle("");
    setAuthor("");
    setCategory("");
    setContent("");
  };

  const handleDelete = (index) => {
    const newPosts = [...posts];
    newPosts.splice(index, 1);
    setPosts(newPosts);
  };

  const handleArchive = (index) => {
    const newPosts = [...posts];
    const post = newPosts.splice(index, 1)[0];
    setPosts(newPosts);
    setArchivedPosts([...archivedPosts, post]);
  };

  const publishFromArchive = (index) => {
    const newArchivedPosts = [...archivedPosts];
    const post = newArchivedPosts.splice(index, 1)[0];
    setArchivedPosts(newArchivedPosts);
    setPosts([...posts, post]);
  };

  const handleEdit = (index) => {
    const post = posts[index];
    setTitle(post.title);
    setAuthor(post.author);
    setCategory(post.category);
    setContent(post.content);
    setEditingIndex(index);
  };

  const handleEditArchived = (index) => {
    const post = archivedPosts[index];
    setTitle(post.title);
    setAuthor(post.author);
    setCategory(post.category);
    setContent(post.content);
    setEditingIndex(index);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Button onClick={changeLanguage}>
        {language === 'en' ? t('Change to Russian') : t('Change to English')}
      </Button>
      <Title level={1}>{t('Blog')}</Title>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ flex: 1, marginRight: "20px" }}>
        <Title level={3}>{editingIndex !== null ? t('Edit Post') : t('Create New Blog Post')}</Title>
          <Form onFinish={handleSubmit}>
            <Form.Item>
              <Input
                placeholder={t('Title')}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Item>
            <Form.Item>
              <Input
                placeholder={t('Author')}
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
              />
            </Form.Item>
            <Form.Item>
              <Input
                placeholder={t('Category')}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </Form.Item>
            <Form.Item>
              <Input.TextArea
                placeholder={t('Content')}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {editingIndex !== null ? t('Update Post') : t('Create Post')}
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div style={{ flex: 1, marginRight: "20px" }}>
          <Title level={3}>{t('Posts')}</Title>
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
                  <div style={{ marginTop: "10px" }}>
                    <Button
                      style={{ marginRight: "10px" }}
                      onClick={() => handleEdit(index)}
                    >
                      {t('Edit')}
                    </Button>
                    <Popconfirm
                      title={t('Delete ADV')}
                      onConfirm={() => handleDelete(index)}
                    >
                      <Button style={{ marginRight: "10px" }}>{t('Delete')}</Button>
                    </Popconfirm>
                    <Button onClick={() => handleArchive(index)}>
                    {t('Move to Archive')}
                    </Button>
                  </div>
                </Card>
              </List.Item>
            )}
          />
        </div>
        <div style={{ flex: 1 }}>
          <Title level={3}>{t('Archived Posts')}</Title>
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
                  <div style={{ marginTop: "10px" }}>
                    <Button
                      style={{ marginRight: "10px" }}
                      onClick={() => handleEditArchived(index)}
                    >
                      Редактировать
                    </Button>
                    <Popconfirm
                      title={t('Delete ADV')}
                      onConfirm={() => handleDelete(index)}
                    >
                      <Button style={{ marginRight: "10px" }}>{t('Delete')}</Button>
                    </Popconfirm>
                    <Button onClick={() => publishFromArchive(index)}>
                    {t('Publish')}
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