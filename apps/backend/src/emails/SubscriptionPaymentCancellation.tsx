import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

export type SubscriptionPaymentCancellationProps = {
  username: string; // The name of the user receiving the email
  email: string; // The email address of the user
  planName: string; // The name of the subscription plan
  organizationName: string; // The name of the organization
  cancellationDate: string; // The date when the subscription will end
  reactivateLink: string; // A link for the user to reactivate their subscription
};

export const SubscriptionPaymentCancellationEN = ({
  username,
  planName,
  organizationName,
  cancellationDate,
  reactivateLink,
}: SubscriptionPaymentCancellationProps) => {
  const previewText = `Your ${planName} subscription has been canceled`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded-xl border border-[#eaeaea] border-solid bg-white p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src="https://intlayer.org/apple-touch-icon.png"
                width="40"
                height="37"
                alt="Intlayer"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black">
              Subscription Canceled
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Hello {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              We’re sorry to see you go! Your subscription to the{' '}
              <strong>{planName}</strong> plan has been canceled. You will still
              have access until <strong>{cancellationDate}</strong>.
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Organization: <strong>{organizationName}</strong>
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={reactivateLink}
              >
                Reactivate Your Subscription
              </Button>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const SubscriptionPaymentCancellationFR = ({
  username,
  planName,
  organizationName,
  cancellationDate,
  reactivateLink,
}: SubscriptionPaymentCancellationProps) => {
  const previewText = `Votre abonnement ${planName} a été annulé`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded-xl border border-[#eaeaea] border-solid bg-white p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src="https://intlayer.org/apple-touch-icon.png"
                width="40"
                height="37"
                alt="Intlayer"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black">
              Abonnement Annulé
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Bonjour {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Nous sommes désolés de vous voir partir ! Votre abonnement au plan{' '}
              <strong>{planName}</strong> a été annulé. Vous aurez toujours
              accès jusqu'au <strong>{cancellationDate}</strong>.
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Organisation : <strong>{organizationName}</strong>
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={reactivateLink}
              >
                Réactiver votre abonnement
              </Button>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const SubscriptionPaymentCancellationES = ({
  username,
  planName,
  organizationName,
  cancellationDate,
  reactivateLink,
}: SubscriptionPaymentCancellationProps) => {
  const previewText = `Tu suscripción ${planName} ha sido cancelada`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="m-auto px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded-xl border border-[#eaeaea] border-solid bg-white p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src="https://intlayer.org/apple-touch-icon.png"
                width="40"
                height="37"
                alt="Intlayer"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black">
              Suscripción Cancelada
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Hola {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Lamentamos verte partir. Tu suscripción al plan{' '}
              <strong>{planName}</strong> ha sido cancelada. Tendrás acceso
              hasta <strong>{cancellationDate}</strong>.
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Organización : <strong>{organizationName}</strong>
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded-md bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline"
                href={reactivateLink}
              >
                Reactivar tu suscripción
              </Button>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

const PreviewProps: SubscriptionPaymentCancellationProps = {
  username: 'John Doe',
  email: 'john.doe@example.com',
  planName: 'Pro Plan',
  organizationName: 'My Organization',
  cancellationDate: 'November 30, 2024',
  reactivateLink: 'https://intlayer.org/reactivate-subscription',
};

SubscriptionPaymentCancellationEN.PreviewProps = PreviewProps;
SubscriptionPaymentCancellationFR.PreviewProps = PreviewProps;
SubscriptionPaymentCancellationES.PreviewProps = PreviewProps;
