import * as React from 'react';

interface TagsProps {
  getTagName: (tagGroup: string, id: number) => string,
  tag_a: Array<number>
  tag_b: Array<number>
  tag_c: Array<number>
}

export const Tags = ({ getTagName, tag_a, tag_b, tag_c }: TagsProps) => {
  
  function renderTag(tagGroup:string, id: number) {
    const tagName = getTagName(tagGroup, id);
    const classes = tagGroup + " tag border d-inline-block p-1 my-1 mr-3";
    return (
      <div key={id} className={classes}>
        #{tagName}
      </div>
    )
  }

  return (
    <div>
      {tag_a.map((id) => renderTag('tag_a', id))}
      {tag_b.map((id) => renderTag('tag_b', id))}
      {tag_c.map((id) => renderTag('tag_c', id))}
    </div>
  )
}