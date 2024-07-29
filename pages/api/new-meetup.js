import { MongoClient } from "mongodb";

export const url='mongodb+srv://ishamsiyev094:ykXzLgiQCdMXWcIw@next-react-python.ffuidme.mongodb.net/?retryWrites=true&w=majority&appName=next-react-python'
export default async function handler(req,res){
    if(req.method==='POST'){
        const data=req.body;

        const client= await MongoClient.connect(url)

        const db=client.db();

        const meetupsCollection=db.collection('meetups')
        const result=await meetupsCollection.insertOne(data)
        console.log(result)

        client.close()

        res.status(201).json({message:'Added to database successfully'})

    }
}

