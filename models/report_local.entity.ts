import { model, Schema } from 'mongoose'

export interface IReportLocal {
    name: String;
    value: Number;
    date: Date;
}
export const ReportLocalSchema = new Schema<IReportLocal>(
    {
        name: { type: 'String', required: true },
        value: { type: 'Number', required: true },
        date: { type: 'Date', required: true },
    },
    { timestamps: true },
)

export const ReportLocal = model<IReportLocal>('ReportLocal', ReportLocalSchema);