import React from 'react';
import { List, Card, Button, Popconfirm, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

export default function ArchivedPostList({ archivedPosts, handleEditArchived, handleDelete, publishFromArchive }) {
  const { t } = useTranslation();
  const { Text } = Typography;
  return (
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
  );
}