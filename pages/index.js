import MeetupList from "@/components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import { url } from "./api/new-meetup";
import Head from "next/head";

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>Meetups</title>
        <meta
          name="Description"
          content="Browse a list of active meetups around the world"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

// export async function getServerSideProps(){

//     return {
//         props:{
//             meetups
//         }
//     }
// }

export const getStaticProps = async () => {
  const client = await MongoClient.connect(url);

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  const formattedMeetups = meetups.map((meetup) => ({
    id: meetup._id.toString(),
    title: meetup.title,
    image: meetup.image,
    address: meetup.address,
  }));
  return {
    props: {
      meetups: formattedMeetups,
    },
    revalidate: 10,
  };
};

export default HomePage;
