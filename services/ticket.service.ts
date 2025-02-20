import {db} from "@/config/firebase.config";
import {collection, getDocs} from "@firebase/firestore";


interface Ticket {
    name : string;
    status: string;
    priority: string;
}

const getAllTickets = async (): Promise<Ticket[]> => {
    const TicketsCollection = collection(db, 'tickets');
    const snapshot = await getDocs(TicketsCollection);
    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Ticket)
    }));
}