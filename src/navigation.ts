import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'How It Works',
      href: getPermalink('/how-it-works'),
    },
    {
      text: 'The Pilot',
      href: getPermalink('/pilot'),
    },
    {
      text: 'ROI Calculator',
      href: getPermalink('/roi'),
    },
    {
      text: 'About',
      href: getPermalink('/about'),
    },
    {
      text: 'Blog',
      href: getBlogPermalink(),
    },
  ],
  actions: [{ text: 'Book a Call', href: 'https://cal.com/gautham-8bdvdx/30min' }],
};

export const footerData = {
  links: [
    {
      title: 'Product',
      links: [
        { text: 'How It Works', href: getPermalink('/how-it-works') },
        { text: 'The Pilot', href: getPermalink('/pilot') },
        { text: 'ROI Calculator', href: getPermalink('/roi') },
      ],
    },
    {
      title: 'Company',
      links: [
        { text: 'About', href: getPermalink('/about') },
        { text: 'Blog', href: getBlogPermalink() },
        { text: 'Contact', href: getPermalink('/contact') },
      ],
    },
    {
      title: 'Legal',
      links: [
        { text: 'Privacy', href: getPermalink('/privacy') },
        { text: 'Terms', href: getPermalink('/terms') },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Privacy', href: getPermalink('/privacy') },
    { text: 'Terms', href: getPermalink('/terms') },
  ],
  socialLinks: [],
  footNote: `
    <div class="flex flex-col gap-1">
      <div>Email: <a href="mailto:support@simplescheduleai.com" class="text-primary hover:underline">support@simplescheduleai.com</a></div>
      <div>© ${new Date().getFullYear()} SimpleScheduleAI. All rights reserved.</div>
    </div>
  `,
};
