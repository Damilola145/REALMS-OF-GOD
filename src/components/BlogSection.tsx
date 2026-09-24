import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  ArrowRight,
  BookOpen,
  Sparkles
} from 'lucide-react';
import { BlogPost } from '../types';

interface BlogSectionProps {
  posts: BlogPost[];
  onSelectPost: (post: BlogPost) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({
  posts,
  onSelectPost,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Ministry Impact', 'Widow Care', 'Biblical Stewardship'];

  const filteredPosts = posts.filter((p) => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section id="blog" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1E37] tracking-tight">
              Dispatches from the Mission Field
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light">
              Field reports from our regional coordinators, biblical teachings on honor, and transparent audit briefings on pastoral benevolence.
            </p>
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#F6864C] text-white shadow-md'
                    : 'bg-white/80 text-[#0B1E37] border border-slate-200 hover:text-[#0B1E37] hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => onSelectPost(post)}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#F6864C] transition-all duration-300 flex flex-col overflow-hidden group cursor-pointer"
            >
              {/* Cover Image */}
              <div className="relative h-48 w-full overflow-hidden bg-stone-100">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-[#0B1E37]/90 backdrop-blur-md text-[#F6864C] text-[10px] font-mono font-bold border border-[#F6864C]/40">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-slate-600 font-mono">
                    <span>{post.date}</span>
                    <span>&bull;</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#0B1E37] group-hover:text-slate-600 transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-light">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      referrerPolicy="no-referrer"
                      className="w-6 h-6 rounded-full object-cover border border-slate-200"
                    />
                    <span className="text-[11px] text-[#0B1E37] font-semibold">{post.author.name}</span>
                  </div>

                  <span className="text-[11px] font-bold text-slate-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>Read report</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
