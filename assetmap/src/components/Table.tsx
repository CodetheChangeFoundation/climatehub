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
  handleFilterIds: (postType: string, filterIds: Array<number>) => void,
  postType: string
}

interface MyState {
  expandedRow: number
};

class Table extends React.Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
    this.state = {
      expandedRow: -1
    }
  }

  // rowId = postId
  handleRowClick(rowId: number) {
    const { expandedRow } = this.state;
    if (expandedRow === rowId) {
      this.setState({ expandedRow: -1 });
    } else {
      this.setState({ expandedRow: rowId });
    }
  }

  renderItems() {
    const { data, getTagName, getTagColor, handleFilterIds, postType } = this.props;
    const { expandedRow } = this.state;
    const itemRows: Array<any> = []

    if (Object.values(data).length > 0) {
      Object.values(data).map((line, index) => {
        const clickCallback = () => this.handleRowClick(line.id);
        itemRows.push(
          <React.Fragment key={index}>
            <tr key={"row-data-" + index} onClick={clickCallback}>
              <td className="text-wrap align-middle">{line.name}</td>
              <td className="text-wrap">
                {<Tags getTagName={getTagName} getTagColor={getTagColor} tags={line.tags}/>}
              </td>
            </tr>
            {expandedRow === line.id &&
              <tr key={"row-expandable-" + index} className="no-hover">
                <RowInfo 
                  postType={postType}
                  data={line}
                  handleFilterIds={handleFilterIds}
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