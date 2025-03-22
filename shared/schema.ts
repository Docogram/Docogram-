 import {
   pgTable,
   text,
   serial,
   integer,
   boolean,
   timestamp,
   varchar,
   jsonb,
 }from "drizzle-orm/pg-core";
 import { createInsertSchema } from "drizzle-zod";
 import { z } from "zod";
// Users
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  displayName: text("display_name").notNull(),
  email: text("email").notNull().unique(),
  avatar: text("avatar"),
  bio: text("bio"),
  followers: 
integer("followers").default(0).notNull(),
  following: integer("following").default(0).notNull(),
  isAdmin: boolean("is_admin").default(false).notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  followers: true,
  following: true,
  isAdmin: true,
});

// Documents
export const documents = pgTable("documents", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  authorId: integer("author_id").notNull(),
  fileUrl: 
text("file_url").notNull(),
  thumbnailUrl: text("thumbnail_url"),
  fileType: text("file_type").notNull(), // PDF, DOCX, TXT, etc.
  pageCount: integer("page_count"),
  categoryId: integer("category_id"),
  tags: text("tags").array(),
  viewCount: integer("view_count").default(0).notNull(),
  likeCount: integer("like_count").default(0).notNull(),
  commentCount: integer("comment_count").default(0).notNull(),
  isPrivate: boolean("is_private").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt:
timestamp("updated_at").defaultNow().notNull(),
});

export const insertDocumentSchema = createInsertSchema(documents).omit({
  id: true,
  viewCount: true,
  likeCount: true,
  commentCount: true,
  createdAt: true,
  updatedAt: true,
});

// Categories
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  icon: text("icon").notNull(),
});

export const insertCategorySchema = createInsertSchema(categories).omit({
  id: true,
});

// Comments
export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  documentId: integer("document_id").notNull(),
  authorId: integer("author_id").notNull(),
  content: text("content").notNull(),
  parentId: integer("parent_id"), // For replies
  likes: integer("likes").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertCommentSchema = createInsertSchema(comments).omit({
  id: true,
  likes: true,
  createdAt: true,
});

// Likes
export const likes = pgTable("likes", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  documentId: integer("document_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertLikeSchema = createInsertSchema(likes).omit({
  id: true,
  createdAt: true,
});

// Bookmarks
export const bookmarks = pgTable("bookmarks", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  documentId: integer("document_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertBookmarkSchema = createInsertSchema(bookmarks).omit({
  id: true,
  createdAt: true,
});

// Collections
export const collections = pgTable("collections", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  userId: 
integer("user_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertCollectionSchema = createInsertSchema(collections).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Collection Documents
export const collectionDocuments = pgTable("collection_documents", {
  id: serial("id").primaryKey(),
  collectionId: integer("collection_id").notNull(),
  documentId: integer("document_id").notNull(),
  addedAt: timestamp("added_at").defaultNow().notNull(),
});

export const insertCollectionDocumentSchema = createInsertSchema(
  collectionDocuments,
).omit({
  id: true,
  addedAt: true,
});

// Follows
export const follows = pgTable("follows", {
  id: serial("id").primaryKey(),
  followerId: integer("follower_id").notNull(),
  followingId: integer("following_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
export const insertFollowSchema = createInsertSchema(follows).omit({
  id: true,
  createdAt: true,
});

// Type exports
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Document = typeof documents.$inferSelect;
export type InsertDocument = z.infer<typeof insertDocumentSchema>;

export type Category = typeof categories.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Comment = typeof comments.$inferSelect;
export type InsertComment = z.infer<typeof insertCommentSchema>;

export type Like = typeof likes.$inferSelect;
export type InsertLike = z.infer<typeof insertLikeSchema>;

export type Bookmark = typeof bookmarks.$inferSelect;
export type InsertBookmark = z.infer<typeof insertBookmarkSchema>;

export type Collection = typeof collections.$inferSelect;
export type InsertCollection = z.infer<typeof insertCollectionSchema>;

export type CollectionDocument = typeof collectionDocuments.$inferSelect;
export type InsertCollectionDocument = z.infer<
  typeof insertCollectionDocumentSchema
>;

export type Follow = typeof follows.$inferSelect;
export type InsertFollow = z.infer<typeof insertFollowSchema>;
