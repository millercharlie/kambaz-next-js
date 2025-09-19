export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor">
            <label htmlFor="wd-name">Assignment Name</label>
            <input id="wd-name" defaultValue="A1 - ENV + HTML" /><br /><br />
            <textarea id="wd-description">
        The assignment is available online Submit a link to the landing page of
      </textarea>
            <br />
            <table>
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-points">Points</label>
                    </td>
                    <td>
                        <input id="wd-points" defaultValue={100} />
                    </td>
                </tr>
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-group">Assignment Group</label>
                    </td>
                    <td>
                        <select id="wd-group">
                            <option style={{textTransform: 'uppercase'}}>ASSIGNMENTS</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-display-grade-as">Display Grade as</label>
                    </td>
                    <td>
                        <select id="wd-display-grade-as">
                            <option>Percentage</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-submission-type">Submission Type</label>
                    </td>
                    <td>
                        <select id="wd-submission-type">
                            <option>Online</option>
                        </select>
                        <p>Online Entry Options</p>
                        <input id="wd-text-entry" type="checkbox" />
                        <label htmlFor="wd-text-entry">Text Entry</label>
                        <br />
                        <input id="wd-website-url" type="checkbox" />
                        <label htmlFor="wd-website-url">Website URL</label>
                        <br />
                        <input id="wd-media-recordings" type="checkbox" />
                        <label htmlFor="wd-media-recordings">Media Recordings</label>
                        <br />
                        <input id="wd-student-annotation" type="checkbox" />
                        <label htmlFor="wd-student-annotation">Student Annotation</label>
                        <br />
                        <input id="wd-file-upload" type="checkbox" />
                        <label htmlFor="wd-file-upload">File Uploads</label>
                    </td>
                </tr>
                <tr>
                    <td align="right" valign="top">
                        <p>Assign</p>
                    </td>
                    <td>
                        <table>
                            <tr>
                                <td>
                                    <div>
                                        <label htmlFor="wd-assign-to">Assign To</label>
                                        <input id="wd-assign-to" defaultValue="Everyone" />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div>
                                        <label htmlFor="wd-due-date">Due</label>
                                        <input id="wd-due-date" type="date" defaultValue="2003-10-16" />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div>
                                        <label htmlFor="wd-available-from">Available from</label>
                                        <input id="wd-available-from" type="date" defaultValue="2007-07-17"/>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <label htmlFor="wd-available-until">Until</label>
                                        <input id="wd-available-until" type="date" defaultValue="2019-06-08"/>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
                <hr />
            <div style={{display: 'flex', float: 'right'}}>
                <button>Cancel</button>
                <button>Save</button>
            </div>
        </div>
    );}
