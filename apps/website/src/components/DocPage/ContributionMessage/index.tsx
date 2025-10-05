import { Link } from '@components/Link/Link';
import { Popover } from '@intlayer/design-system';
import { Edit } from 'lucide-react';
import { useIntlayer } from 'next-intlayer/server';
import type { FC } from 'react';

export const ContributionMessage: FC<{ githubUrl: string }> = ({
  githubUrl,
}) => {
  const { contribution } = useIntlayer('contribution-message');

  return (
    <Popover identifier="contribute">
      <Link
        href={githubUrl.replace('/blob/', `/edit/`)}
        label={contribution.buttonLabel.value}
        color="text"
        className="flex p-2"
        variant="hoverable"
      >
        <Edit className="size-4" size={24} />
      </Link>
      <Popover.Detail
        identifier="contribute"
        className="flex min-w-64 flex-1 flex-col gap-2 p-3 text-sm"
        xAlign="end"
      >
        <strong>{contribution.title}</strong>
        <p className="text-neutral">{contribution.text}</p>
        <Link
          href={githubUrl}
          label={contribution.buttonLabel.value}
          color="text"
        >
          {contribution.button}
        </Link>
      </Popover.Detail>
    </Popover>
  );
};
