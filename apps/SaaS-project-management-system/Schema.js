import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    role: {
        enum: ['admin', 'user'],
        type: String,
        default: 'user',
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const User = model("User", userSchema);

const teamSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true });

const Team = model("Team", teamSchema);

const teamMemberSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    teamId: {
        type: Schema.Types.ObjectId,
        ref: 'Team',
        required: true,
    },
    role: {
        enum: ['owner', 'member'],
        type: String,
        default: 'member',
    },
}, { timestamps: true });

teamMemberSchema.index({ userId: 1, teamId: 1 }, { unique: true });

const TeamMember = model("TeamMember", teamMemberSchema);

const projectSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    teamId: {
        type: Schema.Types.ObjectId,
        ref: 'Team',
        required: true,
        index: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true });

const Project = model("Project", projectSchema);

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
        index: true
    },
    status: {
        enum: ['todo', 'in-progress', 'done'],
        type: String,
        default: 'todo',
    },
    priority: {
        enum: ['low', 'medium', 'high'],
        type: String,
        default: 'medium',
    },
    dueDate: {
        type: Date,
    },
}, { timestamps: true });

const Task = model("Task", taskSchema);

const taskAssigneesSchema = new Schema({
    taskId: {
        type: Schema.Types.ObjectId,
        ref: 'Task',
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true });

taskAssigneesSchema.index({ taskId: 1, userId: 1 }, { unique: true });

const TaskAssignees = model("TaskAssignees", taskAssigneesSchema);

const commentSchema = new Schema({
    taskId: {
        type: Schema.Types.ObjectId,
        ref: 'Task',
        required: true,
        index: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Comment = model("Comment", commentSchema);

const activityLogSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    action: {
        enum: ['task_created', 'task_updated', 'task_deleted', 'project_created', 'project_updated', 'project_deleted'],
        type: String,
        required: true,
    },
    entityType: {
        enum: ['task', 'project'],
        type: String,
        required: true,
    },
    entityId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
}, { timestamps: true });

activityLogSchema.index({ entityType: 1, entityId: 1 });

const ActivityLog = model("ActivityLog", activityLogSchema);

const invitationSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    teamId: {
        type: Schema.Types.ObjectId,
        ref: 'Team',
        required: true,
    },
    status: {
        enum: ['pending', 'accepted'],
        type: String,
        default: 'pending',
    },
    invitedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true });

invitationSchema.index({ email: 1, teamId: 1 }, { unique: true });

const Invitation = model("Invitation", invitationSchema);

export {
    User,
    Team,
    TeamMember,
    Project,
    Task,
    TaskAssignees,
    Comment,
    ActivityLog,
    Invitation
};