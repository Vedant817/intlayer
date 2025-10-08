import { Link } from '@components/Link/Link';
import { cn } from '@utils/cn';
import type { FC, SVGProps } from 'react';
import { PagesRoutes } from '@/Routes';
import { AstroLogo } from '../AvailableTechnoSection/Astro';
import { ExpressLogo } from '../AvailableTechnoSection/Express';
import { LynxLogo } from '../AvailableTechnoSection/Lynx';
import { NestJSLogo } from '../AvailableTechnoSection/NestJS';
import { NextJSLogo } from '../AvailableTechnoSection/Nextjs';
import { NuxtLogo } from '../AvailableTechnoSection/Nuxt';
import { PreactLogo } from '../AvailableTechnoSection/Preact';
import { ReactLogo } from '../AvailableTechnoSection/Reactjs';
import { TanstackLogo } from '../AvailableTechnoSection/Tanstack';
import { ViteLogo } from '../AvailableTechnoSection/Vitejs';
import { VuejsLogo } from '../AvailableTechnoSection/Vuejs';

// import { SolidLogo } from '../AvailableTechnoSection/Solid';
// import { AngularLogo } from '../AvailableTechnoSection/Angular';
// import { SolidLogo } from '../AvailableTechnoSection/Solid';
// import { SvelteLogo } from '../AvailableTechnoSection/Svelte';

// Animated Technology logos
const logos = [
  { Logo: ReactLogo, key: 'react', route: PagesRoutes.Doc_Environment_CRA },
  {
    Logo: NextJSLogo,
    key: 'nextjs',
    route: PagesRoutes.Doc_Environment_NextJS_15,
  },
  {
    Logo: PreactLogo,
    key: 'preact',
    route: PagesRoutes.Doc_Environment_ViteAndPreact,
  },
  {
    Logo: VuejsLogo,
    key: 'vue',
    route: PagesRoutes.Doc_Environment_ViteAndVue,
  },
  {
    Logo: NuxtLogo,
    key: 'nuxt',
    route: PagesRoutes.Doc_Environment_NuxtAndVue,
  },
  {
    Logo: ViteLogo,
    key: 'vite',
    route: PagesRoutes.Doc_Environment_ViteAndReact,
  },
  { Logo: AstroLogo, key: 'astro', route: PagesRoutes.Doc_Environment_Astro },
  {
    Logo: TanstackLogo,
    key: 'tanstack',
    route: PagesRoutes.Doc_Environment_Tanstack,
  },
  {
    Logo: ExpressLogo,
    key: 'express',
    route: PagesRoutes.Doc_Environment_Express,
  },
  {
    Logo: NestJSLogo,
    key: 'nestjs',
    route: PagesRoutes.Doc_Environment_NestJS,
  },
  {
    Logo: LynxLogo,
    key: 'lynx',
    route: PagesRoutes.Doc_Intlayer_with_Lynx_and_React,
  },
  // { Logo: AngularLogo, key: 'angular', route: PagesRoutes.Doc_Environment_Angular },
  // { Logo: SvelteLogo, key: 'svelte', route: PagesRoutes.Doc_Environment_ViteAndSvelte },
  // { Logo: SolidLogo, key: 'solid', route: PagesRoutes.Doc_Environment_ViteAndSolid },
];

const LogoItem: FC<{
  Logo: FC<SVGProps<SVGSVGElement>>;
  label: string;
  route: string;
  className?: string;
}> = ({ Logo, route, label, className }) => (
  <Link href={route} label={label} color="custom">
    <Logo
      className={cn(
        'size-12 flex-shrink-0 opacity-70 transition-opacity duration-200 hover:opacity-100 sm:size-14 md:size-16 lg:size-18',
        className
      )}
    />
  </Link>
);

export const TechLogos: FC = () => (
  <div className="mt-6 w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_170px,_black_calc(100%-170px),transparent_100%)]">
    <div className="horizontal-loop-4 inline-flex items-center whitespace-nowrap">
      {logos.map((logo, index) => (
        <div key={`${logo.key}-${index}-1`} className="mx-6 sm:mx-12 md:mx-16">
          <LogoItem {...logo} label={logo.key} key={`${logo.key}-${index}-1`} />
        </div>
      ))}
      {logos.map((logo, index) => (
        <div key={`${logo.key}-${index}-1`} className="mx-6 sm:mx-12 md:mx-16">
          <LogoItem {...logo} label={logo.key} key={`${logo.key}-${index}-2`} />
        </div>
      ))}
    </div>
  </div>
);
