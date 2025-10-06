import { SignUpForm } from '@components/Auth/SignUp';
import { Container, Loader } from '@intlayer/design-system';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider, useIntlayer } from 'next-intlayer/server';
import { type FC, Suspense } from 'react';

export { generateMetadata } from './metadata';

const SignUpPageContent: FC = () => {
  const { title, title2, description } = useIntlayer('sign-up-page');

  return (
    <>
      <h1 className="hidden">{title}</h1>
      <div className="flex flex-1 flex-col items-center justify-center gap-5 p-5 md:p-10">
        <Container
          className="w-full max-w-md justify-center gap-16 p-10 text-2xl"
          padding="xl"
          roundedSize="xl"
          transparency="sm"
        >
          <div className="flex flex-col gap-3 text-center">
            <h2 className="font-extrabold">{title2}</h2>
            <span className="text-neutral text-xs">{description}</span>
          </div>

          <Suspense fallback={<Loader />}>
            <SignUpForm />
          </Suspense>
        </Container>
      </div>
    </>
  );
};

const SignUpPage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  return (
    <IntlayerServerProvider locale={locale}>
      <SignUpPageContent />
    </IntlayerServerProvider>
  );
};

export default SignUpPage;
