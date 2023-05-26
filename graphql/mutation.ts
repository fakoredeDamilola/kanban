import { gql } from "@apollo/client"


export const REGISTER = gql`
mutation Register($input: RegisterOTPInput) {
  register(input: $input) {
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
          owner {
        email
        username
        _id
      }
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
          owner {
        email
        username
        _id
      }
        }
      }
      token
    }

    ... on VerifyRecordSuccess {
      status
      message
    }
    ... on RegisterFailResponse{
      status
      message
      field
    }
  }
  
}
`

export const VERIFY_USER_RECORD = gql`
mutation VerifyUserRecord($input: RegisterInput) {
  verifyUserRecord(input: $input) {
    ... on RegisterSuccessResponse {
      status
      token
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
    }
    ... on RegisterFailResponse {
      field
      message
      status
    }
    ... on VerifyDataOTP {
      OTP
      message
      status
    }
  }
}
`
export const RESEND_OTP = gql`
mutation resendOTP($input: ResendOTPInput) {
  resendOTP(input: $input) {
    ... on RegisterSuccessResponse {
      status
      token
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
      result {
        name
        url
      }
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
mutation createNewWorkspace($input:workspaceInput){
  createNewWorkspace(input: $input){
    ...on WorkspaceSuccess{
      status
      workspace {
        id
        _id
        URL
        name
        owner {
        email
        username
        _id
      }
        members {
          _id
          joined
        }
        subItems {
          email
          icon
          items {
            email
            img
            name
            _id
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
    ... on CreateTaskSuccessResponse {
      status
      task{
        _id
        issueTitle
        issueDescription
        workspaceURL
        workspaceID
        dueDate
        activities {
            description
            icon
            color
            name
            nameOfActivity
            createdby {
              _id
              name
              email
              img
              # type
              # id
              username
            }
          }
          status {
          _id
          name
          email
          img
          type
          id
          username
        }
        priority {
          name
          img
        }
        others {
          name
        }
        label {
         name 
        }
        assigned {
         name 
         img
        }
        assignee {
          name
        }
        createdBy {
          name
        }
        imgURLArray
      }
    }
  }
}
`

export const CHANGE_TASK_DETAIL = gql`
mutation changeTaskDetails($input: ChangeTaskDetailsInput) {
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
export const ADD_MEMBERS = gql`
mutation AddNewMember($input: NewMemberInput) {
  AddNewMember(input: $input) {
    ... on NewMemberResponse {
      status
      workspaceInfo {
        workspaceID {
        _id
        id
        URL
        name
      }
        status
        # invited
      }
    }
    ... on CreateMemberFailResponse {
      status
      message
      field
    }
  }
}
`
export const ADD_IMAGE_TO_MEMBER = gql`
mutation AddImageToMember($input: addMemberImageInput) {
  AddImageToMember(input: $input) {
    ... on CreateMemberSuccessResponse {
      member {
        _id
        name
        email
        img
        color
        joined
        username
        taskIDs {
          _id
          issueTitle
          issueDescription
          imgURLArray
          dueDate
          workspaceID
          workspaceURL
          assigned {
            color
            email
            img
            joined
            name
          }
          createdBy {
            _id
            name
            email
            img
            color
            joined
            username
           
          }
          assignee {
            email
            id
            img
          }
          label {
            email
            _id
            name
          }
          others {
            email
            _id
            name
          }
          status {
            name
            id
          }
        }
        workspaceIDs {
          workspaceID {
            name
            URL
          }
          status
        }
      }
    }
    ... on CreateMemberFailResponse {
      status
    }
  }
}
`

export const EDIT_TASK = gql`
mutation EditTask($input: editTaskInput) {
  editTask(input: $input) {
    ... on CreateTaskSuccessResponse {
      status
      task {
        _id
        issueTitle
        issueDescription
        workspaceURL
        workspaceID
        dueDate
       activities {
            description
            icon
            color
            name
            nameOfActivity
            createdby {
              _id
              name
              email
              img
              # type
              # id
              username
            }
          }
        status {
          _id
          name
          email
          img
          type
          id
          username
        }
        priority {
          name
          img
        }
        others {
          name
        }
        label {
         name 
        }
        assigned {
         name 
         img
        }
        assignee {
          name
        }
        createdBy {
          name
        }
        imgURLArray
      }
    }
  }
}
`