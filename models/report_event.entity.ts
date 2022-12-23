import { model, Schema } from 'mongoose'

export interface IReportEvent {
    name: String;
    value: Number;
    date: Date;
}
export const ReportEventSchema = new Schema<IReportEvent>(
    {
        name: { type: 'String', required: true },
        value: { type: 'Number', required: true },
        date: { type: 'Date', required: true },
    },
    { timestamps: true },
)

export const ReportEvent = model<IReportEvent>('ReportEvent', ReportEventSchema);