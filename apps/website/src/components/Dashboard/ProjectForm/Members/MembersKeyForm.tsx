'use client';

import type {
  GetUsersResult,
  UpdateProjectMembersBody,
  UserAPI,
} from '@intlayer/backend';
import {
  Form,
  H3,
  Loader,
  MultiSelect,
  useForm,
} from '@intlayer/design-system';
import {
  useGetUsers,
  useSession,
  useUpdateProjectMembers,
} from '@intlayer/design-system/hooks';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import {
  type ProjectMembersFormData,
  useProjectMembersSchema,
} from './useMembersFormSchema';

const getUserNames = (users: UserAPI[], id: UserAPI['id'] | string): string => {
  const user = users.find((user) => String(user.id) === String(id));
  return user?.name ?? user?.email ?? String(id);
};

export const MembersForm: FC = () => {
  const { session } = useSession();
  const { organization, project } = session ?? {};
  const MembersFormSchema = useProjectMembersSchema();
  const { form, isSubmitting } = useForm(MembersFormSchema, {
    defaultValues: {
      membersIds: project?.membersIds.map((el) => String(el)) ?? [],
      adminsIds: project?.adminsIds?.map((el) => String(el)) ?? [],
    },
  });
  const { title, addMembersButton, membersSelect, adminsSelect } = useIntlayer(
    'project-members-form'
  );
  const { mutate: updateProjectMembers } = useUpdateProjectMembers();
  const { isPending: isLoadingUsers, data: usersData } = useGetUsers({
    ids: project?.membersIds ?? [],
  });
  const users = (usersData as GetUsersResult)?.data ?? [];

  const isProjectAdmin = session?.roles.includes('project_admin');

  const onSubmitSuccess = (data: ProjectMembersFormData) => {
    const formattedData: UpdateProjectMembersBody = {
      membersIds: data.membersIds.map((el) => ({
        userId: el,
        isAdmin: data.adminsIds.includes(el),
      })),
    };

    updateProjectMembers(formattedData);
  };

  return (
    <>
      <H3 className="mb-8">{title}</H3>
      {isLoadingUsers ? (
        <Loader />
      ) : (
        <Form
          className="w-full"
          schema={MembersFormSchema}
          onSubmitSuccess={onSubmitSuccess}
          {...form}
        >
          <Form.MultiSelect
            name="membersIds"
            label={membersSelect.label.value}
            placeholder={membersSelect.placeholder.value}
            description={membersSelect.description.value}
          >
            <MultiSelect.Trigger
              getBadgeValue={(value) => getUserNames(users, value)}
            >
              <MultiSelect.Input
                placeholder={membersSelect.placeholder.value}
              />
            </MultiSelect.Trigger>
            <MultiSelect.Content>
              <MultiSelect.List>
                {organization?.membersIds.map((memberId) => (
                  <MultiSelect.Item
                    key={String(memberId)}
                    value={String(memberId)}
                  >
                    {getUserNames(users, memberId)}
                  </MultiSelect.Item>
                ))}
              </MultiSelect.List>
            </MultiSelect.Content>
          </Form.MultiSelect>
          <Form.MultiSelect
            name="adminsIds"
            label={adminsSelect.label.value}
            placeholder={adminsSelect.placeholder.value}
            description={adminsSelect.description.value}
          >
            <MultiSelect.Trigger
              getBadgeValue={(value) => getUserNames(users, value)}
            >
              <MultiSelect.Input placeholder={adminsSelect.placeholder.value} />
            </MultiSelect.Trigger>
            <MultiSelect.Content>
              <MultiSelect.List>
                {form.getValues('membersIds').map((memberId) => (
                  <MultiSelect.Item
                    key={String(memberId)}
                    value={String(memberId)}
                  >
                    {getUserNames(users, memberId)}
                  </MultiSelect.Item>
                ))}
              </MultiSelect.List>
            </MultiSelect.Content>
          </Form.MultiSelect>
          {isProjectAdmin && (
            <Form.Button
              className="w-full"
              type="submit"
              color="text"
              isLoading={isSubmitting}
              label={addMembersButton.label.value}
              onClick={() => null}
            >
              {addMembersButton.text}
            </Form.Button>
          )}
        </Form>
      )}
    </>
  );
};
