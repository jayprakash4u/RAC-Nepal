import { contactPage } from "@/data/contact-page";
import { ContactForm } from "@/components/forms/contact-form";
import { Container, Heading, PageHero, Section } from "@/components/ui";

function PhoneIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
      <path d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267a11.042 11.042 0 005.516 5.516l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-7.732 0-14-6.268-14-14V4.5A1.5 1.5 0 012 3.5z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
      <path
        fillRule="evenodd"
        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
        clipRule="evenodd"
      />
    </svg>
  );
}

const detailIcons = {
  phone: PhoneIcon,
  email: MailIcon,
  address: LocationIcon,
  hours: ClockIcon,
} as const;

function ContactDetailCard({
  id,
  label,
  value,
  href,
}: {
  id: keyof typeof detailIcons;
  label: string;
  value: string;
  href?: string;
}) {
  const Icon = detailIcons[id];

  const content = (
  <>
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary">
        <Icon />
      </span>
      <div>
        <p className="text-small font-semibold text-navy">{label}</p>
        <p className="mt-xs w-full text-pretty text-small text-slate-600">{value}</p>
      </div>
    </>
  );

  const className =
    "flex items-start gap-md rounded-xl border border-slate-200 bg-background p-lg transition-colors duration-normal hover:border-primary/20";

  if (href) {
    return (
      <a href={href} className={className}>
        {content}
      </a>
    );
  }

  return <div className={className}>{content}</div>;
}

export function ContactPageHero() {
  return (
    <Section
      background="hero"
      spacing="none"
      className="border-b border-primary-dark/10"
    >
      <Container size="wide" className="page-hero-padding">
        <PageHero
          title={contactPage.title}
          description={contactPage.description}
        />
      </Container>
    </Section>
  );
}

export function ContactSection() {
  return (
    <Section background="default" spacing="default">
      <Container size="wide">
        <div className="flex flex-col gap-xl lg:flex-row lg:items-start lg:gap-4xl">
          <div className="w-full lg:w-[42%]">
            <Heading level="h2" className="font-bold">
              {contactPage.infoTitle}
            </Heading>

            <ul className="mt-xl flex flex-col gap-md">
              {contactPage.details.map((detail) => (
                <li key={detail.id}>
                  <ContactDetailCard
                    id={detail.id}
                    label={detail.label}
                    value={detail.value}
                    href={"href" in detail ? detail.href : undefined}
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full rounded-2xl border border-slate-200 bg-surface p-lg sm:p-xl lg:w-[58%] lg:p-2xl">
            <Heading level="h2" className="font-bold">
              {contactPage.formTitle}
            </Heading>
            <p className="mt-sm w-full text-pretty text-small text-slate-600">
              {contactPage.formDescription}
            </p>

            <div className="mt-xl">
              <ContactForm />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
