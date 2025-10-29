import { Spinner } from '@/components/ui/spinner';

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Spinner size={32} className="text-foreground" />
    </div>
  );
}
