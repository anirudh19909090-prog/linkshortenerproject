'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { createLinkAction } from '@/app/dashboard/actions';
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

export function CreateLinkDialog() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleCreateLink = () => {
    setFeedback(null);

    startTransition(async () => {
      const result = await createLinkAction({ url });

      if (!result.success) {
        setFeedback(result.error);
        return;
      }

      setUrl('');
      setIsOpen(false);
      router.refresh();
    });
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(nextOpen) => {
        setIsOpen(nextOpen);

        if (!nextOpen) {
          setFeedback(null);
          setUrl('');
        }
      }}
    >
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-1" />
          Create Link
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a New Link</DialogTitle>
          <DialogDescription>
            Paste a full URL and we will generate a short code for you.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <Label htmlFor="url">Destination URL</Label>
          <Input
            id="url"
            name="url"
            type="url"
            placeholder="https://example.com/very-long-link"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            disabled={isPending}
            aria-invalid={Boolean(feedback)}
          />
          {feedback ? (
            <p className="text-destructive text-sm" role="alert">
              {feedback}
            </p>
          ) : null}
        </div>

        <DialogFooter>
          <Button
            type="button"
            onClick={handleCreateLink}
            disabled={isPending || url.trim().length === 0}
          >
            {isPending ? 'Creating...' : 'Create Link'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
