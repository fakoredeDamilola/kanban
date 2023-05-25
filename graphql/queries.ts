import { gql } from "@apollo/client"


export const FETCH_ALL_WORKSPACES = gql`
query FetchAllWorkspace {
  fetchAllWorkspace {
    URL
    id
    name
  }
}

`

export const FETCH_WORKSPACE = gql`
query FetchWorkspace($input:fetchWorkspaceInput) {
  fetchWorkspace(input: $input) {
    ...on WorkspaceSuccess{
      status
      workspace {
        _id
        id
        totalTasks
        totalMembers
        URL
        name
        members{
          _id
          name
          email
          img
          color
          joined
          username
          workspaceIDs {
            status
            workspaceID {
              URL
            }
          }
        }
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
        owner {
        email
        username
        _id
      }
      subItems {
        name
        email
        icon
        tooltip
        text
        items {
          name
          img
          email
          _id
        type
        }
        selected {
          name
          email
          img
          _id
        }
      }
      }
      
    }
    ... on WorkspaceFail {
      status
      message
      field
    }
  }
}
`
export const FETCH_USER = gql`
query UserInfo($input:userInput) {
  userInfo(input:$input) {
    ... on VerifyRecordSuccess {
      status
      message
    }
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
            name
            email
            username
            _id
            
      }
        }
      }
      token
    }

    ... on RegisterFailResponse {
      status
      message
      field
    }
  }
}
`

export const FETCH_TASK = gql`
query FetchTask($input: FetchTaskInput) {
  fetchTask(input: $input) {
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
          _id
         name 
         img
        }
        assignee {
          _id
          name
        }
        createdBy {
          _id
          img
          name
        }
        imgURLArray
      }
    }
  }
}
`


export const FETCH_MEMBER = gql`
query FetchMember($input: FetchMemberInput) {
  FetchMember(input: $input) {
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
    # ... on CreateMemberSuccessResponse {
    #   status
    #   __typename
    #   member {
      
    ... on CreateMemberFailResponse {
      status
    }
    # ... on GeneralErrorResponse {
    #   status
    # }
  }
}

`

export const VERIFY_MEMBERS_LINK = gql`
query verifyMembersLink($input:verifyMembersInput) {
  verifyMembersLink(input: $input) {
    ...on InviteSuccess{
      status
      workspace {
        _id
        id
        totalTasks
        totalMembers
        URL
        name
        owner {
        email
        username
        _id
      }
      }
      invite {
        email
        inviteToken
      }
      user {
        _id
        email
      }
      
    }
    ... on WorkspaceFail {
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