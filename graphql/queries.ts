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
        }
        taskID{
        _id
        issueTitle
        dueDate
        issueDescription
        workspaceURL
        workspaceID
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
              type
              id
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
              type
              id
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


export const FETCH_MEMBER = gql`
query FetchMember($input: FetchMemberInput) {
  FetchMember(input: $input) {
    ... on CreateMemberSuccessResponse {
      status
      __typename
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
        workspaceURL
        workspaceID
        dueDate
      }
      }
    }
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