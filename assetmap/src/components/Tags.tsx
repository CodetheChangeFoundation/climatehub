import * as React from 'react';

interface TagsProps {
  getTagColor: (tagGroup: string, id: number) => string,
  getTagName: (tagGroup: string, id: number) => string,

  tags: Array<number>
}

export const Tags = ({ getTagName, getTagColor, tags}: TagsProps) => {

  function renderTag(tagGroup:string, id: number) {
    if (id) {
      const tagName = getTagName(tagGroup, id);
      const tagColor = getTagColor(tagGroup, id);
      const backgroundColor = getBackgroundColor(tagColor);
      const border = '2px solid ' + tagColor;
      const tagStyle = {
        backgroundColor,
        border
      }
      const classes = "tag d-inline-block p-1 my-1 mr-3";
      return (
        <div key={id} className={classes} style={tagStyle}>
          #{tagName}
        </div>
      )
    } else {
      return;
    }
  }

  function getBackgroundColor(color: string) {
    if (color.length === 7) {
      const r = parseInt(color.substring(1, 3), 16);
      const g = parseInt(color.substring(3, 5), 16);
      const b = parseInt(color.substring(5, 7), 16);
      return 'rgba(' + r + ',' + g + ',' + b + ',' + '0.25)';
    } else {
      return 'rgba(0,0,0,0)';
    }
  }

  return (
    <div>
      {tags.length > 0 && tags.map((id) => renderTag('tags', id))}
    </div>
  )
}