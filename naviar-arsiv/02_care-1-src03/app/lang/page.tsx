import CareApp from '@/components/care-app';
import { isLang, t } from '@/lib/content';
import { notFound } from 'next/navigation';
export async function generateMetadata({params}:{params:Promise<{lang:string}>}){ const {lang}=await params; if(!isLang(lang))return{}; return {title:`NAVIAR CARE — ${t(lang,'heroTitle')}`,description:t(lang,'heroBody'),alternates:{languages:{'nb':'/nb','en':'/en','tr':'/tr','x-default':'/nb'}}}; }
export default async function Page({params}:{params:Promise<{lang:string}>}){const {lang}=await params;if(!isLang(lang))notFound();return <CareApp lang={lang} section="home"/>;}
