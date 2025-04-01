
import React from 'react';
import { ContentItem } from '@/types/memberTypes';
import ContentCard from './ContentCard';

interface ContentListProps {
  items: ContentItem[];
}

const ContentList = ({ items }: ContentListProps) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map(content => (
        <ContentCard key={content.id} content={content} />
      ))}
    </div>
  );
};

export default ContentList;
