"use client";

import { useEffect, useState } from "react";
import { fetchAdmin, fetchAdminJson } from "@/lib/admin-api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
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
  const [featuresList, setFeaturesList] = useState<string[]>([""]);
  const [specsList, setSpecsList] = useState<string[]>([""]);
  const [imageUploading, setImageUploading] = useState(false);

  const load = () =>
    fetchAdminJson<{ items: Products[] }>("/api/products").then((r) => {
      setItems(r.items);
    });

  useEffect(() => {
    load().finally(() => setLoading(false));
  }, []);

  const openNew = () => {
    setForm({});
    setFeaturesList([""]);
    setSpecsList([""]);
    setFormOpen(true);
  };
  const openEdit = (p: Products) => {
    setForm({ ...p });
    setFeaturesList(
      (p.features || "")
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean) || [""]
    );
    setSpecsList(
      (p.technicalSpecifications || "")
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean) || [""]
    );
    setFormOpen(true);
  };
  const closeForm = () => {
    setFormOpen(false);
    setForm({});
    setFeaturesList([""]);
    setSpecsList([""]);
  };

  const save = async () => {
    setSaving(true);
    try {
      const features = featuresList.map((f) => f.trim()).filter(Boolean).join("\n");
      const technicalSpecifications = specsList.map((s) => s.trim()).filter(Boolean).join("\n");

      if (form._id) {
        const { _id, _createdDate, _updatedDate, ...rest } = form;
        const body = { ...rest, features, technicalSpecifications };
        await fetchAdmin(`/api/products/${_id}`, { method: "PUT", body: JSON.stringify(body) });
      } else {
        const { _id, _createdDate, _updatedDate, ...rest } = form;
        const body = { ...rest, features, technicalSpecifications };
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

  const updateFeatureAt = (index: number, value: string) => {
    setFeaturesList((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const addFeature = () => {
    setFeaturesList((prev) => [...prev, ""]);
  };

  const removeFeatureAt = (index: number) => {
    setFeaturesList((prev) => (prev.length <= 1 ? [""] : prev.filter((_, i) => i !== index)));
  };

  const updateSpecAt = (index: number, value: string) => {
    setSpecsList((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const addSpec = () => {
    setSpecsList((prev) => [...prev, ""]);
  };

  const removeSpecAt = (index: number) => {
    setSpecsList((prev) => (prev.length <= 1 ? [""] : prev.filter((_, i) => i !== index)));
  };

  const handleMainImageUpload = async (file: File | null) => {
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
        setForm((f) => ({ ...f, mainImage: json.url }));
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
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-deep-black">Products</h1>
        <Button onClick={openNew} className="bg-accent-red hover:bg-accent-red/90 w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          New Product
        </Button>
      </div>

      <div className="bg-white border border-dark-grey/10 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
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
      </div>

      <Dialog open={formOpen} onOpenChange={(o) => !o && closeForm()}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{form._id ? "Edit Product" : "New Product"}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="md:col-span-1">
              <Label>Product Name</Label>
              <Input
                value={form.productName ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, productName: e.target.value }))}
                placeholder="Product name"
              />
            </div>
            <div className="md:col-span-1">
              <Label>Category</Label>
              <Input
                value={form.category ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                placeholder="e.g. Paints"
              />
            </div>
            <div className="md:col-span-2">
              <Label>Description</Label>
              <Textarea
                value={form.description ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="Description"
                rows={3}
              />
            </div>
            <div className="md:col-span-1">
              <Label>Features</Label>
              <div className="space-y-2">
                {featuresList.map((feat, idx) => (
                  <div key={idx} className="flex gap-2">
                    <Input
                      value={feat}
                      onChange={(e) => updateFeatureAt(idx, e.target.value)}
                      placeholder={`Feature ${idx + 1}`}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => removeFeatureAt(idx)}
                      className="shrink-0"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addFeature}
                  className="mt-1"
                >
                  Add Feature
                </Button>
              </div>
            </div>
            <div className="md:col-span-1">
              <Label>Technical Specifications</Label>
              <div className="space-y-2">
                {specsList.map((spec, idx) => (
                  <div key={idx} className="flex gap-2">
                    <Input
                      value={spec}
                      onChange={(e) => updateSpecAt(idx, e.target.value)}
                      placeholder={`Specification ${idx + 1}`}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => removeSpecAt(idx)}
                      className="shrink-0"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addSpec}
                  className="mt-1"
                >
                  Add Specification
                </Button>
              </div>
            </div>
            <div className="md:col-span-1 space-y-2">
              <Label>Main Image</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => handleMainImageUpload(e.target.files?.[0] ?? null)}
              />
              {imageUploading && (
                <p className="text-xs text-dark-grey">Uploading image...</p>
              )}
              {form.mainImage && (
                <p className="text-xs text-dark-grey break-all">
                  Current image: {form.mainImage}
                </p>
              )}
            </div>
            <div className="md:col-span-1">
              <Label>Brochure URL</Label>
              <Input
                value={form.brochureUrl ?? ""}
                onChange={(e) => setForm((f) => ({ ...f, brochureUrl: e.target.value }))}
                placeholder="https://..."
              />
            </div>
            <div className="md:col-span-2 flex items-center gap-2">
              <Checkbox
                id="featured"
                checked={form.featured ?? false}
                onCheckedChange={(checked) => setForm((f) => ({ ...f, featured: checked === true }))}
              />
              <Label htmlFor="featured" className="cursor-pointer">
                Featured Product (shown on homepage)
              </Label>
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
