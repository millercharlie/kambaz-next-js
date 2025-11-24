'use client';

import * as client from '../../client';
import LessonControlButtons from '@/app/(Kambaz)/Courses/[cid]/Assignments/LessonControlButtons';
import { deleteAssignment } from '@/app/(Kambaz)/Courses/[cid]/Assignments/reducer';
import ModuleControlButtons from '@/app/(Kambaz)/Courses/[cid]/Modules/ModuleControlButtons';
import ModulesControls from '@/app/(Kambaz)/Courses/[cid]/Modules/ModulesControls';
import {
  editModule,
  setModules,
  updateModule,
} from '@/app/(Kambaz)/Courses/[cid]/Modules/reducer';
import { useParams } from 'next/navigation';
import React from 'react';
import { FormControl, ListGroup, ListGroupItem } from 'react-bootstrap';
import { BsGripVertical } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';

export default function Modules() {
  const { cid } = useParams();
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const dispatch = useDispatch();
  const [moduleName, setModuleName] = React.useState('');

  const onCreateModuleForCourse = async () => {
    if (!cid) return;
    const newModule = { name: moduleName, course: cid };
    const module = await client.createModuleForCourse(cid as string, newModule);
    dispatch(setModules([...modules, module]));
  };
  const fetchModules = async () => {
    const modules = await client.findModulesForCourse(cid as string);
    dispatch(setModules(modules));
  };
  const onRemoveModule = async (moduleId: string) => {
    await client.deleteModule(cid, moduleId);
    dispatch(setModules(modules.filter((m: any) => m._id !== moduleId)));
  };
  const onUpdateModule = async (module: any) => {
    await client.updateModule(cid as string, module);
    const newModules = modules.map((m: any) =>
      m._id === module._id ? module : m
    );
    dispatch(setModules(newModules));
  };

  React.useEffect(() => {
    fetchModules();
  }, []);

  return (
    <div style={{ minWidth: '40vw' }}>
      <ModulesControls
        setModuleName={setModuleName}
        moduleName={moduleName}
        addModule={onCreateModuleForCourse}
      />
      <br />
      <br />
      <br />
      <br />
      {modules.map((module: any, index: number) => (
        <ListGroup className='rounded-0' id='wd-modules' key={index}>
          <ListGroupItem className='wd-module p-0 mb-5 fs-5 border-gray'>
            <div className='wd-title p-3 ps-2 bg-secondary'>
              <BsGripVertical className='me-2 fs-3' />
              {!module.editing && module.name}
              {module.editing && (
                <FormControl
                  className='w-50 d-inline-block'
                  onChange={(e) =>
                    dispatch(updateModule({ ...module, name: e.target.value }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      onUpdateModule({ ...module, editing: false });
                    }
                  }}
                  defaultValue={module.name}
                />
              )}
              <ModuleControlButtons
                moduleId={module._id}
                deleteModule={(moduleId) => onRemoveModule(moduleId)}
                editModule={(moduleId) => dispatch(editModule(moduleId))}
              />
            </div>
            {module.lessons && (
              <ListGroup className='wd-lessons rounded-0'>
                {module.lessons.map((lesson: any) => (
                  <ListGroupItem
                    className='wd-lesson p-3 ps-1'
                    key={lesson._id}
                  >
                    <BsGripVertical className='me-2 fs-3' />
                    {lesson.name}
                    <LessonControlButtons
                      assignmentId={lesson._id}
                      deleteAssignment={(assignmentId) =>
                        dispatch(deleteAssignment(assignmentId))
                      }
                    />
                  </ListGroupItem>
                ))}
              </ListGroup>
            )}
          </ListGroupItem>
        </ListGroup>
      ))}
    </div>
  );
}
