import * as React from 'react';

interface TagsProps {
  tags: Array<Array<{ post_type: string, post_title: string }>>
}

export const Tags = ({ tags }: TagsProps) => 
<div>
  {tags.map((tag) => 
    tag.map((t, index) => {
      let classes = t.post_type === "tag_a" ? "tag-a" : t.post_type === "tag_b" ? "tag-b" : "tag-c"
      classes += " border d-inline p-1 py-2 mr-3";
      return (
        <div key={index} className={classes}>
          #{t.post_title}
        </div>
      )
    })
  )}
</div>