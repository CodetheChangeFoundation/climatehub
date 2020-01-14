import * as React from 'react';
import { Tags } from './Tags';

interface TableProps {
  data: { wpid: { 
    name: string, 
    tag_a: Array<{ post_type: string, post_title: string }>, 
    tag_b: Array<{ post_type: string, post_title: string }>, 
    tag_c: Array<{ post_type: string, post_title: string }>}
  }
}

export const Table = ({ data }: TableProps) => 
<table className="table table-hover mb-0 w-100">
  <thead>
    <tr>
      <th scope="col" className="position-sticky bg-light border-0">Name</th>
      <th scope="col" className="position-sticky bg-light border-0">Tags</th>
    </tr>
  </thead>
  <tbody>
    {Object.values(data).length > 0 ? 
      Object.values(data).map((line, index) => 
        <React.Fragment key={index}>
          <tr key={index} className="w-100">
            <td className="w-50">{line.name}</td>
            <td className="w-50">
              <Tags tags={[line.tag_a, line.tag_b, line.tag_c]} />
            </td>
          </tr>
          <tr key={index + "B"} className="d-none w-100">
            <td colSpan={2}>
              Additional info
            </td>
          </tr>
        </React.Fragment>
      ) : <tr><td colSpan={2}>No results found.</td></tr>
    }
  </tbody>
</table>