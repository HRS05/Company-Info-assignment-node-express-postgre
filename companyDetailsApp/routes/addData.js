let express = require("express");
const client = require("../database/companyData");
let router = express.Router();
const companyData =require("../database/companyData");

const addData = (app) => {
    router.post("/companyData", async (req, res)=>{
        let data=req.body;
        
        let companyName = data?.CompanyName;
        let legalName = data?.LegalName;
        let domainName = data?.domain;
        let url = data?.url;
        let type = data?.type;
        let foundingYear = data?.foundingYear;
        let headCount = data?.headCount;
        let city = data?.location?.city;
        let state = data?.location?.state;
        let country = data?.location?.country;
        let timestamps = data?.timestamps;
        
        try{
        await companyData.query(`insert into company (companyname,legalname,type,foundingyear,headcount,url,domain,city,state,country,timestamp) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)` ,[companyName,legalName,type,foundingYear,headCount,url,domainName,city,state,country,timestamps]);
        }catch(e)
        {
            console.log("unable to add data of company");
            console.log(e.message);
        }

        return res.status(200).json({message: "Success"});
    });


    router.post("/seedRound", async (req, res)=>{
        let data=req.body;
        
        console.log(data);
        let companyId = data?.companyId;
        let headCount = data?.headCount;
        let type = data?.type;
        let fundingAmount = data?.fundingAmount;
        let currency = data?.currency;
        let timestamp = data?.timestamp;
        
        try{
        let val = await companyData.query(`select * from company where company.companyId = ${companyId}`);
        if(val.rowCount == 0 ) return res.status(400).json({message: "Company id not exists"});
        val = await companyData.query(`select * from seedRound where seedRound.companyId = ${companyId}`);
        if(val.rowCount != 0 ) return res.status(400).json({message: "Company id already exists in seedFunding"});
        await companyData.query(`insert into seedround (companyid,headcount,type,fundingamount,currency,timestamp) values($1,$2,$3,$4,$5,$6)`,[companyId,headCount,type,fundingAmount,currency,timestamp]);
        }catch(e)
        {
            console.log("unable to add data of seed round");
            console.log(e.message);
        }

        return res.status(200).json({message: "Success"});
    });

    router.post("/seriesA", async (req, res)=>{
        let data=req.body;
        
        console.log(data);
        let companyId = data?.companyId;
        let headCount = data?.headCount;
        let type = data?.type;
        let fundingAmount = data?.fundingAmount;
        let currency = data?.currency;
        let timestamp = data?.timestamp;
        
        try{
        let val = await companyData.query(`select * from company where company.companyId = ${companyId}`);
        if(val.rowCount == 0 ) return res.status(400).json({message: "Company id not exists"});
        val = await companyData.query(`select * from seriesa where seriesa.companyId = ${companyId}`);
        if(val.rowCount != 0 ) return res.status(400).json({message: "Company id already exists in seriesA"});
        await companyData.query(`insert into seriesa (companyid,headcount,type,fundingamount,currency,timestamp) values($1,$2,$3,$4,$5,$6)`,[companyId,headCount,type,fundingAmount,currency,timestamp]);
        }catch(e)
        {
            console.log("unable to add data of series A round");
            console.log(e.message);
        }

        return res.status(200).json({message: "Success"});
    });
    router.post("/socialMedia", async (req, res)=>{
        let data=req.body;
        
        console.log(data);
        let companyId = data?.companyId;
        let headcount = data?.headcount;
        let type = data?.type;
        let linkedinId = data?.linkedinId;
        let facebookId = data?.facebookId;
        let twitterId = data?.twitterId;
        let timestamp = data?.timestamp;
        console.log(headcount);
        
        try{
        let val = await companyData.query(`select * from company where company.companyId = ${companyId}`);
        if(val.rowCount == 0 ) return res.status(400).json({message: "Company id not exists"});
        val = await companyData.query(`select * from socialmedia where socialmedia.companyId = ${companyId}`);
        if(val.rowCount != 0 ) return res.status(400).json({message: "Company id already exists in social media"});
        await companyData.query(`insert into socialMedia (companyid,headcount,type,linkedinid,facebookid,twitterid,timestamp) values($1,$2,$3,$4,$5,$6,$7)`,[companyId,headcount,type,linkedinId,facebookId,twitterId,timestamp]);
        }catch(e)
        {
            console.log("unable to add data of social media");
            console.log(e.message);
        }

        return res.status(200).json({message: "Success"});
    });




    return router;
};
module.exports = addData;
