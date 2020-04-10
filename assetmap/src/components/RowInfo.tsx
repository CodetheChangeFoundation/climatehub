import * as React from 'react';

interface RowInfo {
  data: any,
  postType: string,
  handlePostQuery: (postType: string, filterIds: Array<number>) => Promise<void>,
}

export const RowInfo = ({ data, handlePostQuery, postType}: RowInfo) => {
  function renderTitle(title: string) {
    return <p className="mb-0 text-muted">{title}</p>
  }

  function renderText(title: string, text: string, classes: string = "", isUrl: boolean = false, isEmail: boolean = false) {
    let output;
    if (text !== "") {
      if (isUrl) {
        output = <>{renderTitle(title)}<a 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-truncate d-block" 
          href={(isEmail? "mailto:" + text : text)}>{text}
        </a></>
      } else {
        output = <>{renderTitle(title)}<p>{text}</p></>
      }
    }

    if (classes !== "" && output !== undefined) {
      output = <div className={classes}>{output}</div>
    }

    return output
  }
  
  function renderPositionWebsiteEmailPhone() {
    const position = renderText('Position', data.position);
    const email = renderText('Email', data.email, "", true, true);
    const phone = renderText('Phone', data.phone);
    const website = renderText('Website', data.website, "", true, false);
    return <><div className="col-4 col-lg-3">{position}{website}</div><div className="col-4 col-lg-3">{email}{phone}</div></>;
  }

  function renderButton(buttonPostType: string, ids: Array<number>, title: string, text: string) {
    if ((ids !== undefined) 
        && (ids.length > 0)
        && !(ids.length===1 && ids[0]===0)) {
        const clickCallback = (): Promise<void> =>  {
          return new Promise((resolve) => {
            handlePostQuery(buttonPostType, ids)
            .then(() => resolve())
          })
        }
        return (
          <div className="col-4 col-md-3 col-xl-2">
            {renderTitle(title)}
            <button type="button" className="btn btn-outline-primary font-italic" onClick={clickCallback}>{text}</button>
          </div>
        )
      }
    return;
  }

  let rowInfo;
  switch(postType) {
    case 'groups': {
      rowInfo = <>
        {renderText("Description", data.description, "col-12 col-xl-5")}
        {renderText('Website', data.website, 'col-12 col-sm-4 col-lg-3', true)}
        {renderButton('Projects', data.projects, 'Explore projects', 'projects')}
        {renderButton('Individuals', data.individuals, 'See individuals', 'individuals')}
      </>
      break;
    } case 'projects': {
      rowInfo = <>
        {rowInfo}{renderText("Description", data.description, "col-12 col-xl-5")}
        {rowInfo}{renderText('Website', data.website, 'col-12 col-sm-4 col-lg-3', true)}
        {rowInfo}{renderButton('Individuals', data.director, 'See project director', 'director')}
        {rowInfo}{renderButton('Groups', data.groups, 'See groups involved', 'groups')}
      </>
      break;
    } case 'individuals': {
      rowInfo = <>
        {renderPositionWebsiteEmailPhone()}
        {renderButton('Projects', data.projects, 'See their projects', 'projects')}
        {renderButton('Groups', data.groups, 'See their groups', 'groups')}
      </>
      break;
    }
  }

  return(
    <td colSpan={2} className="text-wrap border-top-0 pt-0 px-4 px-sm-5">
      <div className="border-top pt-3 container">
        <div className="row">
          {rowInfo}
        </div>
      </div>
    </td>
  )
}