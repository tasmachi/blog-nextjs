import NewMeetupForm from "@/components/meetups/NewMeetupForm";
import axios from "axios";
import { useRouter } from "next/router";
import Head from "next/head";

const addMeeting = () => {
  const router = useRouter();
  const MeetupFormHandler = async (meetupData) => {
    const response = await axios.post("/api/new-meetup", meetupData);
    const data = await response.data;

    console.log(data);
    router.push("/");
  };
  return (
    <>
      <Head>
        <title>Add new meetup</title>
        <meta
          name="Description"
          content="Contribute to meetups by adding a new meetup"
        />
      </Head>
      <NewMeetupForm onAddMeetup={MeetupFormHandler} />
    </>
  );
};

export default addMeeting;
