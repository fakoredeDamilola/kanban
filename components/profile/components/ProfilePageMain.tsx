import React from 'react'
import { ITaskCards } from '../../../state/board';
import ViewAreaIndex from '../../viewarea';

const ProfilePageMain = ({user,tasks}:{user:any;tasks:ITaskCards[]}) => {
  return <ViewAreaIndex margin="10px 30px" tasks={tasks} user={user} type="profile"/>
}

export default ProfilePageMain