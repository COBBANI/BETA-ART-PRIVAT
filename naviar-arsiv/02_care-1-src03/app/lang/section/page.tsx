import CareApp from '@/components/care-app';
import { isLang, t, type Key } from '@/lib/content';
import { notFound } from 'next/navigation';
const titles:Record<string,Key>={services:'services',booking:'bookingTitle',family:'familyTitle',safety:'safetyTitle',helper:'helperTitle',jobs:'jobsTitle',privacy:'privacyTitle',terms:'terms',contact:'contact',account:'account',operations:'operations'};
export async function generateMetadata({params}:{params:Promise<{lang:string,section:string}>}){const {lang,section}=await params;if(!isLang(lang)||!titles[section])return{};return {title:`${t(lang,titles[section])} | NAVIAR CARE`,alternates:{languages:{nb:`/nb/${section}`,en:`/en/${section}`,tr:`/tr/${section}`}}};}
export default async function Page({params}:{params:Promise<{lang:string,section:string}>}){const {lang,section}=await params;if(!isLang(lang)||!titles[section])notFound();return <CareApp lang={lang} section={section}/>;}
