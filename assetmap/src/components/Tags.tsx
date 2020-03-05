import * as React from 'react';
interface TagsProps {
  getTagColor: (tagGroup: string, id: number) => string,
  getTagName: (tagGroup: string, id: number) => string,
  appendToSelectedTags: (tag: number) => void,
  setSelectedPost: (post: number) => void,
  tags: Array<number>
  selectedTags: any
}

export class Tags extends React.Component<TagsProps> {
  constructor(props: TagsProps) {
    super(props);

  }

  isTagSelected(id: number): boolean {
    let alreadySelected = false;
    if (this.props.selectedTags !== null && this.props.selectedTags !== []) {     
      this.props.selectedTags.forEach((tag: any) => {
        if (tag.id === id) {
          alreadySelected = true;
        }
      })
    }    
    return alreadySelected;
  }

  renderTag(tagGroup:string, id: number) {
    if (id) {
      const tagName = this.props.getTagName(tagGroup, id);
      const tagColor = this.props.getTagColor(tagGroup, id);
      const backgroundColor = this.getBackgroundColor(tagColor);
      const border = '2px solid ' + tagColor;
      const tagStyle = {
        '--tag-color': tagColor,
        backgroundColor: 'none !important',
        border,
      }
      if (this.isTagSelected(id)) {
        const property = 'backgroundColor';
        tagStyle[property] = backgroundColor;
      }
      const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        event.preventDefault();
        this.handleTagClick(id);
      }
      const classes = "tag d-inline-block p-1 my-1 mr-3";
      return (
        <div key={id} className={classes} style={tagStyle} onClick={handleClick}>
            #{tagName}
        </div>
      )
    } else {
      return;
    }
  }

  handleTagClick(tagId: number) {
    console.log(tagId + ' clicked:');
    this.props.appendToSelectedTags(tagId);
  }

  getBackgroundColor(color: string) {
    if (color.length === 7) {
      const r = parseInt(color.substring(1, 3), 16);
      const g = parseInt(color.substring(3, 5), 16);
      const b = parseInt(color.substring(5, 7), 16);
      return 'rgba(' + r + ',' + g + ',' + b + ',' + '0.25)';
    } else {
      return 'rgba(0,0,0,0)';
    }
  }

  public render() {
    return (
      <div>
        {(this.props.tags.length > 0) && this.props.tags.map((id) => this.renderTag('tags', id))}
      </div>
    )
  }
}