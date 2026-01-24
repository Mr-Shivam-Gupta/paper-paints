/**
 * Map Prisma model rows to API/entity shape (_id, _createdDate, _updatedDate).
 */
export function toProduct(r: { id: string; createdAt: Date; updatedAt: Date; [k: string]: unknown }) {
  const { id, createdAt, updatedAt, ...rest } = r;
  return { _id: id, _createdDate: createdAt, _updatedDate: updatedAt, ...rest };
}

export function toApplication(r: { id: string; createdAt: Date; updatedAt: Date; [k: string]: unknown }) {
  const { id, createdAt, updatedAt, ...rest } = r;
  return { _id: id, _createdDate: createdAt, _updatedDate: updatedAt, ...rest };
}

export function toProject(r: { id: string; createdAt: Date; updatedAt: Date; completionDate?: Date | null; [k: string]: unknown }) {
  const { id, createdAt, updatedAt, completionDate, ...rest } = r;
  return {
    _id: id,
    _createdDate: createdAt,
    _updatedDate: updatedAt,
    completionDate: completionDate instanceof Date ? completionDate.toISOString() : (completionDate ? String(completionDate) : undefined),
    ...rest,
  };
}

export function toTeamMember(r: { id: string; createdAt: Date; updatedAt: Date; [k: string]: unknown }) {
  const { id, createdAt, updatedAt, ...rest } = r;
  return { _id: id, _createdDate: createdAt, _updatedDate: updatedAt, ...rest };
}
