import {db} from "@/config/firebase.config";
import {addDoc, collection, doc, getDoc, getDocs} from "@firebase/firestore";


interface Ticket {
    name : string;
    status: string;
    priority: string;
}

async function getAllTickets() : Promise<Ticket[]> {
    try {
        const TicketsCollection = collection(db, 'tickets');
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

async function createTicket(ticket: Ticket) {
    try {
    const docRef = await addDoc(collection(db, 'tickets'), ticket);
    return docRef.id;
    } catch (e) {
        console.error('Error creating ticket', e);
        return null;
    }
}

async function getTicketById(id: string) {
    try {
        const docRef = doc(db, 'tickets', id);
        const docSnap = await getDoc(docRef);
        return docSnap.data() as Ticket;
    } catch (e) {
        console.error('Error fetching ticket', e);
        return null;
    }

}

export {getAllTickets, createTicket, getTicketById};