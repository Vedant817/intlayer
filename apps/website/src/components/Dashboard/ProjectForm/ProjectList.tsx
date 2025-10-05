'use client';

import type { ProjectAPI } from '@intlayer/backend';
import { Button } from '@intlayer/design-system';
import { useSelectProject } from '@intlayer/design-system/hooks';
import { useRouter } from 'next/navigation';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import { PagesRoutes } from '@/Routes';

type ProjectListProps = {
  projects: ProjectAPI[];
};

export const ProjectList: FC<ProjectListProps> = ({ projects }) => {
  const { selectButton } = useIntlayer('project-list');
  const { mutate: selectProject } = useSelectProject();
  const router = useRouter();

  const handleSelectProject = (projectId: string) => {
    selectProject(projectId, {
      onSuccess: () => {
        router.push(PagesRoutes.Dashboard_Content);
      },
    });
  };

  return (
    <ul className="flex w-full flex-wrap gap-3">
      {projects.map((project) => (
        <li
          className="flex w-full flex-col gap-3 rounded-lg border border-neutral p-6"
          key={String(project.id)}
        >
          <h2 className="font-bold">{project.name}</h2>
          <Button
            onClick={() => handleSelectProject(String(project.id))}
            label={selectButton.label.value}
            color="text"
          >
            {selectButton.text}
          </Button>
        </li>
      ))}
    </ul>
  );
};
