export const formatNumber = (num: number): string => {
  if (num === undefined || num === null) return '0';
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toLocaleString();
};

export const formatCurrency = (num: number, currency: string = 'USD'): string => {
  const symbol = currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '$';
  return `${symbol}${num.toLocaleString()}`;
};

export const formatDate = (dateStr: string): string => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const getPlatformMeta = (platform: string) => {
  const p = platform.toLowerCase();
  if (p.includes('instagram')) {
    return {
      name: 'Instagram',
      color: '#E1306C',
      bgLight: 'rgba(225, 48, 108, 0.1)',
      borderColor: 'rgba(225, 48, 108, 0.3)',
      icon: 'instagram',
    };
  }
  if (p.includes('tiktok')) {
    return {
      name: 'TikTok',
      color: '#00F2FE',
      bgLight: 'rgba(0, 242, 254, 0.1)',
      borderColor: 'rgba(0, 242, 254, 0.3)',
      icon: 'tiktok',
    };
  }
  if (p.includes('spotify')) {
    return {
      name: 'Spotify',
      color: '#1DB954',
      bgLight: 'rgba(29, 185, 84, 0.1)',
      borderColor: 'rgba(29, 185, 84, 0.3)',
      icon: 'spotify',
    };
  }
  if (p.includes('youtube')) {
    return {
      name: 'YouTube',
      color: '#FF0000',
      bgLight: 'rgba(255, 0, 0, 0.1)',
      borderColor: 'rgba(255, 0, 0, 0.3)',
      icon: 'youtube',
    };
  }
  if (p.includes('apple')) {
    return {
      name: 'Apple Music',
      color: '#FC3C44',
      bgLight: 'rgba(252, 60, 68, 0.1)',
      borderColor: 'rgba(252, 60, 68, 0.3)',
      icon: 'apple',
    };
  }
  if (p.includes('facebook')) {
    return {
      name: 'Facebook',
      color: '#1877F2',
      bgLight: 'rgba(24, 119, 242, 0.1)',
      borderColor: 'rgba(24, 119, 242, 0.3)',
      icon: 'facebook',
    };
  }
  if (p.includes('trend')) {
    return {
      name: 'Trends Radar',
      color: '#8B5CF6',
      bgLight: 'rgba(139, 92, 246, 0.1)',
      borderColor: 'rgba(139, 92, 246, 0.3)',
      icon: 'trends',
    };
  }
  return {
    name: platform,
    color: '#38BDF8',
    bgLight: 'rgba(56, 189, 248, 0.1)',
    borderColor: 'rgba(56, 189, 248, 0.3)',
    icon: 'globe',
  };
};
