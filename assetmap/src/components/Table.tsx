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
      website: string,
    }
  },
  getTagName: (tagGroup: string, id: number) => string,
  getTagColor: (tagGroup: string, id: number) => string,
  handlePostQuery: (postType: string, postIds: Array<number>) => void,
  setSelectedPost: (postId: number) => void,
  appendToSelectedTags: (tag: any) => void,
  postType: string,
  selectedPost: number,
  selectedTags: any
}
class Table extends React.Component<MyProps> {
  constructor(props: MyProps) {
    super(props);
  }

  // rowId = postId
  handleRowClick(rowId: number) {
    const { selectedPost } = this.props;
    if (selectedPost === rowId) {
      this.props.setSelectedPost(0);
    } else {
      this.props.setSelectedPost(rowId);
    }
  }

  renderItems() {
    const { data, getTagName, getTagColor, handlePostQuery: handlePostQuery, postType, appendToSelectedTags, selectedPost, selectedTags } = this.props;
    const itemRows: Array<any> = []

    if (Object.values(data).length > 0) {
      Object.values(data).map((line, index) => {
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
                  selectedTags={selectedTags} 
                  appendToSelectedTags={appendToSelectedTags}
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
      <table className="table table-hover mb-0 w-100">
        <thead>
          <tr>
            <th scope="col" className="position-sticky bg-light border-0 z-index-99">Name</th>
            <th scope="col" className="position-sticky bg-light border-0 z-index-99">Tags</th>
            <th scope="col" className="position-sticky bg-light border-0 z-index-99" style={{width: '50px'}}/>
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