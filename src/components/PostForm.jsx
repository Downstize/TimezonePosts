import React from 'react';
import { Form, Input, Button } from 'antd';
import { useTranslation } from 'react-i18next';

export default function PostForm({ title, setTitle, author, setAuthor, category, setCategory, content, setContent, handleSubmit, editingIndex }) {
  const { t } = useTranslation();
  return (
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
  );
}