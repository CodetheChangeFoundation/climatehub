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
      tag_a: Array<{ post_type: string, post_title: string }>,
      tag_b: Array<{ post_type: string, post_title: string }>,
      tag_c: Array<{ post_type: string, post_title: string }>,
      website: string,
    }
  },
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

  handleRowClick(rowId: number) {
    const { expandedRow } = this.state;
    if (expandedRow === rowId) {
      this.setState({ expandedRow: -1 });
    } else {
      this.setState({ expandedRow: rowId });
    }
  }

  renderItems() {
    const { data, postType } = this.props;
    const { expandedRow } = this.state;
    const itemRows: Array<any> = []

    if (Object.values(data).length > 0) {
      Object.values(data).map((line, index) => {
        const clickCallback = () => this.handleRowClick(line.id);
        itemRows.push(
          <React.Fragment key={index}>
            <tr key={"row-data-" + index} onClick={clickCallback}>
              <td className="text-wrap">{line.name}</td>
              <td className="text-wrap">
                {(line.tag_a[0] || line.tag_b[0] || line.tag_c[0]) && <Tags tags={[line.tag_a, line.tag_b, line.tag_c]} />}
              </td>
            </tr>
            {expandedRow === line.id &&
              <tr key={"row-expandable-" + index} className="no-hover">
                <RowInfo 
                  postType={postType}
                  data={line}
                  handleFilterIds={this.props.handleFilterIds}
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