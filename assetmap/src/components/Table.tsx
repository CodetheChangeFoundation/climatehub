import * as React from 'react';
import { RowInfo } from './RowInfo';
import { Tags } from './Tags';

interface MyProps {
  data: { 
    wpid: {
      description: string,
      director: Array<number>,
      email: string,
      groups: Array<number>,
      id: number,
      individuals: Array<number>,
      name: string,
      phone: string,
      position: string,
      projects: Array<number>,
      tags: Array<number>,
      tagsCount: number,
      website: string,
    }
  },
  getTagName: (id: number) => string,
  getTagColor: (id: number) => string,
  handlePostQuery: (postType: string, postIds: Array<number>) => Promise<void>,
  setSelectedPost: (postId: number) => Promise<void>,
  getSelectedPost: () => number,
  appendToSelectedTags: (tag: any) => Promise<void>,
  postType: string,
  selectedTags: any,
}
class Table extends React.Component<MyProps> {
  constructor(props: MyProps) {
    super(props);
  }

  componentDidMount() {
    const postIds = Object.keys(this.props.data);
    if (postIds.length > 0 && Number(postIds[0])){
      this.handleRowClick(Number(postIds[0]));
    }
  }
  // rowId = postId
  handleRowClick(rowId: number): void {
    const selectedPost = this.props.getSelectedPost();
      if (selectedPost === rowId) {
      this.props.setSelectedPost(0);
    } else {
      this.props.setSelectedPost(rowId);
    }
  }

  renderItems() {
    const { data, getTagName, getTagColor, handlePostQuery, postType, appendToSelectedTags, selectedTags } = this.props;
    const selectedPost = this.props.getSelectedPost();
    const itemRows: Array<any> = []

    if (Object.values(data).length > 0) {
      const sortedPosts = Object.values(data);
      if (sortedPosts[0].tagsCount) {
        sortedPosts.sort((a: any, b: any) => {
          return b.tagsCount - a.tagsCount;
        });
      }
      sortedPosts.map((line, index) => {
        const clickCallback = () => this.handleRowClick(line.id);
        itemRows.push(
          <React.Fragment key={index}>
            <tr key={"row-data-" + index} onClick={clickCallback} className="row-data">
              <td className="text-wrap align-middle">{line.name}</td>
              <td className="text-wrap">
                {<Tags 
                  getTagName={getTagName} 
                  getTagColor={getTagColor} 
                  tags={line.tags} 
                  appendToSelectedTags={appendToSelectedTags}
                  selectedTags={selectedTags} 
                  key={selectedTags}
                  textScaleFactor="1rem"
                  tagClasses="tag d-inline-block p-1 my-1 mr-3"
                />}
              </td>
              <td className="align-middle">
                <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className={selectedPost === line.id ? 'down-arrow active' : 'down-arrow'}>
                  <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z" />
                </svg>
              </td>
            </tr>
            {selectedPost === line.id &&
              <tr key={"row-expandable-" + index} className="row-expandable">
                <RowInfo 
                  postType={postType}
                  data={line}
                  handlePostQuery={handlePostQuery}
                />
              </tr>
            }
          </React.Fragment>
        )
      })
    } else {
      itemRows.push(<tr key={0}><td colSpan={2}>No results found.</td></tr>)
    }

    return itemRows;
  }

  public render() {
    const allItemRows: Array<any> = this.renderItems();

    return (
      <table className="table table-hover table-borderless mb-0 w-100">
        <thead>
          <tr>
            <th scope="col" className="position-sticky bg-white text-muted border-0 z-index-99">Name</th>
            <th scope="col" className="position-sticky bg-white text-muted border-0 z-index-99">Tags</th>
            <th scope="col" className="position-sticky bg-white border-0 z-index-99" style={{width: '50px'}}/>
          </tr>
        </thead>
        <tbody>
          {allItemRows}
        </tbody>
      </table>
    )
  }
}

export default Table;