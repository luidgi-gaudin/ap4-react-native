export type TicketStatus = 'new' | 'assigned' | 'in-progress' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high' | 'critical';
export type TicketCategory = 'hardware' | 'software' | 'network' | 'access' | 'other';

export interface Ticket {
    id: string;
    title: string;
    description: string;
    status: TicketStatus;
    priority: TicketPriority;
    category: TicketCategory;
    createdBy: string;
    assignedTo?: string;
    createdAt: Date;
    updatedAt: Date;
    dueDate?: Date;
    location?: string;
    deviceInfo?: {
        model?: string;
        os?: string;
        version?: string;
    };
}