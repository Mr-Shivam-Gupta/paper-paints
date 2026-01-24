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
import type { Products } from "@/entities";

type FormState = Partial<Products> & { _id?: string };

export default function AdminProductsPage() {
  const [items, setItems] = useState<Products[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState<FormState>({});
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = () =>
    fetchAdminJson<{ items: Products[] }>("/api/products").then((r) => {
      setItems(r.items);
    });

  useEffect(() => {
    load().finally(() => setLoading(false));
  }, []);

  const openNew = () => {
    setForm({});
    setFormOpen(true);
  };
  const openEdit = (p: Products) => {
    setForm({ ...p });
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
        await fetchAdmin(`/api/products/${_id}`, { method: "PUT", body: JSON.stringify(body) });
      } else {
        const { _id, _createdDate, _updatedDate, ...body } = form;
        await fetchAdmin("/api/products", { method: "POST", body: JSON.stringify(body) });
      }
      await load();
      closeForm();
    } catch (e: any) {
      alert(e?.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const doDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await fetchAdmin(`/api/products/${deleteId}`, { method: "DELETE" });
      await load();
      setDeleteId(null);
    } catch (e: any) {
      alert(e?.message || "Failed to delete");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <p className="text-dark-grey">Loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-4xl font-bold text-deep-black">Products</h1>
        <Button onClick={openNew} className="bg-accent-red hover:bg-accent-red/90">
          <Plus className="w-4 h-4 mr-2" />
          New Product
        </Button>
      </div>

      <div className="bg-white border border-dark-grey/10 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-off-white border-b border-dark-grey/10">
            <tr>
              <th className="text-left p-4 font-medium text-deep-black">Name</th>
              <th className="text-left p-4 font-medium text-deep-black">Category</th>
              <th className="p-4 w-28">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={3} className="p-8 text-center text-dark-grey">
                  No products. Add one to get started.
                </td>
              </tr>
            ) : (
              items.map((p) => (
                <tr key={p._id} className="border-b border-dark-grey/5 hover:bg-off-white/50">
                  <td className="p-4 font-medium">{p.productName || "—"}</td>
                  <td className="p-4">{p.category || "—"}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(p)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => setDeleteId(p._id)} className="text-accent-red hover:text-accent-red">
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
            <DialogTitle>{form._id ? "Edit Product" : "New Product"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label>Product Name</Label>
              <Input
                value={form.productName ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, productName: e.target.value }))}
                placeholder="Product name"
              />
            </div>
            <div>
              <Label>Category</Label>
              <Input
                value={form.category ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                placeholder="e.g. Paints"
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
              <Label>Features (one per line)</Label>
              <Textarea
                value={form.features ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, features: e.target.value }))}
                placeholder="Feature 1\nFeature 2"
                rows={3}
              />
            </div>
            <div>
              <Label>Technical Specifications (one per line)</Label>
              <Textarea
                value={form.technicalSpecifications ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, technicalSpecifications: e.target.value }))}
                placeholder="Spec 1\nSpec 2"
                rows={3}
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
              <Label>Brochure URL</Label>
              <Input
                value={form.brochureUrl ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, brochureUrl: e.target.value }))}
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
            <AlertDialogTitle>Delete product?</AlertDialogTitle>
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
