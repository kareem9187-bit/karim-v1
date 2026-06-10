'use server';

import { db } from '@/db';
import { contactInfo, settings, socialLinks } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { asc } from '@/lib/db-order';
import { revalidatePath } from 'next/cache';
import {
  DEFAULT_QUICK_BRIEF_CONFIG,
  normalizeQuickBriefConfig,
  parseQuickBriefOptionsText,
} from '@/lib/quick-brief';

const QUICK_BRIEF_SETTINGS_KEY = 'quick_brief_config';

export async function getContactInfo() {
  const [data] = await db.select().from(contactInfo).limit(1);
  return data ?? null;
}

export async function updateContactInfo(formData: FormData) {
  const data = {
    whatsapp: (formData.get('whatsapp') as string) || null,
    email: (formData.get('email') as string) || null,
    phone: (formData.get('phone') as string) || null,
    tagline: (formData.get('tagline') as string) || null,
    taglineAr: (formData.get('taglineAr') as string) || null,
    updatedAt: new Date(),
  };

  await db.insert(contactInfo).values({ id: 'main', ...data })
    .onConflictDoUpdate({ target: contactInfo.id, set: data });

  revalidatePath('/');
  revalidatePath('/contact');
  revalidatePath('/admin/contact');
  return { success: true };
}

export async function getQuickBriefConfig() {
  const [row] = await db
    .select({ value: settings.value })
    .from(settings)
    .where(eq(settings.key, QUICK_BRIEF_SETTINGS_KEY))
    .limit(1);

  return normalizeQuickBriefConfig(row?.value ?? DEFAULT_QUICK_BRIEF_CONFIG);
}

export async function updateQuickBriefConfig(formData: FormData) {
  const data = normalizeQuickBriefConfig({
    eyebrow: (formData.get('eyebrow') as string) || DEFAULT_QUICK_BRIEF_CONFIG.eyebrow,
    eyebrowAr: (formData.get('eyebrowAr') as string) || DEFAULT_QUICK_BRIEF_CONFIG.eyebrowAr,
    title: (formData.get('title') as string) || DEFAULT_QUICK_BRIEF_CONFIG.title,
    titleAr: (formData.get('titleAr') as string) || DEFAULT_QUICK_BRIEF_CONFIG.titleAr,
    subtitle: (formData.get('subtitle') as string) || DEFAULT_QUICK_BRIEF_CONFIG.subtitle,
    subtitleAr: (formData.get('subtitleAr') as string) || DEFAULT_QUICK_BRIEF_CONFIG.subtitleAr,
    nameLabel: (formData.get('nameLabel') as string) || DEFAULT_QUICK_BRIEF_CONFIG.nameLabel,
    nameLabelAr: (formData.get('nameLabelAr') as string) || DEFAULT_QUICK_BRIEF_CONFIG.nameLabelAr,
    namePlaceholder: (formData.get('namePlaceholder') as string) || DEFAULT_QUICK_BRIEF_CONFIG.namePlaceholder,
    namePlaceholderAr: (formData.get('namePlaceholderAr') as string) || DEFAULT_QUICK_BRIEF_CONFIG.namePlaceholderAr,
    projectTypeLabel: (formData.get('projectTypeLabel') as string) || DEFAULT_QUICK_BRIEF_CONFIG.projectTypeLabel,
    projectTypeLabelAr: (formData.get('projectTypeLabelAr') as string) || DEFAULT_QUICK_BRIEF_CONFIG.projectTypeLabelAr,
    budgetLabel: (formData.get('budgetLabel') as string) || DEFAULT_QUICK_BRIEF_CONFIG.budgetLabel,
    budgetLabelAr: (formData.get('budgetLabelAr') as string) || DEFAULT_QUICK_BRIEF_CONFIG.budgetLabelAr,
    budgetHelper: (formData.get('budgetHelper') as string) || DEFAULT_QUICK_BRIEF_CONFIG.budgetHelper,
    budgetHelperAr: (formData.get('budgetHelperAr') as string) || DEFAULT_QUICK_BRIEF_CONFIG.budgetHelperAr,
    timelineLabel: (formData.get('timelineLabel') as string) || DEFAULT_QUICK_BRIEF_CONFIG.timelineLabel,
    timelineLabelAr: (formData.get('timelineLabelAr') as string) || DEFAULT_QUICK_BRIEF_CONFIG.timelineLabelAr,
    detailsLabel: (formData.get('detailsLabel') as string) || DEFAULT_QUICK_BRIEF_CONFIG.detailsLabel,
    detailsLabelAr: (formData.get('detailsLabelAr') as string) || DEFAULT_QUICK_BRIEF_CONFIG.detailsLabelAr,
    detailsPlaceholder: (formData.get('detailsPlaceholder') as string) || DEFAULT_QUICK_BRIEF_CONFIG.detailsPlaceholder,
    detailsPlaceholderAr: (formData.get('detailsPlaceholderAr') as string) || DEFAULT_QUICK_BRIEF_CONFIG.detailsPlaceholderAr,
    connectLabel: (formData.get('connectLabel') as string) || DEFAULT_QUICK_BRIEF_CONFIG.connectLabel,
    connectLabelAr: (formData.get('connectLabelAr') as string) || DEFAULT_QUICK_BRIEF_CONFIG.connectLabelAr,
    summaryTitle: (formData.get('summaryTitle') as string) || DEFAULT_QUICK_BRIEF_CONFIG.summaryTitle,
    summaryTitleAr: (formData.get('summaryTitleAr') as string) || DEFAULT_QUICK_BRIEF_CONFIG.summaryTitleAr,
    projectTypes: parseQuickBriefOptionsText(formData.get('projectTypes'), true),
    budgets: parseQuickBriefOptionsText(formData.get('budgets'), false),
    timelines: parseQuickBriefOptionsText(formData.get('timelines'), true),
  });

  await db.insert(settings).values({
    key: QUICK_BRIEF_SETTINGS_KEY,
    value: data,
    updatedAt: new Date(),
  }).onConflictDoUpdate({
    target: settings.key,
    set: { value: data, updatedAt: new Date() },
  });

  revalidatePath('/');
  revalidatePath('/admin/contact');
  return { success: true };
}

export async function getSocialLinks() {
  return db.select().from(socialLinks)
    .where(eq(socialLinks.active, true))
    .orderBy(asc(socialLinks.order));
}

export async function getAllSocialLinks() {
  return db.select().from(socialLinks).orderBy(asc(socialLinks.order));
}

export async function upsertSocialLink(formData: FormData) {
  const id = formData.get('id') as string | null;
  const data = {
    order: parseInt(formData.get('order') as string) || 0,
    platform: formData.get('platform') as string,
    url: formData.get('url') as string,
    label: (formData.get('label') as string) || null,
    icon: (formData.get('icon') as string) || null,
    active: formData.get('active') === 'true',
  };

  if (id) {
    await db.update(socialLinks).set(data).where(eq(socialLinks.id, id));
  } else {
    await db.insert(socialLinks).values(data);
  }

  revalidatePath('/');
  revalidatePath('/contact');
  revalidatePath('/admin/contact');
  return { success: true };
}

export async function deleteSocialLink(id: string) {
  await db.delete(socialLinks).where(eq(socialLinks.id, id));
  revalidatePath('/');
  revalidatePath('/contact');
  revalidatePath('/admin/contact');
  return { success: true };
}
