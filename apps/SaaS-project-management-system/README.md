# SaaS Project Management System Schema (Mongoose)

This module defines the MongoDB schemas for a SaaS-style project management system using Mongoose.

## File

- `Schema.js`: Contains all schema definitions and model exports.

## Models

### 1. User

Represents platform users who can sign in and manage teams, projects, and tasks.

Fields:

- `name` (String, required)
- `email` (String, required, unique, indexed)
- `password` (String, required, minimum length 6)
- `role` (String enum, default `user`)
- `isVerified` (Boolean, default `false`)
- timestamps enabled

Allowed `role` values:

- `admin`
- `user`

### 2. Team

Represents a workspace or team that owns projects.

Fields:

- `name` (String, required)
- `createdBy` (ObjectId ref `User`, required)
- timestamps enabled

### 3. TeamMember

Join model that links users to teams.

Fields:

- `userId` (ObjectId ref `User`, required)
- `teamId` (ObjectId ref `Team`, required)
- `role` (String enum, default `member`)
- timestamps enabled

Allowed `role` values:

- `owner`
- `member`

Unique constraint:

- Each `userId` + `teamId` pair must be unique.

### 4. Project

Represents a project owned by a team.

Fields:

- `name` (String, required)
- `description` (String, optional)
- `teamId` (ObjectId ref `Team`, required, indexed)
- `createdBy` (ObjectId ref `User`, required)
- timestamps enabled

### 5. Task

Represents a work item inside a project.

Fields:

- `title` (String, required)
- `description` (String, optional)
- `projectId` (ObjectId ref `Project`, required, indexed)
- `status` (String enum, default `todo`)
- `priority` (String enum, default `medium`)
- `dueDate` (Date, optional)
- timestamps enabled

Allowed `status` values:

- `todo`
- `in-progress`
- `done`

Allowed `priority` values:

- `low`
- `medium`
- `high`

### 6. TaskAssignees

Join model that assigns users to tasks.

Fields:

- `taskId` (ObjectId ref `Task`, required)
- `userId` (ObjectId ref `User`, required)
- timestamps enabled

Unique constraint:

- Each `taskId` + `userId` pair must be unique.

### 7. Comment

Stores task discussion messages.

Fields:

- `taskId` (ObjectId ref `Task`, required, indexed)
- `userId` (ObjectId ref `User`, required)
- `content` (String, required)
- timestamps enabled

### 8. ActivityLog

Tracks important user actions across tasks and projects.

Fields:

- `userId` (ObjectId ref `User`, required)
- `action` (String enum, required)
- `entityType` (String enum, required)
- `entityId` (ObjectId, required)
- timestamps enabled

Allowed `action` values:

- `task_created`
- `task_updated`
- `task_deleted`
- `project_created`
- `project_updated`
- `project_deleted`

Allowed `entityType` values:

- `task`
- `project`

### 9. Invitation

Tracks team invites sent by users.

Fields:

- `email` (String, required)
- `teamId` (ObjectId ref `Team`, required)
- `status` (String enum, default `pending`)
- `invitedBy` (ObjectId ref `User`, required)
- timestamps enabled

Allowed `status` values:

- `pending`
- `accepted`

Unique constraint:

- Each `email` + `teamId` pair must be unique.

## Relationship Summary

- A `Team` is created by one `User`.
- A `User` can belong to many `Team`s through `TeamMember`.
- A `Team` can own many `Project`s.
- A `Project` can contain many `Task`s.
- A `Task` can have many assignees through `TaskAssignees`.
- A `Task` can have many `Comment`s.
- `ActivityLog` records changes made by a `User` against a `Task` or `Project`.
- `Invitation` links a `User` inviter to a `Team` invite by email.

## Model Declarations

The following models are declared in `Schema.js`:

- `User`
- `Team`
- `TeamMember`
- `Project`
- `Task`
- `TaskAssignees`
- `Comment`
- `ActivityLog`
- `Invitation`

## Notes

- The schema uses MongoDB ObjectId references for relationships.
- Most collections include timestamps for created and updated tracking.
- `TeamMember` and `Invitation` enforce uniqueness at the relationship level to avoid duplicate joins or duplicate invites.
