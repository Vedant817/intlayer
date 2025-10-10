import { OrganizationModel } from '@models/organization.model';
import { GenericError } from '@utils/errors';
import type { OrganizationFilters } from '@utils/filtersAndPagination/getOrganizationFiltersAndPagination';
import {
  type OrganizationFields,
  validateOrganization,
} from '@utils/validation/validateOrganization';
import type { Types } from 'mongoose';
import type {
  Organization,
  OrganizationAPI,
  OrganizationCreationData,
  OrganizationDocument,
} from '@/types/organization.types';
import type { Plan, PlanDocument } from '@/types/plan.types';

/**
 * Finds organizations based on filters and pagination options.
 * @param filters - MongoDB filter query.
 * @param skip - Number of documents to skip.
 * @param limit - Number of documents to limit.
 * @returns List of organizations matching the filters.
 */
export const findOrganizations = async (
  filters: OrganizationFilters,
  skip: number,
  limit: number,
  sortOptions?: Record<string, 1 | -1>
): Promise<OrganizationDocument[]> => {
  let query = OrganizationModel.find(filters).skip(skip).limit(limit);

  if (sortOptions && Object.keys(sortOptions).length > 0) {
    query = query.sort(sortOptions);
  }

  return await query;
};

/**
 * Finds an organization by its ID.
 * @param organizationId - The ID of the organization to find.
 * @returns The organization matching the ID.
 */
export const getOrganizationById = async (
  organizationId: string | Types.ObjectId
): Promise<OrganizationDocument> => {
  const organization = await OrganizationModel.findById(organizationId);

  if (!organization) {
    throw new GenericError('ORGANIZATION_NOT_FOUND', { organizationId });
  }

  return organization;
};

/**
 * Counts the total number of organizations that match the filters.
 * @param filters - MongoDB filter query.
 * @returns Total number of organizations.
 */
export const countOrganizations = async (
  filters: OrganizationFilters
): Promise<number> => {
  const result = await OrganizationModel.countDocuments(filters);

  if (typeof result === 'undefined') {
    throw new GenericError('ORGANIZATION_COUNT_FAILED', { filters });
  }

  return result;
};

/**
 * Creates a new organization in the database.
 * @param organization - The organization data to create.
 * @returns The created organization.
 */
export const createOrganization = async (
  organization: OrganizationCreationData,
  userId: string | Types.ObjectId
): Promise<OrganizationDocument> => {
  const errors = validateOrganization(organization, ['name']);

  if (Object.keys(errors).length > 0) {
    throw new GenericError('ORGANIZATION_INVALID_FIELDS', { errors });
  }

  try {
    const result = await OrganizationModel.create({
      creatorId: userId,
      membersIds: [userId],
      adminsIds: [userId],
      ...organization,
    });

    return result;
  } catch (error) {
    throw new GenericError('ORGANIZATION_CREATION_FAILED', {
      error: (error as Error).message,
    });
  }
};

/**
 * Updates an existing organization in the database by its ID.
 * @param organizationId - The ID of the organization to update.
 * @param organization - The updated organization data.
 * @returns The updated organization.
 */
export const updateOrganizationById = async (
  organizationId: string | Types.ObjectId,
  organization: Partial<Organization | OrganizationAPI>
): Promise<OrganizationDocument> => {
  const updatedKeys = Object.keys(organization) as OrganizationFields;
  const errors = validateOrganization(organization, updatedKeys);

  if (Object.keys(errors).length > 0) {
    throw new GenericError('ORGANIZATION_INVALID_FIELDS', {
      organizationId,
      errors,
    });
  }

  const result = await OrganizationModel.updateOne(
    { _id: organizationId },
    organization
  );

  if (result.matchedCount === 0) {
    throw new GenericError('ORGANIZATION_UPDATE_FAILED', { organizationId });
  }

  return await getOrganizationById(organizationId);
};

/**
 * Deletes an organization from the database by its ID.
 * @param organizationId - The ID of the organization to delete.
 * @returns The result of the deletion operation.
 */
export const deleteOrganizationById = async (
  organizationId: string | Types.ObjectId
): Promise<OrganizationDocument> => {
  const organization =
    await OrganizationModel.findByIdAndDelete(organizationId);

  if (!organization) {
    throw new GenericError('ORGANIZATION_NOT_FOUND', { organizationId });
  }

  return organization;
};

/**
 * Updates an existing plan in the database by its ID.
 * @param planId - The ID of the plan to update.
 * @param plan - The updated plan data.
 * @returns The updated plan.
 */
export const updatePlan = async (
  organization: Organization | OrganizationDocument,
  plan: Partial<Plan>
): Promise<OrganizationDocument | null> => {
  let prevPlan = organization.plan ?? {};

  if (typeof (prevPlan as PlanDocument)?.toObject === 'function') {
    prevPlan = (prevPlan as PlanDocument).toObject();
  }

  const updateOrganizationResult = await OrganizationModel.updateOne(
    { _id: organization.id },
    { $set: { plan: { ...prevPlan, ...plan } } }
  );

  if (updateOrganizationResult.matchedCount === 0) {
    throw new GenericError('ORGANIZATION_UPDATE_FAILED', {
      organizationId: organization.id,
    });
  }

  const updatedOrganization = await getOrganizationById(organization.id);

  return updatedOrganization;
};
