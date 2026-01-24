"use client";

import { useEffect, useState } from "react";
import { fetchAdmin, fetchAdminJson } from "@/lib/admin-api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Eye, Trash2 } from "lucide-react";

type DealerItem = {
  _id: string;
  _createdDate?: string;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  location?: string;
  experience?: string;
  message?: string;
};

export default function AdminDealerPage() {
  const [items, setItems] = useState<DealerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewItem, setViewItem] = useState<DealerItem | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = () =>
    fetchAdminJson<{ items: DealerItem[] }>("/api/dealer").then((r) => {
      setItems(r.items);
    });

  useEffect(() => {
    load().finally(() => setLoading(false));
  }, []);

  const doDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await fetchAdmin(`/api/dealer/${deleteId}`, { method: "DELETE" });
      await load();
      setDeleteId(null);
    } catch (e: unknown) {
      alert((e as Error)?.message || "Failed to delete");
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (d?: string) => {
    if (!d) return "—";
    try {
      return new Date(d).toLocaleDateString(undefined, { dateStyle: "short" });
    } catch {
      return "—";
    }
  };

  if (loading) return <p className="text-dark-grey">Loading...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-heading text-4xl font-bold text-deep-black">Dealer Submissions</h1>
      </div>

      <div className="bg-white border border-dark-grey/10 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-off-white border-b border-dark-grey/10">
            <tr>
              <th className="text-left p-4 font-medium text-deep-black">Date</th>
              <th className="text-left p-4 font-medium text-deep-black">Name</th>
              <th className="text-left p-4 font-medium text-deep-black">Email</th>
              <th className="text-left p-4 font-medium text-deep-black">Company</th>
              <th className="p-4 w-28">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-dark-grey">
                  No dealer submissions yet.
                </td>
              </tr>
            ) : (
              items.map((a) => (
                <tr key={a._id} className="border-b border-dark-grey/5 hover:bg-off-white/50">
                  <td className="p-4">{formatDate(a._createdDate as string)}</td>
                  <td className="p-4 font-medium">{a.name || "—"}</td>
                  <td className="p-4">{a.email || "—"}</td>
                  <td className="p-4">{a.company || "—"}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => setViewItem(a)} title="View">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => setDeleteId(a._id)} className="text-accent-red hover:text-accent-red" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Dialog open={!!viewItem} onOpenChange={(o) => !o && setViewItem(null)}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Dealer submission</DialogTitle>
          </DialogHeader>
          {viewItem && (
            <div className="grid gap-3 text-sm">
              <p><span className="font-medium text-dark-grey">Date:</span> {formatDate(viewItem._createdDate as string)}</p>
              <p><span className="font-medium text-dark-grey">Name:</span> {viewItem.name || "—"}</p>
              <p><span className="font-medium text-dark-grey">Email:</span> {viewItem.email || "—"}</p>
              <p><span className="font-medium text-dark-grey">Phone:</span> {viewItem.phone || "—"}</p>
              <p><span className="font-medium text-dark-grey">Company:</span> {viewItem.company || "—"}</p>
              <p><span className="font-medium text-dark-grey">Location:</span> {viewItem.location || "—"}</p>
              <p><span className="font-medium text-dark-grey">Experience:</span> {viewItem.experience || "—"}</p>
              <p><span className="font-medium text-dark-grey">Message:</span> {viewItem.message || "—"}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this dealer submission?</AlertDialogTitle>
            <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={doDelete} disabled={deleting} className="bg-accent-red hover:bg-accent-red/90">
              {deleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
