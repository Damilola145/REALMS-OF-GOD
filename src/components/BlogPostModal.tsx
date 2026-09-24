import React, { useState } from 'react';
import { 
  X, 
  Clock, 
  Calendar, 
  Share2, 
  Copy, 
  Check, 
  BookOpen, 
  Heart,
  MessageCircle
} from 'lucide-react';
import { BlogPost } from '../types';
import { getShareUrls, copyToClipboard } from '../utils/socialShare';

interface BlogPostModalProps {
  post: BlogPost | null;
  onClose: () => void;
  onOpenDonate: () => void;
}

export const BlogPostModal: React.FC<BlogPostModalProps> = ({
  post,
  onClose,
  onOpenDonate,
}) => {
  const [copied, setCopied] = useState(false);

  if (!post) return null;

  const shareUrls = getShareUrls({
    title: `${post.title} - Realms of God Ministry`,
    text: `${post.title}. Read full field report on Realms of God Ministry platform:`,
  });

  const handleCopy = async () => {
    const success = await copyToClipboard(
      `"${post.title}" - Read this inspiring field update from Realms of God Ministry: https://realmsofgodministry.org/`
    );
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 lg:p-6 animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <span className="px-2.5 py-0.5 rounded-full bg-white text-[#0B1E37] text-[10px] font-mono border border-[#F6864C]">
            {post.category}
          </span>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-600 hover:text-[#0B1E37] hover:bg-slate-200/50 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Article Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-5 bg-white/70">
          
          {/* Title & Metadata */}
          <div className="space-y-2">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B1E37] leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-600 pt-1 font-mono">
              <div className="flex items-center gap-2">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  referrerPolicy="no-referrer"
                  className="w-5 h-5 rounded-full object-cover border border-slate-200"
                />
                <span className="text-[#0B1E37] font-sans font-bold">{post.author.name}</span>
                <span className="text-slate-500">({post.author.role})</span>
              </div>
              <span>&bull;</span>
              <span>{post.date}</span>
              <span>&bull;</span>
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Cover Image */}
          <div className="rounded-xl overflow-hidden max-h-72 w-full bg-stone-100 border border-slate-200">
            <img
              src={post.coverImage}
              alt={post.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Scripture Anchor */}
          {post.scriptureAnchor && (
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-[#0B1E37] font-serif italic text-xs flex items-start gap-2.5">
              <BookOpen className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
              <span>{post.scriptureAnchor}</span>
            </div>
          )}

          {/* Full Text */}
          <div className="text-xs sm:text-sm text-[#0B1E37] space-y-3 leading-relaxed font-light">
            {post.content.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-200">
            {post.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 text-[10px] font-mono border border-slate-200"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Share Article Bar */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span className="text-xs text-[#0B1E37] font-mono font-medium">Share this field update:</span>
            <div className="flex items-center gap-2">
              <a
                href={shareUrls.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-lg bg-[#F6864C] hover:bg-[#0B1E37] text-white text-[11px] font-medium flex items-center gap-1"
              >
                <MessageCircle className="w-3 h-3" />
                <span>WhatsApp</span>
              </a>
              <button
                onClick={handleCopy}
                className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-200/40 text-[#0B1E37] border border-slate-200 text-[11px] font-mono flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check className="w-3 h-3 text-slate-600" /> : <Copy className="w-3 h-3 text-slate-600" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Action Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-[#0B1E37] hover:bg-slate-200/40 cursor-pointer"
          >
            Close
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenDonate();
            }}
            className="px-5 py-2.5 rounded-xl bg-[#F6864C] hover:bg-[#0B1E37] text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-all cursor-pointer border border-[#F6864C]/50"
          >
            <Heart className="w-3.5 h-3.5 fill-white text-[#F6864C]" />
            <span>Support This Work</span>
          </button>
        </div>

      </div>
    </div>
  );
};
