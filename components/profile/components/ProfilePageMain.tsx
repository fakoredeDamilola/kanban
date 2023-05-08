import React from 'react'
import { ITaskCards } from '../../../state/board';
import ViewAreaIndex from '../../viewarea';

const ProfilePageMain = ({user,tasks}:{user:any;tasks:ITaskCards[]}) => {

  return <ViewAreaIndex margin="0px 0px" tasks={tasks} user={user} type="profile"/> 
}

export default ProfilePageMain