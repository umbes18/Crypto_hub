'use client';

import { NewsArticle } from '@/types';
import { getTimeAgo } from '@/lib/utils';
import { ExternalLink } from 'lucide-react';

interface NewsCardProps {
  article: NewsArticle;
}

export default function NewsCard({ article }: NewsCardProps) {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-rh-surface rounded-lg p-5 hover:bg-rh-border transition-colors"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-xs text-rh-text-secondary">
          <span className="font-medium text-rh-green">{article.source}</span>
          <span>·</span>
          <span>{getTimeAgo(article.publishedAt)}</span>
        </div>
        <ExternalLink className="h-4 w-4 text-rh-text-secondary flex-shrink-0" />
      </div>

      {/* Title */}
      <h3 className="text-base font-semibold text-white mb-2 line-clamp-2 leading-snug">
        {article.title}
      </h3>

      {/* Description */}
      {article.description && (
        <p className="text-sm text-rh-text-secondary line-clamp-2 leading-relaxed">
          {article.description}
        </p>
      )}

      {/* Category */}
      {article.category && (
        <div className="mt-3">
          <span className="inline-block px-2 py-1 text-xs font-medium bg-black text-rh-green rounded border border-rh-border">
            {article.category}
          </span>
        </div>
      )}
    </a>
  );
}
