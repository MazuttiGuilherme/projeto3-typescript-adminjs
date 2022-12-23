import { model, Schema } from 'mongoose'

export interface IReportClient {
    value: Number;
    date: Date;
}
export const ReportClientSchema = new Schema<IReportClient>(
    {
        value: { type: 'Number', required: true },
        date: { type: 'Date', required: true },
    },
    { timestamps: true },
)

export const ReportClient = model<IReportClient>('ReportClient', ReportClientSchema);