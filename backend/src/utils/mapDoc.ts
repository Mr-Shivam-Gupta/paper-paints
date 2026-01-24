type Doc = { _id: { toString(): string }; createdAt?: Date; updatedAt?: Date; [k: string]: unknown };

export function toAPI(doc: Doc | null): Record<string, unknown> | null {
  if (!doc) return null;
  const { _id, createdAt, updatedAt, ...rest } = doc;
  const out: Record<string, unknown> = { _id: _id.toString(), ...rest };
  if (createdAt) out._createdDate = createdAt;
  if (updatedAt) out._updatedDate = updatedAt;
  return out;
}

export function toProject(doc: Doc | null): Record<string, unknown> | null {
  const base = toAPI(doc);
  if (!base || !doc) return base;
  const d = doc as Doc & { completionDate?: Date };
  if (d.completionDate) base.completionDate = d.completionDate.toISOString();
  return base;
}
