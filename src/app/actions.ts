"use server";

import { db } from '@/db/index';
import { contactSubmissions } from '@/db/schema';

export async function submitContactForm(formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const message = formData.get('message') as string;

    if (!name || (!email && !phone)) {
      return { success: false, message: 'Please fill in name and either email or phone.' };
    }

    await db.insert(contactSubmissions).values({
      name,
      email,
      phone,
      message,
      source: 'contact_form'
    });

    return { success: true, message: 'Your message has been sent successfully!' };
  } catch (error) {
    console.error('Contact form submission error:', error);
    return { success: false, message: 'There was an error sending your message. Please try again.' };
  }
}

export async function submitQuickBrief(data: any) {
  try {
    if (!data.name || !data.projectType) {
      return { success: false, message: 'Missing required fields.' };
    }

    await db.insert(contactSubmissions).values({
      name: data.name,
      email: data.email || null,
      projectType: data.projectType,
      budget: data.budget || null,
      timeline: data.timeline || null,
      message: data.details || null,
      source: `quick_brief_${data.source || 'email'}`
    });

    return { success: true, message: 'Brief submitted successfully!' };
  } catch (error) {
    console.error('Quick brief submission error:', error);
    return { success: false, message: 'Error submitting brief.' };
  }
}
