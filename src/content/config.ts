import { defineCollection, z } from "astro:content";

const tilesSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  image: z.string(),
  show_tile: z.boolean().optional(), // default true if missing
});

const pages = defineCollection({ schema: tilesSchema });
const posts = defineCollection({
  schema: tilesSchema.extend({
    pubDate: z.date().optional(),
  }),
});

export const collections = { pages, posts };
