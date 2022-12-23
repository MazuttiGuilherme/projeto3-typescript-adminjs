import moment from 'moment';
import { ReportClient } from '../models/report_client.entity';

class ReportClientController{
    constructor(){
    }

    async get(query: any){
        let match: any = null;

        if(query.select_date === 'custom' && query.start_date !== "" && query.end_date !== ""){
            match  = {
                    "$match": {
                        "date": {
                            "$gte": new Date(query.start_date),
                            "$lte": new Date(query.end_date)
                        }
                    }
                }
        }
        else if(query.select_date !== 'custom' && query.select_date !== 'all'){
            let dateFrom = moment().subtract(parseInt(query.select_date),'d').format('YYYY-MM-DD');
            match = {
                "$match": {
                    "date": {
                        "$gte": new Date(dateFrom)
                    }
                }
            };
        }
        
        let params: any = []
        if(match){
            params.push(match);
        }

        params.push(
            {
                "$group": {
                    "_id": "$date",
                    "sum": {
                        "$sum": {
                            "$toInt": "$value"
                        }
                    }
                }
            }
        )
        params.push(
            { 
                "$sort": { 
                    "_id": 1
                } 
            }
        )

        return await ReportClient.aggregate(params);
        
    }
}

export default ReportClientController;