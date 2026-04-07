'use server';

import { auth } from '@clerk/nextjs/server';
import { z } from 'zod';
import { createLink, deleteLink, updateLink } from '@/data/links';

const createLinkInputSchema = z.object({
  url: z
    .string()
    .trim()
    .url('Enter a valid URL including http:// or https://')
    .max(2048, 'URL is too long'),
});

type CreateLinkInput = z.infer<typeof createLinkInputSchema>;

type CreateLinkActionResult =
  | { success: true }
  | {
      success: false;
      error: string;
    };

const updateLinkInputSchema = z.object({
  id: z.number().int().positive('Invalid link id.'),
  url: z
    .string()
    .trim()
    .url('Enter a valid URL including http:// or https://')
    .max(2048, 'URL is too long'),
});

type UpdateLinkInput = z.infer<typeof updateLinkInputSchema>;

type UpdateLinkActionResult =
  | { success: true }
  | {
      success: false;
      error: string;
    };

const deleteLinkInputSchema = z.object({
  id: z.number().int().positive('Invalid link id.'),
});

type DeleteLinkInput = z.infer<typeof deleteLinkInputSchema>;

type DeleteLinkActionResult =
  | { success: true }
  | {
      success: false;
      error: string;
    };

export async function createLinkAction(
  input: CreateLinkInput
): Promise<CreateLinkActionResult> {
  const { userId } = await auth();

  if (!userId) {
    return {
      success: false,
      error: 'You must be signed in to create a link.',
    };
  }

  const parsedInput = createLinkInputSchema.safeParse(input);

  if (!parsedInput.success) {
    const issue = parsedInput.error.issues[0];

    return {
      success: false,
      error: issue?.message ?? 'Invalid input.',
    };
  }

  const createdLink = await createLink(userId, parsedInput.data.url);

  if (!createdLink) {
    return {
      success: false,
      error: 'Could not create a unique short link. Please try again.',
    };
  }

  return { success: true };
}

export async function updateLinkAction(
  input: UpdateLinkInput
): Promise<UpdateLinkActionResult> {
  const { userId } = await auth();

  if (!userId) {
    return {
      success: false,
      error: 'You must be signed in to update a link.',
    };
  }

  const parsedInput = updateLinkInputSchema.safeParse(input);

  if (!parsedInput.success) {
    const issue = parsedInput.error.issues[0];

    return {
      success: false,
      error: issue?.message ?? 'Invalid input.',
    };
  }

  const wasUpdated = await updateLink(
    userId,
    parsedInput.data.id,
    parsedInput.data.url
  );

  if (!wasUpdated) {
    return {
      success: false,
      error: 'Could not update this link.',
    };
  }

  return { success: true };
}

export async function deleteLinkAction(
  input: DeleteLinkInput
): Promise<DeleteLinkActionResult> {
  const { userId } = await auth();

  if (!userId) {
    return {
      success: false,
      error: 'You must be signed in to delete a link.',
    };
  }

  const parsedInput = deleteLinkInputSchema.safeParse(input);

  if (!parsedInput.success) {
    const issue = parsedInput.error.issues[0];

    return {
      success: false,
      error: issue?.message ?? 'Invalid input.',
    };
  }

  const wasDeleted = await deleteLink(userId, parsedInput.data.id);

  if (!wasDeleted) {
    return {
      success: false,
      error: 'Could not delete this link.',
    };
  }

  return { success: true };
}
