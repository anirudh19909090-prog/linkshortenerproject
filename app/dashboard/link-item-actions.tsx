'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Pencil, Trash2 } from 'lucide-react';
import { deleteLinkAction, updateLinkAction } from '@/app/dashboard/actions';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type LinkItemActionsProps = {
  linkId: number;
  shortCode: string;
  initialUrl: string;
};

export function LinkItemActions({
  linkId,
  shortCode,
  initialUrl,
}: LinkItemActionsProps) {
  const router = useRouter();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [url, setUrl] = useState(initialUrl);
  const [editFeedback, setEditFeedback] = useState<string | null>(null);
  const [deleteFeedback, setDeleteFeedback] = useState<string | null>(null);
  const [isEditPending, startEditTransition] = useTransition();
  const [isDeletePending, startDeleteTransition] = useTransition();

  const handleEdit = () => {
    setEditFeedback(null);

    startEditTransition(async () => {
      const result = await updateLinkAction({
        id: linkId,
        url,
      });

      if (!result.success) {
        setEditFeedback(result.error);
        return;
      }

      setIsEditOpen(false);
      router.refresh();
    });
  };

  const handleDelete = () => {
    setDeleteFeedback(null);

    startDeleteTransition(async () => {
      const result = await deleteLinkAction({
        id: linkId,
      });

      if (!result.success) {
        setDeleteFeedback(result.error);
        return;
      }

      setIsDeleteOpen(false);
      router.refresh();
    });
  };

  return (
    <div className="ml-2 flex items-center gap-2">
      <Dialog
        open={isEditOpen}
        onOpenChange={(nextOpen) => {
          setIsEditOpen(nextOpen);

          if (!nextOpen) {
            setUrl(initialUrl);
            setEditFeedback(null);
          }
        }}
      >
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Pencil />
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Link</DialogTitle>
            <DialogDescription>
              Update the destination URL for {shortCode}.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <Label htmlFor={`url-${linkId}`}>Destination URL</Label>
            <Input
              id={`url-${linkId}`}
              name="url"
              type="url"
              placeholder="https://example.com/updated-link"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              disabled={isEditPending}
              aria-invalid={Boolean(editFeedback)}
            />
            {editFeedback ? (
              <p className="text-destructive text-sm" role="alert">
                {editFeedback}
              </p>
            ) : null}
          </div>

          <DialogFooter>
            <Button
              type="button"
              onClick={handleEdit}
              disabled={isEditPending || url.trim().length === 0}
            >
              {isEditPending ? 'Saving...' : 'Save changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isDeleteOpen}
        onOpenChange={(nextOpen) => {
          setIsDeleteOpen(nextOpen);

          if (!nextOpen) {
            setDeleteFeedback(null);
          }
        }}
      >
        <DialogTrigger asChild>
          <Button variant="destructive" size="sm">
            <Trash2 />
            Delete
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Link</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {shortCode}? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>

          {deleteFeedback ? (
            <p className="text-destructive text-sm" role="alert">
              {deleteFeedback}
            </p>
          ) : null}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDeleteOpen(false)}
              disabled={isDeletePending}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeletePending}
            >
              {isDeletePending ? 'Deleting...' : 'Delete link'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
