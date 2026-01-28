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
import { Eye, Trash2, Download } from "lucide-react";

type CareerItem = {
  _id: string;
  _createdDate?: string;
  name?: string;
  email?: string;
  phone?: string;
  preferredRole?: string;
  experience?: string;
  message?: string;
  jobId?: string;
  resumeUrl?: string;
};

export default function AdminCareerPage() {
  const [items, setItems] = useState<CareerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewItem, setViewItem] = useState<CareerItem | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = () =>
    fetchAdminJson<{ items: CareerItem[] }>("/api/career").then((r) => {
      setItems(r.items);
    });

  useEffect(() => {
    load().finally(() => setLoading(false));
  }, []);

  const doDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await fetchAdmin(`/api/career/${deleteId}`, { method: "DELETE" });
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
      <div className="mb-8">
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-deep-black">Career Applications</h1>
      </div>

      <div className="bg-white border border-dark-grey/10 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead className="bg-off-white border-b border-dark-grey/10">
              <tr>
                <th className="text-left p-4 font-medium text-deep-black">Date</th>
                <th className="text-left p-4 font-medium text-deep-black">Name</th>
                <th className="text-left p-4 font-medium text-deep-black">Email</th>
                <th className="text-left p-4 font-medium text-deep-black">Phone</th>
                <th className="text-left p-4 font-medium text-deep-black">Role</th>
                <th className="p-4 w-28">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-dark-grey">
                    No career applications yet.
                  </td>
                </tr>
              ) : (
                items.map((a) => (
                  <tr key={a._id} className="border-b border-dark-grey/5 hover:bg-off-white/50">
                    <td className="p-4">{formatDate(a._createdDate as string)}</td>
                    <td className="p-4 font-medium">{a.name || "—"}</td>
                    <td className="p-4">{a.email || "—"}</td>
                    <td className="p-4">{a.phone || "—"}</td>
                    <td className="p-4">{a.preferredRole || "—"}</td>
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
      </div>

      <Dialog open={!!viewItem} onOpenChange={(o) => !o && setViewItem(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Career Application</DialogTitle>
          </DialogHeader>
          {viewItem && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div><span className="font-medium text-dark-grey">Date:</span> {formatDate(viewItem._createdDate as string)}</div>
              <div><span className="font-medium text-dark-grey">Name:</span> {viewItem.name || "—"}</div>
              <div><span className="font-medium text-dark-grey">Email:</span> {viewItem.email || "—"}</div>
              <div><span className="font-medium text-dark-grey">Phone:</span> {viewItem.phone || "—"}</div>
              <div><span className="font-medium text-dark-grey">Preferred Role:</span> {viewItem.preferredRole || "—"}</div>
              <div><span className="font-medium text-dark-grey">Experience:</span> {viewItem.experience || "—"}</div>
              <div className="md:col-span-2"><span className="font-medium text-dark-grey">Message:</span> <p className="mt-1">{viewItem.message || "—"}</p></div>
              {viewItem.resumeUrl && (
                <div className="md:col-span-2">
                  <a
                    href={viewItem.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-accent-red hover:underline"
                  >
                    <Download className="w-4 h-4" />
                    Download Resume
                  </a>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this career application?</AlertDialogTitle>
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
