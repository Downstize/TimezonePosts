import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "Blog": "Blog",
      "Create New Blog Post": "Create New Blog Post",
      "Posts": "Posts",
      "Archived Posts": "Archived Posts",
      "Edit": "Edit",
      "Delete": "Delete",
      "Move to Archive": "Move to Archive",
      "Publish": "Publish",
      "Are you sure you want to delete this post?": "Are you sure you want to delete this post?",
      "Update Post": "Update Post",
      "Create Post": "Create Post",
      "Edit Post": "Edit Post",
      "Title": "Title",
      "Author": "Author",
      "Category": "Category",
      "Content": "Content",
      "Change to English": "Change to English",
      "Change to Russian": "Change to Russian",
      "No data": "No data",
      "Delete ADV": "Are u sure, that u want delete this post?",
      "Time in": "Time in",
      "Timezone": "Timezone",
      "Published at": "Published at",
    }
  },
  ru: {
    translation: {
      "Blog": "Блог",
      "Create New Blog Post": "Создать новый пост в блоге",
      "Posts": "Посты",
      "Archived Posts": "Архивные посты",
      "Edit": "Редактировать",
      "Delete": "Удалить",
      "Move to Archive": "Переместить в архив",
      "Publish": "Опубликовать",
      "Are you sure you want to delete this post?": "Вы уверены, что хотите удалить этот пост?",
      "Update Post": "Обновить пост",
      "Create Post": "Создать пост",
      "Edit Post": "Редактирование поста",
      "Title": "Заголовок",
      "Author": "Автор",
      "Category": "Категория",
      "Content": "Содержание",
      "Change to English": "Изменить на английский",
      "Change to Russian": "Изменить на русский",
      "No data": "Нет данных",
      "Delete ADV": "Вы уверены, что хотите удалить этот пост?",
      "Time in": "Время в",
      "Timezone": "Часовой пояс",
      "Published at": "Опубликовано в",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;