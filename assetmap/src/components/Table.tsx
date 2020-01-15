import * as React from 'react';
import { Button } from './Button';
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
                <td colSpan={2} className="text-wrap border-top-0 pt-0 px-4 px-sm-5">
                  <div className="border-top pt-3 container">
                    { postType === 'Groups' && 
                      <div className="row">
                        { line.website &&
                          <div className="col-3">
                            <p>Website</p>
                            <a target="_blank" rel="noopener noreferrer" className="ellipsis d-block" href={line.website}>{line.website}</a>
                          </div>
                        }
                        { line.projects[0] !== 0 &&
                          <div className="col-3">
                            <p>Explore projects</p>
                            {/* {line.projects.map(p => p + ", ")} */}
                            {/* <button type="button" className="btn btn-outline-primary font-italic" onClick={this.props.handleFilterIds("Projects", line.projects)}>projects</button> */}
                            <Button
                              classes="btn btn-outline-primary font-italic"
                              handleClick={this.props.handleFilterIds}
                              ids={line.projects}
                              postType="Projects"
                              title="projects"
                            />
                          </div>
                        }
                        { line.individuals[0] !== 0 &&
                          <div className="col-3">
                            <p>See individuals</p>
                            {line.individuals.map(i => i + ", ")}
                          </div>
                        }
                      </div>
                    }
                    {postType === 'Projects' && <div className="row">{line.description} {line.website} Director: {line.director && line.director.map(d => d)} Groups: {line.groups && line.groups.map(g => g + ", ")}</div>}
                    {postType === 'Individuals' && <div className="row">{line.email} {line.phone} {line.position} {line.website} Projects: {line.projects && line.projects.map(p => p)}</div>}
                  </div>
                </td>
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