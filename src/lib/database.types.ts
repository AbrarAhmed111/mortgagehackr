// types/blog.ts

export type BlogContentBlock = {
  image?: string;       // Optional image URL
  description?: string; // Optional description text
};

export type Blog = {
  id: string;                     // UUID
  title: string;                  // Blog title
  slug: string;                   // Unique slug for routing
  content: BlogContentBlock[];   // Array of content blocks
  profile_image?: string | null; // Author or profile image URL
  created_at: string;            // ISO timestamp
};
