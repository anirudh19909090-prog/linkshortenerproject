import { and, desc, eq } from 'drizzle-orm';
import { db } from '@/db';
import { links } from '@/db/schema';

const SHORT_CODE_CHARACTERS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const SHORT_CODE_LENGTH = 7;
const MAX_SHORT_CODE_ATTEMPTS = 10;

function generateShortCode() {
  let result = '';

  for (let index = 0; index < SHORT_CODE_LENGTH; index += 1) {
    const randomIndex = Math.floor(Math.random() * SHORT_CODE_CHARACTERS.length);
    result += SHORT_CODE_CHARACTERS[randomIndex];
  }

  return result;
}

export async function getUserLinks(userId: string) {
  const userLinks = await db
    .select()
    .from(links)
    .where(eq(links.userId, userId))
    .orderBy(desc(links.updatedAt));

  return userLinks;
}

export async function createLink(userId: string, url: string) {
  for (let attempt = 0; attempt < MAX_SHORT_CODE_ATTEMPTS; attempt += 1) {
    const shortCode = generateShortCode();

    const existingLink = await db
      .select({ id: links.id })
      .from(links)
      .where(eq(links.shortCode, shortCode))
      .limit(1);

    if (existingLink.length > 0) {
      continue;
    }

    const insertedLink = await db
      .insert(links)
      .values({
        userId,
        url,
        shortCode,
      })
      .returning();

    return insertedLink[0];
  }

  return null;
}

export async function updateLink(userId: string, linkId: number, url: string) {
  const updatedLinks = await db
    .update(links)
    .set({
      url,
      updatedAt: new Date(),
    })
    .where(and(eq(links.id, linkId), eq(links.userId, userId)))
    .returning({ id: links.id });

  return updatedLinks.length > 0;
}

export async function deleteLink(userId: string, linkId: number) {
  const deletedLinks = await db
    .delete(links)
    .where(and(eq(links.id, linkId), eq(links.userId, userId)))
    .returning({ id: links.id });

  return deletedLinks.length > 0;
}
