let express = require("express");
let router = express.Router();
const companyData =require("../database/companyData");



const queryResolver = (app) => {
    router.post("/queryTask", async (req, res)=>{
        
        let data=req.body;
        
        //company details
        //expecting values in query
        let companyName = data?.CompanyName;
        let legalName = data?.LegalName;
        let domain = data?.domain;
        let url = data?.url;
        let type = data?.type;
        let foundingYear = data?.foundingYear;
        let headCountMax = data?.headCount?.max;
        let headCountMin = data?.headCount?.min;
        let city = data?.location?.city;
        let state = data?.location?.state;
        let country = data?.location?.country;
        let timestamp = data?.timestamp;
        let fundingRound = data?.funding?.round;
        //
        let val = await companyData.query(`select * from company where company.companyname = ${companyName}`);
        if(val.rowCount == 0 ) return res.status(400).json({message: "No : company not found"});
        
        let item = val.rows[0];
        let companyId = item.companyid;

        console.log("Company Id : --> "+ companyId);

        if(fundingRound)
        {
            if(fundingRound == "seedRound")
            {
                let val = await companyData.query(`select * from seedround where seedround.companyid = ${companyId}`);
                if(val.rowCount == 0 ) return res.status(400).json({message: "No"});
                if(val.rows[0].timestamp > timestamp) return res.status(400).json({message: "No"});
            }
            else if(fundingRound == "seriesA")
            {
                let val = await companyData.query(`select * from seriesa where seriesa.companyid = ${companyId}`);
                if(val.rowCount == 0 ) return res.status(400).json({message: "No"});
                if(val.rows[0].timestamp > timestamp) return res.status(400).json({message: "No"});
            }
        }

        if(city && city.toUpperCase() != item?.city.toUpperCase()) return res.status(400).json({message: "No"});
        if(state && state.toUpperCase() != item?.state.toUpperCase()) return res.status(400).json({message: "No"});
        if(country && country.toUpperCase() != item?.country.toUpperCase()) return res.status(400).json({message: "No"});
        if(foundingYear && foundingYear != item?.foundingyear) return res.status(400).json({message: "No"});
        if(legalName && legalName.toUpperCase() != item.legalname.toUpperCase()) return res.status(400).json({message: "No"});
        if(domain && domain.toUpperCase() != item.domain.toUpperCase()) return res.status(400).json({message: "No"});
        if(url && url.toUpperCase() != item.url.toUpperCase()) return res.status(400).json({message: "No"});

        if((headCountMax && headCountMin) || type)
        {
            let mp = new Map();
            mp.set(item.timestamp,{headcount : item.headCount,type : item.type});
            let val = await companyData.query(`select * from seedround where seedround.companyid = ${companyId}`);
            if(val.rowCount != 0 ) {
                let i=val.rows[0].
                mp.set(i.timestamp,{headcount : i.headcount,type : i.type});
            }
            val = await companyData.query(`select * from socailmedia where socialmedia.companyid = ${companyId}`);
            if(val.rowCount != 0 ) {
                let i=val.rows[0].
                mp.set(i.timestamp,{headcount : i.headcount,type : i.type});
            }
            val = await companyData.query(`select * from seriesa where seriesa.companyid = ${companyId}`);
            if(val.rowCount != 0 ) {
                let i=val.rows[0].
                mp.set(i.timestamp,{headcount : i.headcount,type : i.type});
            }

            const nmp = new Map([...mp].sort().reverse());
            nmp.forEach((value, key) => {
                if(value <= timestamp)
                {
                    if(type && key.type.toUpperCase() != type.toUpperCase()) return res.status(400).json({message: "No"});
                    if((headCountMax && headCountMin)){
                        if(headCountMin > key.headCount || headCountMax < key.headCount) return res.status(400).json({message: "No"});
                    }
                }
              });   
        }
        return res.status(200).json({message: "Success"});

    });

    


    router.post("/testFlow",)
    return router;
};
module.exports = queryResolver;


