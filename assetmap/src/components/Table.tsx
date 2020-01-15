import * as React from 'react';
import { Tags } from './Tags';

interface TableProps {
  data: { 
    wpid: {
      description: string,
      director: Array<number>,
      email: string,
      groups: Array<number>,
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

export const Table = ({ data, postType }: TableProps) => 
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
          <tr>
            <td className="text-wrap">{line.name}</td>
            <td className="text-wrap">
              { (line.tag_a[0] || line.tag_b[0] || line.tag_c[0]) && <Tags tags={[line.tag_a, line.tag_b, line.tag_c]} /> }
            </td>
          </tr>
          <tr>
            <td colSpan={2} className="text-wrap">
              {postType === 'Groups' && <div>{line.website} Projects: {line.projects && line.projects.map(p => p + ", ")} Individuals: {line.individuals && line.individuals.map(i => i + ", ")}</div> }
              {postType === 'Projects' && <div>{line.description} {line.website} Director: {line.director && line.director.map(d => d)} Groups: {line.groups && line.groups.map(g => g + ", ")}</div> }
              {postType === 'Individuals' && <div>{line.email} {line.phone} {line.position} {line.website} Projects: {line.projects && line.projects.map(p => p)}</div> }
            </td>
          </tr>
        </React.Fragment>
      ) : <tr><td colSpan={2}>No results found.</td></tr>
    }
  </tbody>
</table>