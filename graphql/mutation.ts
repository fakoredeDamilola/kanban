import { gql } from "@apollo/client"


export const REGISTER = gql`
mutation Register($input: RegisterOTPInput) {
  register(input: $input) {
    ...on RegisterSuccessResponse{
      status
      user {
        name
        email
        workspaces {
          id
        }
        created_workspaces {
          id
        }
        image
        username
      }
      token
    }
    ... on VerifyRecordSuccess {
      status
      message
    }
  }
  
}
`


export const LOGIN = gql`
mutation Login($input: loginInput) {
  login(input: $input) {
    ...on RegisterSuccessResponse{
      status
      user {
        _id
        username
        image
        name
        email
        workspaces {
          _id
          id
          name
          URL
        }
      }
      token
    }

    ... on VerifyRecordSuccess {
      status
      message
    }
  }
  
}
`

export const VERIFY_USER_RECORD = gql`
mutation VerifyUserRecord($input: RegisterInput) {
  verifyUserRecord(input: $input) {
    ... on RegisterSuccessResponse {
      status
    }
    ... on RegisterFailResponse {
      field
      message
      status
    }
    ... on VerifyRecordSuccess {
      status
      message
    }
  }
}
`

export const ADD_NEW_MEMBERS_TO_WORKSPACE = gql`
mutation AddNewMembersToWorkspace($input: newMembersInput) {
  addNewMembersToWorkspace(input: $input) {
    ... on InviteMemberSuccess {
      status
      message
    }
    ... on WorkspaceFail {
      status
      field
      message
    }
    ... on GeneralErrorResponse{
      message
    }
  }
}
`

export const CREATE_NEW_WORKSPACE = gql`
mutation CreateNewWorkspace($input:workspaceInput){
  createNewWorkspace(input: $input){
    ...on WorkspaceSuccess{
      status
      workspace {
      name
      URL
      _id
      owner {
        email
        id

      }
      taskID
      totalMembers
      totalTasks
      members {
        _id
      }
      subItems {
        name
        items {
          email
          id
          type

        }
        selected {
          email
          id
          img

        }
      }
    }
    }
    ... on GeneralErrorResponse{
      status
      message
    }
  }
}
`

export const CREATE_NEW_TASK = gql`
mutation createNewTask($input:createTaskInput){
  createNewTask(input:$input){
    ... on CreateTaskSuccessResponse{
      status 
      task {
        issueTitle
        issueDescription
        _id
      }
    }
    ... on CreateTaskFailResponse{
      status
      message
      field
    }
    ... on GeneralErrorResponse{
      message
    }
  }
}
`

export const CHANGE_TASK_DETAIL = gql`
mutation changeTaskDetails($input: changeTaskInput) {
  changeTaskDetails(input: $input) {
    ... on CreateTaskSuccessResponse {
      status
      task{
        _id
        issueTitle
        issueDescription
        workspaceURL
        workspaceID
        activities {
            description
            icon
            color
            name
            nameOfActivity
          }
          status {
          name
          img
        }
        priority {
           name
          img
        }
        others {
           name
          img
        }
        label {
           name
          img
        }
        assigned {
           name
          img
        }
        assignee {
           name
          img
        }
        createdBy {
           name
          img
        }
        imgURLArray
      }
    }
    ... on CreateTaskFailResponse {
      status
      message
      field
    }
    ... on GeneralErrorResponse {
      status
      message
    }
  }
}

`

export const CHANGE_TASK_DUE_DATE = gql`
mutation ChangeTaskDueDate($input:changeDueDateInput) {
  changeTaskDueDate(input: $input) {
    ... on CreateTaskSuccessResponse {
      status
      task {
        
        _id
        issueTitle
        issueDescription
        workspaceURL
        workspaceID
        # members{
        #   _id
        #   name
        #   email
        #   img
        #   color
        #   joined
        #   username
        # }
        status {
          name
          img
        }
        priority {
           name
          img
        }
        others {
           name
          img
        }
        label {
           name
          img
        }
        assigned {
           name
          img
        }
        assignee {
           name
          img
        }
        createdBy {
           name
          img
        }
        imgURLArray
      }
    }
    ... on CreateTaskFailResponse {
      status
      message
      field
    }
    ... on GeneralErrorResponse {
      status
      message
    }
  }
}

`

export const ADD_NEW_ACTIVITY = gql`
mutation AddNewActivity($input: changeActivityInput) {
  addNewActivity(input: $input) {
    ... on CreateTaskFailResponse {
      status
      message
      field
    }
    ... on GeneralErrorResponse {
      status
      message
    }
    ... on CreateTaskSuccessResponse {
      status
      task {
        
        _id
        issueTitle
        issueDescription
        workspaceURL
        workspaceID
        status {
          name
          img
        }
        priority {
           name
          img
        }
        others {
           name
          img
        }
        label {
           name
          img
        }
        assigned {
           name
          img
        }
        assignee {
           name
          img
        }
        createdBy {
           name
          img
        }
        imgURLArray
      }
    }
  }
}

`