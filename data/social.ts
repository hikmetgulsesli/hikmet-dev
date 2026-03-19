/**
 * Social links and contact data
 * Hikmet Gulsesli Developer Portal
 */

export interface SocialLink {
  id: string;
  name: string;
  handle: string;
  url: string;
  icon: string;
  description: string;
  followers?: number;
}

export interface ContactInfo {
  email: string;
  domain: string;
  location: string;
  timezone: string;
  availability: string;
}

export const socialLinks: SocialLink[] = [
  {
    id: 'github',
    name: 'GitHub',
    handle: '@hikmetgulsesli',
    url: 'https://github.com/hikmetgulsesli',
    icon: 'github',
    description: 'Aç\u0131k kaynak projeler ve kod örnekleri',
    followers: 456,
  },
  {
    id: 'discord',
    name: 'Discord',
    handle: 'SetroxHQ',
    url: 'https://discord.gg/setrox',
    icon: 'discord',
    description: 'Topluluk sohbeti ve destek kanal\u0131',
    followers: 1289,
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    handle: 'Hikmet Gulsesli',
    url: 'https://linkedin.com/in/hikmetgulsesli',
    icon: 'linkedin',
    description: 'Profesyonel profil ve ba\u011Flant\u0131lar',
    followers: 892,
  },
  {
    id: 'twitter',
    name: 'Twitter',
    handle: '@hikmetgulsesli',
    url: 'https://twitter.com/hikmetgulsesli',
    icon: 'twitter',
    description: 'Teknik düşünceler ve güncellemeler',
    followers: 2341,
  },
];

export const contactInfo: ContactInfo = {
  email: 'hikmet@setrox.com.tr',
  domain: 'setrox.com.tr',
  location: '\u0130stanbul, Türkiye',
  timezone: 'UTC+3 (Europe/Istanbul)',
  availability: 'Pazartesi - Cuma, 09:00 - 18:00',
};

export const getSocialLinkById = (id: string): SocialLink | undefined => {
  return socialLinks.find((link) => link.id === id);
};

export const getSocialLinksByIcon = (iconName: string): SocialLink[] => {
  return socialLinks.filter((link) => link.icon === iconName);
};
