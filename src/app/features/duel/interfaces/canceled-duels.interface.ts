
export interface CanceledDuel {
    id: number;
    typeDuel: string;
    dateFinished: string | null;
    cancellationRequestedAt: string | null;
    typeState: string;
    canceledBy: string;
    cancelReason: string;
}