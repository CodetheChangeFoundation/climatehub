import * as React from 'react';
interface TagsProps {
  getTagColor: (id: number) => string,
  getTagName: (id: number) => string,
  appendToSelectedTags: (tag: number) => Promise<void>,
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

  renderTag(id: number): any {
    if (id) {
      const tagName = this.props.getTagName(id);
      const tagColor = this.props.getTagColor(id);
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

  handleTagClick(tagId: number): void {
    this.props.appendToSelectedTags(tagId);
  }

  getBackgroundColor(color: string): string {
    if (color.length === 7) {
      return color + '44';
    } else {
      return '#00000044';
    }
  }

  public render() {
    return (
      <div>
        {(this.props.tags.length > 0) && this.props.tags.map((id) => this.renderTag(id))}
      </div>
    )
  }
}