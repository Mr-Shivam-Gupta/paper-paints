"use client";

import { useEffect, useState } from "react";
import { fetchAdmin, fetchAdminJson } from "@/lib/admin-api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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
import { Plus, Pencil, Trash2 } from "lucide-react";
import type { Applications } from "@/entities";

type FormState = Partial<Applications> & { _id?: string };

export default function AdminApplicationsPage() {
  const [items, setItems] = useState<Applications[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState<FormState>({});
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = () =>
    fetchAdminJson<{ items: Applications[] }>("/api/applications").then((r) => {
      setItems(r.items);
    });

  useEffect(() => {
    load().finally(() => setLoading(false));
  }, []);

  const openNew = () => {
    setForm({});
    setFormOpen(true);
  };
  const openEdit = (a: Applications) => {
    setForm({ ...a });
    setFormOpen(true);
  };
  const closeForm = () => {
    setFormOpen(false);
    setForm({});
  };

  const save = async () => {
    setSaving(true);
    try {
      if (form._id) {
        const { _id, _createdDate, _updatedDate, ...body } = form;
        await fetchAdmin(`/api/applications/${_id}`, { method: "PUT", body: JSON.stringify(body) });
      } else {
        const { _id, _createdDate, _updatedDate, ...body } = form;
        await fetchAdmin("/api/applications", { method: "POST", body: JSON.stringify(body) });
      }
      await load();
      closeForm();
    } catch (e: unknown) {
      alert((e as Error)?.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const doDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await fetchAdmin(`/api/applications/${deleteId}`, { method: "DELETE" });
      await load();
      setDeleteId(null);
    } catch (e: unknown) {
      alert((e as Error)?.message || "Failed to delete");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <p className="text-dark-grey">Loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-4xl font-bold text-deep-black">Applications</h1>
        <Button onClick={openNew} className="bg-accent-red hover:bg-accent-red/90">
          <Plus className="w-4 h-4 mr-2" />
          New Application
        </Button>
      </div>

      <div className="bg-white border border-dark-grey/10 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-off-white border-b border-dark-grey/10">
            <tr>
              <th className="text-left p-4 font-medium text-deep-black">Title</th>
              <th className="text-left p-4 font-medium text-deep-black">Category</th>
              <th className="p-4 w-28">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={3} className="p-8 text-center text-dark-grey">
                  No applications. Add one to get started.
                </td>
              </tr>
            ) : (
              items.map((a) => (
                <tr key={a._id} className="border-b border-dark-grey/5 hover:bg-off-white/50">
                  <td className="p-4 font-medium">{a.title || "—"}</td>
                  <td className="p-4">{a.category || "—"}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(a)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => setDeleteId(a._id)} className="text-accent-red hover:text-accent-red">
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

      <Dialog open={formOpen} onOpenChange={(o) => !o && closeForm()}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{form._id ? "Edit Application" : "New Application"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label>Title</Label>
              <Input
                value={form.title ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="Title"
              />
            </div>
            <div>
              <Label>Category</Label>
              <Input
                value={form.category ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                placeholder="e.g. Industrial"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={form.description ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="Description"
                rows={3}
              />
            </div>
            <div>
              <Label>Key Benefits</Label>
              <Textarea
                value={form.keyBenefits ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, keyBenefits: e.target.value }))}
                placeholder="One per line"
                rows={2}
              />
            </div>
            <div>
              <Label>Slug</Label>
              <Input
                value={form.slug ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                placeholder="url-slug"
              />
            </div>
            <div>
              <Label>Main Image URL</Label>
              <Input
                value={form.mainImage ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, mainImage: e.target.value }))}
                placeholder="https://..."
              />
            </div>
            <div>
              <Label>Learn More URL</Label>
              <Input
                value={form.learnMoreUrl ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, learnMoreUrl: e.target.value }))}
                placeholder="https://..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeForm}>Cancel</Button>
            <Button onClick={save} disabled={saving} className="bg-accent-red hover:bg-accent-red/90">
              {saving ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete application?</AlertDialogTitle>
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
