import { Fragment } from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";

const MeetupDetails = (props) => {

 return (
  <Fragment>
   <Head>
    <title>{props.meetupData.title}</title>
    <meta
     name='description'
     content={props.meetupData.description}
    />
   </Head>
   <MeetupDetail
    image={props.meetupData.image}
    title={props.meetupData.title}
    address={props.meetupData.address}
    description={props.meetupData.description}
   />
  </Fragment>
 )
}

export async function getStaticPaths() {

 const client = new MongoClient('mongodb+srv://shiva:X6J28Fy6v0aNYCmn@cluster0.3vd7ixu.mongodb.net/meetups?retryWrites=true&w=majority')
 //X6J28Fy6v0aNYCmn
 await client.connect()
 const db = client.db('meetups')

 const meetupsCollection = db.collection('meetups')

 const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
 client.close()
 return {
  fallback: false,
  paths: meetups.map((meetup) => ({
   params: { meetupid: meetup._id.toString() },
  })),
  // [
  //  {
  //   params: {
  //    meetupid: "m1"
  //   },
  //  },
  //  {
  //   params: {
  //    meetupid: "m2"
  //   },
  //  }
  // ]
 }
}


export async function getStaticProps(context) {
 const meetupId = context.params.meetupid;

 const client = new MongoClient('mongodb+srv://shiva:X6J28Fy6v0aNYCmn@cluster0.3vd7ixu.mongodb.net/meetups?retryWrites=true&w=majority')
 //X6J28Fy6v0aNYCmn
 await client.connect()
 const db = client.db('meetups')

 const meetupsCollection = db.collection('meetups')

 const selectedMeetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) })
 return {
  props: {
   meetupData: {
    id: selectedMeetup._id.toString(),
    title: selectedMeetup.title,
    address: selectedMeetup.address,
    image: selectedMeetup.image,
    description: selectedMeetup.description
   }
  }
 }
}

export default MeetupDetails;