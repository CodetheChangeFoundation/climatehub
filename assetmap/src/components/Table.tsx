import * as React from 'react';
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
            <tr onClick={clickCallback}>
              <td className="text-wrap">{line.name}</td>
              <td className="text-wrap">
                {(line.tag_a[0] || line.tag_b[0] || line.tag_c[0]) && <Tags tags={[line.tag_a, line.tag_b, line.tag_c]} />}
              </td>
            </tr>
            {expandedRow === line.id &&
              <tr>
                <td colSpan={2} className="text-wrap">
                  {postType === 'Groups' && <div>{line.website} Projects: {line.projects && line.projects.map(p => p + ", ")} Individuals: {line.individuals && line.individuals.map(i => i + ", ")}</div>}
                  {postType === 'Projects' && <div>{line.description} {line.website} Director: {line.director && line.director.map(d => d)} Groups: {line.groups && line.groups.map(g => g + ", ")}</div>}
                  {postType === 'Individuals' && <div>{line.email} {line.phone} {line.position} {line.website} Projects: {line.projects && line.projects.map(p => p)}</div>}
                </td>
              </tr>
            }
          </React.Fragment>
        )
      })
    } else {
      itemRows.push(<tr><td colSpan={2}>No results found.</td></tr>)
    }

    return itemRows;
  }

  public render() {
    const allItemRows: Array<any> = this.renderItems();

    return (
      <table className="table table-hover mb-0 w-100">
        <thead>
          <tr>
            <th scope="col" className="position-sticky bg-light border-0">Name</th>
            <th scope="col" className="position-sticky bg-light border-0">Tags</th>
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