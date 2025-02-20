import { db } from "@/config/firebase.config";
import { addDoc, collection, doc, getDoc, getDocs, updateDoc } from "@firebase/firestore";
import {Ticket} from "@/app/(app)/tickets/[id]";



const COLLECTION_NAME = 'Tickets';

async function getAllTickets(): Promise<Ticket[]> {
    try {
        const TicketsCollection = collection(db, COLLECTION_NAME);
        const snapshot = await getDocs(TicketsCollection);
        return snapshot.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as Ticket)
        }));
    } catch (e) {
        console.error('Error fetching tickets', e);
        return [];
    }
}

async function createTicket(ticket: {
    title: string;
    description: string;
    priority: "low" | "normal" | "high";
    status: string;
    createdAt: string;
    userId: string | undefined;
    userEmail: string | null | undefined
}) {
    try {
        const docRef = await addDoc(collection(db, COLLECTION_NAME), ticket);
        console.log('Ticket created with ID:', docRef.id ,'and ticket data:', ticket);
        return docRef.id;
    } catch (e) {
        console.error('Error creating ticket', e);
        return null;
    }
}

async function getTicketById(id: string) {
    try {
        const docRef = doc(db, COLLECTION_NAME, id);
        const docSnap = await getDoc(docRef);
        return { id:docSnap.id,  ...docSnap.data() as Ticket };
    } catch (e) {
        console.error('Error fetching ticket', e);
        return null;
    }
}

async function updateTicketStatus(id: string, status: 'opened' | 'in_progress' | 'resolved'): Promise<boolean> {
    try {
        console.log(`Updating ticket ${id} to status: ${status}`);
        const docRef = doc(db, COLLECTION_NAME, id);
        await updateDoc(docRef, { status });
        console.log('Update successful');
        return true;
    } catch (e) {
        console.error('Error updating ticket status:', e);
        return false;
    }
}

export { getAllTickets, createTicket, getTicketById, updateTicketStatus };