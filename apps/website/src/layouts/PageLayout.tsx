import { IntlayerClientProvider } from 'next-intlayer';
import type { IntlayerServerProviderProps } from 'next-intlayer/server';
import { ThemeProvider } from 'next-themes';
import type { FC } from 'react';
import { IntlayerMarkdownProvider } from '@/providers/IntlayerMarkdownProvider';
import {
  PageContentLayout,
  type PageContentLayoutProps,
} from './PageContentLayout';
import { RootHTMLLayout } from './RootHTMLLayout';

type PageLayoutProps = IntlayerServerProviderProps &
  PageContentLayoutProps & {
    className?: string;
    mainClassName?: string;
  };

export const PageLayout: FC<PageLayoutProps> = ({
  locale,
  children,
  className,
  mainClassName,
  ...props
}) => (
  <IntlayerClientProvider locale={locale}>
    <IntlayerMarkdownProvider>
      <RootHTMLLayout locale={locale} className={className}>
        <ThemeProvider>
          <PageContentLayout {...props} className={mainClassName}>
            {children}
          </PageContentLayout>
        </ThemeProvider>
      </RootHTMLLayout>
    </IntlayerMarkdownProvider>
  </IntlayerClientProvider>
);
