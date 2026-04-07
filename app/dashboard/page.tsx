import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getUserLinks } from '@/data/links';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreateLinkDialog } from '@/app/dashboard/create-link-dialog';
import { LinkItemActions } from '@/app/dashboard/link-item-actions';

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect('/');
  }

  const userLinks = await getUserLinks(userId);

  return (
    <div className="flex flex-col flex-1 p-6 gap-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Your Links</h1>
          <p className="text-muted-foreground mt-2">
            Manage and track all your shortened links
          </p>
        </div>
        <CreateLinkDialog />
      </div>

      {userLinks.length === 0 ? (
        <Card className="p-12">
          <div className="text-center">
            <p className="text-muted-foreground text-lg">
              You haven&apos;t created any links yet.
            </p>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {userLinks.map((link) => (
            <Card key={link.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1">
                      {link.shortCode}
                    </CardTitle>
                    <CardDescription className="break-all text-sm">
                      {link.url}
                    </CardDescription>
                  </div>
                  <div className="ml-2 flex items-center gap-2">
                    <Badge variant="outline">
                      {new Date(link.createdAt).toLocaleDateString()}
                    </Badge>
                    <LinkItemActions
                      linkId={link.id}
                      shortCode={link.shortCode}
                      initialUrl={link.url}
                    />
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
