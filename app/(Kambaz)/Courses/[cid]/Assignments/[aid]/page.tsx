import {
  Badge,
  Button,
  Col,
  Form,
  FormCheck,
  FormControl,
  FormLabel,
  FormSelect,
  Row,
} from 'react-bootstrap';

export default function AssignmentEditor() {
  return (
    <div id='wd-assignments-editor'>
      <Form>
        <div>
          <FormLabel htmlFor='wd-name'>Assignment Name</FormLabel>
          <FormControl id='wd-name' className='mb-4' defaultValue='A1' />
        </div>
        <FormControl
          as='textarea'
          id='wd-description'
          defaultValue='The assignment is available online. Submit a link to the landing page of your work.'
        />
        <div className='w-75 mb-4 float-end text-nowrap'>
          <div className='d-flex gap-2 my-4 align-items-center'>
            <FormLabel htmlFor='wd-points' className='mb-0'>
              Points
            </FormLabel>
            <FormControl id='wd-points' defaultValue={100} />
          </div>
          <div className='d-flex gap-2 my-4 align-items-center'>
            <FormLabel htmlFor='wd-group' className='mb-0'>
              Assignment Group
            </FormLabel>
            <FormSelect id='wd-group' className='text-uppercase'>
              <option>Assignments</option>
            </FormSelect>
          </div>
          <div className='d-flex gap-2 my-4 align-items-center'>
            <FormLabel htmlFor='wd-display-grade-as' className='mb-0'>
              Display Grade as
            </FormLabel>
            <FormSelect id='wd-display-grade-as' className='text-uppercase'>
              <option>Percentage</option>
            </FormSelect>
          </div>
          <div className='d-flex gap-2 my-4'>
            <FormLabel htmlFor='wd-submission-type' className='mb-0'>
              Submission Type
            </FormLabel>
            <div
              className='w-100'
              style={{
                padding: 10,
                border: '1px solid #dee2e6',
                borderRadius: '12px',
              }}
            >
              <FormSelect id='wd-submission-type' className='text-uppercase'>
                <option>Online</option>
              </FormSelect>
              <p className='pt-3'>
                <b>Online Entry Options</b>
              </p>
              <div className='d-flex gap-2'>
                <FormCheck id='wd-text-entry' type='checkbox' />
                <FormLabel htmlFor='wd-text-entry'>Text Entry</FormLabel>
              </div>
              <div className='d-flex gap-2'>
                <FormCheck id='wd-website-url' type='checkbox' />
                <FormLabel htmlFor='wd-website-url'>Website URL</FormLabel>
              </div>
              <div className='d-flex gap-2'>
                <FormCheck id='wd-media-recordings' type='checkbox' />
                <FormLabel htmlFor='wd-media-recordings'>
                  Media Recordings
                </FormLabel>
              </div>
              <div className='d-flex gap-2'>
                <FormCheck id='wd-student-annotation' type='checkbox' />
                <FormLabel htmlFor='wd-student-annotation'>
                  Student Annotation
                </FormLabel>
              </div>
              <div className='d-flex gap-2'>
                <FormCheck id='wd-file-upload' type='checkbox' />
                <FormLabel htmlFor='wd-file-upload'>File Uploads</FormLabel>
              </div>
            </div>
          </div>
          <div className='d-flex gap-2 my-4'>
            <FormLabel htmlFor='wd-submission-type' className='mb-0'>
              Submission Type
            </FormLabel>
            <div
              className='w-100'
              style={{
                padding: 10,
                border: '1px solid #dee2e6',
                borderRadius: '12px',
              }}
            >
              <div className='mb-4'>
                <FormLabel htmlFor='wd-assign-to'>
                  <b>Assign To</b>
                </FormLabel>
                <FormCheck id='wd-assign-to'>
                  <Badge bg='secondary'>Everyone</Badge>
                </FormCheck>
              </div>
              <div className='mb-4'>
                <FormLabel htmlFor='wd-due-date'>
                  <b>Due</b>
                </FormLabel>
                <FormControl
                  id='wd-due-date'
                  type='date'
                  defaultValue='2003-10-16'
                />
              </div>
              <div className='mb-4'>
                <Row>
                  <Col>
                    <FormLabel htmlFor='wd-available-from'>
                      <b>Available From</b>
                    </FormLabel>
                    <FormControl
                      id='wd-available-from'
                      type='date'
                      defaultValue='2007-07-17'
                    />
                  </Col>
                  <Col>
                    <FormLabel htmlFor='wd-available-until'>
                      <b>Until</b>
                    </FormLabel>
                    <FormControl
                      id='wd-available-until'
                      type='date'
                      defaultValue='2019-06-08'
                    />
                  </Col>
                </Row>
              </div>
            </div>
          </div>
          <hr />
          <div className='float-end d-flex gap-2'>
            <Button size='lg' variant='secondary'>
              Cancel
            </Button>
            <Button size='lg' variant='danger' type='submit'>
              Save
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}
