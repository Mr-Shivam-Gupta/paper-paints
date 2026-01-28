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
import type { TeamMembers } from "@/entities";

type FormState = Partial<TeamMembers> & { _id?: string };

export default function AdminTeamPage() {
  const [items, setItems] = useState<TeamMembers[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState<FormState>({});
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  const load = () =>
    fetchAdminJson<{ items: TeamMembers[] }>("/api/team").then((r) => {
      setItems(r.items);
    });

  useEffect(() => {
    load().finally(() => setLoading(false));
  }, []);

  const openNew = () => {
    setForm({});
    setFormOpen(true);
  };
  const openEdit = (t: TeamMembers) => {
    setForm({ ...t });
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
        await fetchAdmin(`/api/team/${_id}`, { method: "PUT", body: JSON.stringify(body) });
      } else {
        const { _id, _createdDate, _updatedDate, ...body } = form;
        await fetchAdmin("/api/team", { method: "POST", body: JSON.stringify(body) });
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
      await fetchAdmin(`/api/team/${deleteId}`, { method: "DELETE" });
      await load();
      setDeleteId(null);
    } catch (e: unknown) {
      alert((e as Error)?.message || "Failed to delete");
    } finally {
      setDeleting(false);
    }
  };

  const handleProfilePhotoUpload = async (file: File | null) => {
    if (!file) return;
    setImageUploading(true);
    try {
      const data = new FormData();
      data.append("image", file);
      const res = await fetch("/api/uploads/image", {
        method: "POST",
        body: data,
      });
      if (!res.ok) {
        throw new Error("Failed to upload image");
      }
      const json = (await res.json()) as { url?: string };
      if (json.url) {
        setForm((f) => ({ ...f, profilePhoto: json.url }));
      }
    } catch (e) {
      console.error(e);
      alert("Failed to upload image");
    } finally {
      setImageUploading(false);
    }
  };

  if (loading) return <p className="text-dark-grey">Loading...</p>;

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-deep-black">Team</h1>
        <Button onClick={openNew} className="bg-accent-red hover:bg-accent-red/90 w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          New Member
        </Button>
      </div>

      <div className="bg-white border border-dark-grey/10 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
          <thead className="bg-off-white border-b border-dark-grey/10">
            <tr>
              <th className="text-left p-4 font-medium text-deep-black">Name</th>
              <th className="text-left p-4 font-medium text-deep-black">Job Title</th>
              <th className="p-4 w-28">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={3} className="p-8 text-center text-dark-grey">
                  No team members. Add one to get started.
                </td>
              </tr>
            ) : (
              items.map((t) => (
                <tr key={t._id} className="border-b border-dark-grey/5 hover:bg-off-white/50">
                  <td className="p-4 font-medium">{t.name || "—"}</td>
                  <td className="p-4">{t.jobTitle || "—"}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(t)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => setDeleteId(t._id)} className="text-accent-red hover:text-accent-red">
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

      <Dialog open={formOpen} onOpenChange={(o) => !o && closeForm()}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{form._id ? "Edit Member" : "New Member"}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="md:col-span-1">
              <Label>Name</Label>
              <Input
                value={form.name ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Full name"
              />
            </div>
            <div className="md:col-span-1">
              <Label>Job Title</Label>
              <Input
                value={form.jobTitle ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, jobTitle: e.target.value }))}
                placeholder="e.g. CEO"
              />
            </div>
            <div className="md:col-span-2">
              <Label>Bio</Label>
              <Textarea
                value={form.bio ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
                placeholder="Short bio"
                rows={3}
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <Label>Profile Photo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => handleProfilePhotoUpload(e.target.files?.[0] ?? null)}
              />
              {imageUploading && (
                <p className="text-xs text-dark-grey">Uploading image...</p>
              )}
              {form.profilePhoto && (
                <p className="text-xs text-dark-grey break-all">
                  Current image: {form.profilePhoto}
                </p>
              )}
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
            <AlertDialogTitle>Delete team member?</AlertDialogTitle>
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
