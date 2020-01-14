import * as React from 'react';

interface DropdownProps {
  handleFilter: (event: any) => void,
  postType: string,
  categories: Array<string>
}

export const Dropdown = ({ handleFilter, postType, categories }: DropdownProps) => 
<div className="border border-bottom-0 border-dark h-100 m-0 p-0">
  <span className="align-items-center d-inline-flex position-absolute h-100 px-1">
    <svg fill="none" height="20" width="15" viewBox="0 0 15 20" xmlns="http://www.w3.org/2000/svg">
      <path clipRule="evenodd" fill="#888888" fillRule="evenodd" d="M11.1189 6.55945C11.1189 9.07756 9.07756 11.1189 6.55945 11.1189C4.04133 11.1189 2 9.07756 2 6.55945C2 4.04133 4.04133 2 6.55945 2C9.07756 2 11.1189 4.04133 11.1189 6.55945ZM8.62627 12.7866C7.97647 13.0022 7.28159 13.1189 6.55945 13.1189C2.93676 13.1189 0 10.1821 0 6.55945C0 2.93676 2.93676 0 6.55945 0C10.1821 0 13.1189 2.93676 13.1189 6.55945C13.1189 8.74448 12.0505 10.68 10.4076 11.8721L14.523 19L12.7909 20L8.62627 12.7866Z" />
    </svg>
  </span>
  <select className="bg-light border-0 custom-select shadow-none pl-4 mt-1 pt-1" onChange={handleFilter} value={postType}>
    {categories.map((category, index) => <option key={index}>{category}</option>)}
  </select>
</div>