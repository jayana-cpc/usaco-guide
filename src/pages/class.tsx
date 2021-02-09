import React, { ReactElement, useContext, useState } from 'react';
import { Router } from '@reach/router';
import ClassPage from '../components/Classes/ClassPage';
import Layout from '../components/layout';
import ClassSelectPage from '../components/Classes/ClassSelectPage';
import NotFoundPage from './404';
import PostPage from '../components/Classes/PostPage';
import ClassContext, { ClassProvider } from '../context/ClassContext';
import ClassJoinPage from '../components/Classes/ClassJoinPage';
import { ConfettiProvider } from '../context/ConfettiContext';
import StudentProgressPage from '../components/Classes/StudentProgressPage';

// wrapper because reach router types are bad.
const NotFoundPageWrapper = (props: any): ReactElement => {
  return <NotFoundPage {...props} />;
};
const ClassPageWrapper = (props: {
  Component: ReactElement;
  classId: string;
}): ReactElement => {
  const { Component, ...propsExceptComponent } = props;
  const { setClassId } = useContext(ClassContext);

  React.useEffect(() => {
    if (!setClassId) return;
    setClassId(props.classId);
  }, [setClassId === null]);
  return <Component {...propsExceptComponent} />;
};

export default function ClassRouter() {
  return (
    <Layout>
      <ClassProvider>
        <ConfettiProvider>
          <Router basepath="/class">
            <ClassPageWrapper Component={ClassPage} path="/:classId" />
            <ClassPageWrapper Component={ClassJoinPage} path="/:classId/join" />
            <ClassPageWrapper
              Component={PostPage}
              type={'assignment'}
              path="/:classId/assignments/:assignmentId"
            />
            <ClassPageWrapper
              Component={PostPage}
              type={'announcement'}
              path="/:classId/announcements/:announcementId"
            />
            <ClassPageWrapper
              Component={StudentProgressPage}
              path="/:classId/student-progress"
            />

            <ClassSelectPage path="/" />
            <NotFoundPageWrapper default />
          </Router>
        </ConfettiProvider>
      </ClassProvider>
    </Layout>
  );
}