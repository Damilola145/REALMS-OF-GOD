export interface ShareContent {
  title: string;
  text: string;
  url?: string;
}

export function getShareUrls(content: ShareContent) {
  const currentUrl = typeof window !== 'undefined' ? (content.url || window.location.href) : 'https://therealmofgodministry.org/';
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedText = encodeURIComponent(`${content.text} \n\n${currentUrl}`);
  const encodedTitle = encodeURIComponent(content.title);

  return {
    whatsapp: `https://api.whatsapp.com/send?text=${encodedText}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedText}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodeURIComponent(content.text)}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedText}`
  };
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    }
  } catch (err) {
    console.error('Failed to copy to clipboard', err);
    return false;
  }
}
