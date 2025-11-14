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
      className="group block rounded-xl bg-robinhood-gray p-5 transition-all hover:bg-robinhood-light-gray hover:scale-[1.01] animate-fade-in"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="font-medium text-robinhood-green">{article.source}</span>
          <span>•</span>
          <span>{getTimeAgo(article.publishedAt)}</span>
        </div>
        <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-robinhood-green transition-colors" />
      </div>

      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-robinhood-green transition-colors line-clamp-2">
        {article.title}
      </h3>

      {article.description && (
        <p className="text-sm text-muted-foreground line-clamp-3">
          {article.description}
        </p>
      )}

      {article.category && (
        <div className="mt-3">
          <span className="inline-block px-2 py-1 text-xs font-medium bg-robinhood-light-gray text-robinhood-green rounded">
            {article.category}
          </span>
        </div>
      )}
    </a>
  );
}
